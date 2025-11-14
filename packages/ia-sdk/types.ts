import { Observable } from "@nativescript/core";

export abstract class IaSdkBase extends Observable {
    abstract initIaSdk(
        accessKey: string | null,
        clientId: string | null,
        serverEnvironment: IaSdkBase.ServerEnvironment,
        completionHandler: ((e: any) => void) | null
    ): void;

    abstract setGuestUserData(
        salutation: IaSdkBase.Salutation,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumberCountryCode: number,
        phoneNumberWithoutCountryCode: number,
        completionHandler: ((e: any) => void) | null
    ): void;

    abstract transferPrescriptions(
        images: string[] | null,
        pdfs: string[] | null,
        codes: string[] | null,
        orderId: string | null,
        finishAction: any,
        completionHandler: (e: any) => void
    ): void;
}

export namespace IaSdkBase {
    export enum ServerEnvironment {
        Development = "development",
        Staging = "staging",
        Production = "production",
    }

    export enum TransferPrescriptionsFinishAction {
        NoAction = "noAction",
        OpenCart = "openCart",
        ShowBottomSheet = "showBottomSheet",
    }

    export enum Salutation {
        Male = "Herr",
        Female = "Frau",
        NotDisclosed = "Keine Angabe",
    }
}