package de.ihreapotheken.sdk.client.nativescript

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.lifecycle.MutableLiveData
import androidx.navigation.NavOptionsBuilder
import de.ihreapotheken.sdk.integrations.api.IaSdk
import de.ihreapotheken.sdk.core.api.PresentationMode
import de.ihreapotheken.sdk.core.api.listener.HandlingDecision
import de.ihreapotheken.sdk.integrations.api.view.IaSdkActivity
import de.ihreapotheken.sdk.integrations.api.view.IaScreen
import de.ihreapotheken.sdk.ordering.OrderingModule
import de.ihreapotheken.sdk.pharmacy.PharmacyModule
import de.ihreapotheken.sdk.core.data.EnvironmentType
import de.ihreapotheken.sdk.core.data.PrerequisiteFlowConfiguration
import de.ihreapotheken.sdk.core.data.model.sdk.SdkEvent
import de.ihreapotheken.sdk.core.data.model.sdk.SdkEventListener
import de.ihreapotheken.sdk.apofinder.ApofinderModule
import de.ihreapotheken.sdk.integrations.api.IaSdkConfiguration
import de.ihreapotheken.sdk.core.api.listener.CheckoutListener
import de.ihreapotheken.sdk.core.api.listener.PharmacyConfigListener
import de.ihreapotheken.sdk.core.api.listener.PharmacyConfigResult
import de.ihreapotheken.sdk.core.api.listener.TransferPrescriptionEvent
import de.ihreapotheken.sdk.core.api.listener.TransferPrescriptionListener
import de.ihreapotheken.sdk.integrations.api.TransferPrescriptionRequest
import de.ihreapotheken.sdk.core.domain.model.prescription.ImagePrescription
import de.ihreapotheken.sdk.core.domain.model.prescription.PdfPrescription
import de.ihreapotheken.sdk.core.domain.model.prescription.PrescriptionInsuranceType
import de.ihreapotheken.sdk.core.domain.model.GuestUser
import de.ihreapotheken.sdk.core.ui.theme.IAUIConfiguration
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class IaSdk {
    private lateinit var sdkModule: IaSdk
    private var onboardingShouldBeShown: Boolean = false
    private var shouldFetchThemeFromRemote: Boolean = false

    fun configureIaSdk(onboardingShouldBeShown: Boolean, shouldFetchThemeFromRemote: Boolean) {
        this.onboardingShouldBeShown = onboardingShouldBeShown
        this.shouldFetchThemeFromRemote = shouldFetchThemeFromRemote
    }

    fun notifyJs(
        id: String,
        message: String,
        context: Context,
    ) {
        val intent = Intent(id)
        intent.putExtra("data", message)
        context.sendBroadcast(intent)
    }

    fun initIaSdk(
        applicationContext: Context,
        accessKey: String,
        clientId: String,
        serverEnvironmentId: String,
        analyticsEnabled: Boolean,
    ) {
        val channelId = "INIT_EVENT"
        sdkModule = IaSdk.register(
            OrderingModule,
            PharmacyModule,
            ApofinderModule,
        )
        val serverEnv = when (serverEnvironmentId) {
            "development" -> {
                EnvironmentType.DEV
            }
            "staging" -> {
                EnvironmentType.STAGING
            }
            "production" -> {
                EnvironmentType.PROD
            }
            else -> {
                EnvironmentType.STAGING
            }
        }
        sdkModule.init(
            context = applicationContext,
            apiKey = accessKey,
            clientId = clientId,
            configuration = IaSdkConfiguration(
                shouldFetchThemeFromRemote = shouldFetchThemeFromRemote,
                // Gates the SDK's crash-capture pipeline (SdkCrashHandler install +
                // ExitInfoCrashCollector + CrashReportUploader drain). Off by default; demos and
                // hosts that want crash reports must opt in via the JS-side `initIaSdk` flag.
                analyticsEnabled = analyticsEnabled,
                // Both added in AppSDK 2.7.0 and enabled unconditionally so the demo exercises
                // them. iOS has no haptics toggle -- the feature ships there with no public
                // switch -- so only the mascot flag has an iOS counterpart in NSCIaSdk.swift.
                hapticFeedbackEnabled = true,
                uiConfiguration = IAUIConfiguration(
                    shouldShowMascotIllustrations = true,
                ),
                prerequisiteFlowConfiguration = PrerequisiteFlowConfiguration(
                    shouldRunLegal = true,
                    shouldRunOnboarding = onboardingShouldBeShown,
                ),
            ),
            environmentType = serverEnv,
            sdkEventListener = object : SdkEventListener {
                override fun onSdkEvent(event: SdkEvent) {
                    if (event is SdkEvent.InitStatus && event !is SdkEvent.InitStatus.Initializing) {
                        notifyJs(channelId, "success", applicationContext)
                    }
                    if (event is SdkEvent.InitError) {
                        notifyJs(channelId, event.message, applicationContext)
                    }
                }
            }
        )
    }

    fun setGuestUserData(
        context: Context,
        salutation: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumberCountryCode: String?,
        phoneNumberWithoutCountryCode: String?,
    ) {
        val channelId = "SET_GUEST_DATA_EVENT"
        val guestUserData = GuestUser(
            salutation,
            firstName,
            lastName,
            email,
            if (phoneNumberCountryCode != null) {
                phoneNumberCountryCode.toIntOrNull() ?: 49
            } else {
                null
            },
            phoneNumberWithoutCountryCode,
        )
        sdkModule.setUserData(
            guestUserData
        )
        notifyJs(channelId, "success", context)
    }

    /**
     * Data class to hold a user's address in [PersonalData].
     */
    data class SignatureCodes(
        val iaOrderCode: String,
        val hostOrderCode: String,
    )

    /**
     * Property holding the value of the [orderSignatureListener].
     */
    var orderSignatures: MutableLiveData<SignatureCodes?> = MutableLiveData<SignatureCodes?>(null)

    /**
     * Notifier implemented for receiving value updates on order IDs with prescription transfer completion.
     */
    val orderSignaturesListener: MutableLiveData<SignatureCodes?> by lazy {
        orderSignatures
    }

    /**
     * Forwards a collection of prescriptions with the ia.de backend service. 
     */
    fun transferPrescriptions(
        context: Context,
        images: List<ByteArray>?,
        pdfs: List<ByteArray>?,
        codes: List<String>?,
        orderId: String?,
    ) {
        val channelId = "TRANSFER_PRESCRIPTIONS_EVENT"
        sdkModule.ordering.deleteCart()
        IaSdk.ordering.setCheckoutListener(
            object : CheckoutListener {
                override fun onCheckoutCompleted(hostOrderId: String, sdkOrderId: String) {
                    orderSignatures.value = SignatureCodes(
                        iaOrderCode = sdkOrderId,
                        hostOrderCode = hostOrderId,
                    )
                }
            }
        )
        sdkModule.ordering.transferPrescriptions(
            context = context as Activity,
            transferPrescriptionRequest = TransferPrescriptionRequest(
                images?.map { ImagePrescription(it) },
                pdfs?.map { PdfPrescription(PrescriptionInsuranceType.PRIVATE, it) },
                codes,
                orderId,
            ),
            transferPrescriptionListener = object : TransferPrescriptionListener {
                override fun onTransferPrescriptionEvent(event: TransferPrescriptionEvent): HandlingDecision {
                    if (event is TransferPrescriptionEvent.Success) {
                        notifyJs(channelId, "success", context)
                    }
                    if (event is TransferPrescriptionEvent.Failed) {
                        notifyJs(channelId, event.errorMessage, context)
                    }
                    return HandlingDecision.PERFORM_DEFAULT
                }
            },
            presentationMode = PresentationMode.FULL_FLOW,
        )
    }

    fun startDashboardActivity(
        context: Context,
    ) {
        IaSdkActivity.start(
            context,
            IaScreen.StartScreen,
        )
    }

    fun finishAllActivities() {
        IaSdkActivity.finishAllActivities()
    }

    fun logout(
        context: Context,
    ) {
        val channelId = "LOGOUT_EVENT"

        val success = sdkModule.clearAllData()
        if (success) {
            notifyJs(channelId, "success", context)
        } else {
            notifyJs(channelId, "Failed to logout.", context)
        }
    }

    fun transferSDKv1UserData(
        context: Context,
    ) {
        val channelId = "TRANSFER_SDK_V1_USER_DATA_EVENT"
        IaSdk.transferSDKv1UserData(context)
        notifyJs(channelId, "success", context)
    }

    fun setPharmacyId(
        context: Context,
        pharmacyId: String,
    ) {
        val channelId = "SET_PHARMACY_ID_EVENT"
        sdkModule.pharmacy.setPharmacyId(
            pharmacyId,
            object : PharmacyConfigListener {
                override fun onPharmacyConfigResult(result: PharmacyConfigResult) {
                    if (result is PharmacyConfigResult.NotInitialized
                        || result is PharmacyConfigResult.ValidationFailed) {
                        notifyJs(channelId, "Setting pharmacy ID failed: $result", context)
                    } else {
                        notifyJs(channelId, "success", context)
                    }
                }
            }
        )
    }

    fun clearCart(
        context: Context,
    ) {
        val channelId = "CLEAR_CART_EVENT"

        val success = sdkModule.ordering.deleteCart()
        if (success) {
            notifyJs(channelId, "success", context)
        } else {
            notifyJs(channelId, "Error clearing cart.", context)
        }
    }

    fun clearPharmacy(
        context: Context,
    ) {
        val channelId = "CLEAR_PHARMACY_EVENT"

        CoroutineScope(Dispatchers.Main).launch {
            try {
                sdkModule.pharmacy.clearPharmacyId()
                sdkModule.ordering.deleteCart()
                notifyJs(channelId, "success", context)
            } catch (e: Exception) {
                notifyJs(channelId, e.message ?: "Error clearing pharmacy.", context)
            }
        }
    }
}
