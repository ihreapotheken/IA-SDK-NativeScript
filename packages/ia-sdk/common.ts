import { Observable, isAndroid, isIOS } from '@nativescript/core';
import { IaSdkAndroid } from './index.android';
import { IaSdkIOS } from './index.ios';
import { IaSdkBase } from './types';

/**
 * Base definitions for the ia.de SDK service, including any relevant methods, fields, and callbacks.
 */
export class IaSdk extends Observable {
    /**
     * Allocate the resources required for the ia.de SDK runtime execution.
     * 
     * The method must be called before accessing any additional SDK resources.
     * 
     * @param accessKey Authentication key used to identify the host app. 
     * @param clientId Client identifier used for pharmacy selection services.
     * @param serverEnvironment Specified server environment for the ia.de services.
     * @param completionHandler Callback received on method execution completion with optional error parameter.
     */
    initIaSdk(
        accessKey: string | null,
        clientId: string | null,
        serverEnvironment: IaSdkBase.ServerEnvironment = IaSdkBase.ServerEnvironment.Staging,
        completionHandler: (e: any) => void,
    ) {
        if (isAndroid) {
            IaSdkAndroid.instance.initIaSdk(
                accessKey,
                clientId,
                serverEnvironment,
                completionHandler,
            );
        }
        if (isIOS) {
            IaSdkIOS.instance.initIaSdk(
                accessKey,
                clientId,
                serverEnvironment.toString(),
                completionHandler,
            )
        }
    }

    /**
     * Forwards the client personal information to the ia.de library for checkout purposes.
     * 
     * @param salutation 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param phoneNumberCountryCode 
     * @param phoneNumberWithoutCountryCode 
     * @param completionHandler 
     */
    setGuestUserData(
        salutation: IaSdkBase.Salutation,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumberCountryCode: number,
        phoneNumberWithoutCountryCode: number,
        completionHandler: (e: any) => void,
    ) {
        if (isAndroid) {
            IaSdkAndroid.instance.setGuestUserData(
                salutation,
                firstName,
                lastName,
                email,
                phoneNumberCountryCode,
                phoneNumberWithoutCountryCode,
                completionHandler,
            )
        }
        if (isIOS) {
            IaSdkIOS.instance.setGuestUserData(
                salutation,
                firstName,
                lastName,
                email,
                phoneNumberCountryCode,
                phoneNumberWithoutCountryCode,
                completionHandler,
            )
        }
    }

    /**
     * Transfers a collection of prescription entries to the ia.de backend for checkout purposes.
     * 
     * @param images Base64-encoded PDF or JPG images.
     * @param pdfs Base64-encoded PDF files.
     * @param codes JSON-encoded eRezept codes (e.g., `["{\"urls\":[\"Task\/test9ba2fee0d07e4ef2b6205f8012e1445b\/$accept?ac=5e24cc059ff244bdbb01efcccf834a6329bdac67a4a64733938fe1b799ac19a9\"]}"]`).
     * @param orderId Client order identifier forwarded in order to differentiate between orders on 
     * @param finishAction Specification for the AppSDK handling of successful prescription transaction.
     * @param completionHandler Callback invoked on method execution completion, with nullable error field.
     */
    transferPrescriptions(
        images: Array<string> | null,
        pdfs: Array<string> | null,
        codes: Array<string> | null,
        orderId: string | null,
        finishAction: IaSdkBase.TransferPrescriptionsFinishAction = IaSdkBase.TransferPrescriptionsFinishAction.NoAction,
        completionHandler: (e: any) => void,
    ): void {
        if (isAndroid) {
            IaSdkAndroid.instance.transferPrescriptions(
                images,
                pdfs,
                codes,
                orderId,
                null,
                completionHandler,
            );
        }
        if (isIOS) {
            IaSdkIOS.instance.transferPrescriptions(
                images,
                pdfs,
                codes,
                orderId,
                finishAction.toString(),
                completionHandler,
            );
        }
    }
}