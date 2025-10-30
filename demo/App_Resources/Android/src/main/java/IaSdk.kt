package de.ihreapotheken.sdk.client.nativescript

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ComposeView
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import coil3.util.CoilUtils.result
import de.ihreapotheken.sdk.core.navigation.SdkEntryScreen
import de.ihreapotheken.sdk.core.navigation.SdkGraph.sdkGraphProvider
import de.ihreapotheken.sdk.core.navigation.route.Route
import de.ihreapotheken.sdk.core.ui.theme.SdkTheme
import de.ihreapotheken.sdk.integrations.api.IaSdk
import de.ihreapotheken.sdk.ordering.OrderingModule
import de.ihreapotheken.sdk.otc.OtcModule
import de.ihreapotheken.sdk.pharmacy.PharmacyModule
import de.ihreapotheken.sdk.rx.RxModule
import kotlin.jvm.java

class IaSdk {
    lateinit var sdkModule: IaSdk

    fun initIaSdk(
        accessKey: String,
        clientId: String,
    ) {
        sdkModule = IaSdk.register(
            OtcModule,
            OrderingModule,
            PharmacyModule,
            RxModule,
        )
        sdkModule.init(
            context = com.tns.NativeScriptApplication.getInstance().applicationContext,
            apiKey = accessKey,
            clientID = clientId,
        )
    }
}
