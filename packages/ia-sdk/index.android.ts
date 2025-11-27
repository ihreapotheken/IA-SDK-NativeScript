import { IaSdkBase, OrderCodes, OrderSignatureListener } from './types';
import { Application, Utils } from '@nativescript/core';

export class IaSdkAndroid extends IaSdkBase {
    private static _instance: IaSdkAndroid | null = null;

    private constructor() {
        super();
        const observer = new androidx.lifecycle.Observer({
            onChanged: (codes: de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes | null) => {
                if (codes != null) {
                    this.iaSdk.finishAllActivities();
                    this.signatureListener.value = new OrderCodes(
                        codes.getIaOrderCode(),
                        codes.getHostOrderCode(),
                    );
                }
            }
        });
        this.iaSdk.getOrderSignaturesListener().observeForever(observer)
    }

    public static get instance(): IaSdkAndroid {
        if (!IaSdkAndroid._instance) {
            IaSdkAndroid._instance = new IaSdkAndroid();
        }
        return IaSdkAndroid._instance;
    }

    iaSdk = new de.ihreapotheken.sdk.client.nativescript.IaSdk();

    initIaSdk(
        accessKey: string,
        clientId: string,
        serverEnvironment: string,
        completionHandler: (e: any) => void,
    ): void {
        Application.android.registerBroadcastReceiver(
            "INIT_EVENT",
            (context, intent) => {
                const message = intent.getStringExtra("data");
                Application.android.unregisterBroadcastReceiver("INIT_EVENT");
                setTimeout(() => {
                    completionHandler(message); 
                }, 0);
            }
        )
        this.iaSdk.initIaSdk(
            Utils.android.getCurrentActivity(),
            accessKey,
            clientId,
            serverEnvironment,
        );
    }

    setGuestUserData(
        salutation: IaSdkBase.Salutation, 
        firstName: string, 
        lastName: string, 
        email: string, 
        phoneNumberCountryCode: number, 
        phoneNumberWithoutCountryCode: number,
        completionHandler: (e: any) => void,
    ): void {
        Application.android.registerBroadcastReceiver(
            "SET_GUEST_DATA_EVENT",
            (context, intent) => {
                const message = intent.getStringExtra("data");
                Application.android.unregisterBroadcastReceiver("SET_GUEST_DATA_EVENT");
                setTimeout(() => {
                    completionHandler(message); 
                }, 0);
            }
        )
        this.iaSdk.setGuestUserData(
            Utils.android.getCurrentActivity(),
            salutation,
            firstName,
            lastName,
            email,
            phoneNumberCountryCode.toString(),
            phoneNumberWithoutCountryCode.toString(),
        )
    }

    transferPrescriptions(
        images: Array<string> | null,
        pdfs: Array<string> | null,
        codes: Array<String> | null,
        orderId: string | null,
        completionHandler: (e: any) => void,
    ): void {
        Application.android.registerBroadcastReceiver(
            "TRANSFER_PRESCRIPTIONS_EVENT",
            (context, intent) => {
                const message = intent.getStringExtra("data");
                Application.android.unregisterBroadcastReceiver("TRANSFER_PRESCRIPTIONS_EVENT");
                setTimeout(() => {
                    completionHandler(message); 
                }, 0);
            }
        )
        const imagesArrayList = new java.util.ArrayList();
        for (const imageBase64 of images) {
            const bytes = android.util.Base64.decode(imageBase64, android.util.Base64.DEFAULT);
            imagesArrayList.add(bytes);
        }
        const pdfsArrayList = new java.util.ArrayList();
        for (const pdfBase64 of pdfs) {
            const bytes = android.util.Base64.decode(pdfBase64, android.util.Base64.DEFAULT);
            pdfsArrayList.add(bytes);
        }
        const codesArrayList = new java.util.ArrayList();
        for (const codeList of codes) {
            codesArrayList.add(codeList);
        }
        this.iaSdk.transferPrescriptions(
            Utils.android.getCurrentActivity(),
            imagesArrayList,
            pdfsArrayList,
            codesArrayList,
            orderId,
        );
    }

    startDashboardActivity(
        completionHandler: (e: any) => void,
    ): void {
        this.iaSdk.startDashboardActivity(
            Utils.android.getCurrentActivity(),
        );
        completionHandler("success");
    }

    finishAllActivities(
        completionHandler: (e: any) => void,
    ): void {
        this.iaSdk.finishAllActivities();
        completionHandler("success");
    }

    logout(
        completionHandler: (e: any) => void,
    ): void {
        Application.android.registerBroadcastReceiver(
            "LOGOUT_EVENT",
            (context, intent) => {
                const message = intent.getStringExtra("data");
                Application.android.unregisterBroadcastReceiver("TRANSFER_PRESCRIPTIONS_EVENT");
                setTimeout(() => {
                    completionHandler(message); 
                }, 0);
            }
        )
        this.iaSdk.logout(
            Utils.android.getCurrentActivity(),
        );
    }

    clearCart(
        completionHandler: (e: any) => void,
    ): void {
        Application.android.registerBroadcastReceiver(
            "CLEAR_CART_EVENT",
            (context, intent) => {
                const message = intent.getStringExtra("data");
                Application.android.unregisterBroadcastReceiver("CLEAR_CART_EVENT");
                setTimeout(() => {
                    completionHandler(message); 
                }, 0);
            }
        )
        this.iaSdk.clearCart(
            Utils.android.getCurrentActivity(),
        );
    }
    
    signatureListener = new OrderSignatureListener();

    get orderSignatureListener(): OrderSignatureListener {
        return this.signatureListener;
    }
}
