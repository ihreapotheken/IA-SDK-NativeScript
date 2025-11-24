package de.ihreapotheken.sdk.client.nativescript

import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.Looper
import androidx.lifecycle.MutableLiveData
import androidx.navigation.NavOptionsBuilder
import de.ihreapotheken.sdk.integrations.api.IaSdk
import de.ihreapotheken.sdk.integrations.ui.composables.ClientComponentActivity
import de.ihreapotheken.sdk.integrations.ui.composables.ClientViews
import de.ihreapotheken.sdk.ordering.OrderingModule
import de.ihreapotheken.sdk.otc.OtcModule
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
import de.ihreapotheken.sdk.core.domain.model.GuestUser

class IaSdk {
    private lateinit var sdkModule: IaSdk

    fun initIaSdk(
        applicationContext: Context,
        accessKey: String,
        clientId: String,
        serverEnvironmentId: String,
    ) {
        fun notifyJs(message: String) {
            val intent = Intent("INIT_EVENT")
            intent.putExtra("data", message)
            applicationContext.sendBroadcast(intent)
        }

        sdkModule = IaSdk.register(
            OtcModule,
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
                shouldFetchThemeFromRemote = true,
                prerequisiteFlowConfiguration = PrerequisiteFlowConfiguration(
                    shouldRunLegal = true,
                    shouldRunOnboarding = false,
                ),
            ),
            environmentType = serverEnv,
            sdkEventListener = object : SdkEventListener {
                override fun onSdkEvent(event: SdkEvent) {
                    if (event is SdkEvent.InitStatus && event !is SdkEvent.InitStatus.Initializing) {
                        notifyJs("success")
                    }
                    if (event is SdkEvent.InitError) {
                        notifyJs(event.message)
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
        fun notifyJs(message: String) {
            val intent = Intent("SET_GUEST_DATA_EVENT")
            intent.putExtra("data", message)
            context.sendBroadcast(intent)
        }
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
        sdkModule.setGuestUser(
            guestUserData
        )
        notifyJs("success")
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
        fun notifyJs(message: String) {
            val intent = Intent("TRANSFER_PRESCRIPTIONS_EVENT")
            intent.putExtra("data", message)
            context.sendBroadcast(intent)
        }
        val clearedCart = sdkModule.ordering.clearCart()
        if (!clearedCart) {
            notifyJs("Error clearing cart.")
            return 
        }
        ClientComponentActivity.start(
            context,
            ClientViews.CartScreen,
        )
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
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed({
            sdkModule.ordering.transferPrescriptions(
                transferPrescriptionRequest = TransferPrescriptionRequest(
                    images,
                    pdfs,
                    codes,
                    orderId,
                ),
                transferPrescriptionListener = object : TransferPrescriptionListener {
                    override fun onTransferPrescriptionEvent(event: TransferPrescriptionEvent) {
                        if (event is TransferPrescriptionEvent.Success) {
                            notifyJs("success")
                        }
                        if (event is TransferPrescriptionEvent.Failed) {
                            notifyJs(event.errorMessage)
                        }
                    }
                },
            )
        }, 2000)
    }

    fun finishAllActivities() {
        ClientComponentActivity.finishAllActivities()
    }

    fun logout(
        context: Context,
    ) {
        fun notifyJs(message: String) {
            val intent = Intent("LOGOUT_EVENT")
            intent.putExtra("data", message)
            context.sendBroadcast(intent)
        }

        val success = sdkModule.core.clearAllData()
        if (success) {
            notifyJs("success")
        } else {
            notifyJs("Failed to logout.")
        }
    }
}
