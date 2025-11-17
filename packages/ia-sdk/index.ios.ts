import { IaSdkBase, OrderCodes, OrderSignatureListener } from './types';

export class IaSdkIOS extends IaSdkBase {
    private static _instance: IaSdkIOS | null = null;

    private constructor() {
        super();
        this.iaSdk.listenForSignatures((codes) => {
            if (codes != null) {
                IaClientViewUIKitViewController.finishAllActivities();
                this.signatureListener.value = new OrderCodes(
                    codes.iaOrderCode,
                    codes.internalOrderCode,
                );
            }
        });
    }

    public static get instance(): IaSdkIOS {
        if (!IaSdkIOS._instance) {
            IaSdkIOS._instance = new IaSdkIOS();
        }
        return IaSdkIOS._instance;
    }

    iaSdk  = new NSCIaSdk();

    initIaSdk(
        accessKey: string,
        clientId: string,
        serverEnvironment: string,
        completionHandler: (e: any) => void,
    ): void {
        this.iaSdk.initIaSdkWithAccessKeyClientIdServerEnvironmentCompletionHandler(
            accessKey,
            clientId,
            serverEnvironment,
            completionHandler,
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
        this.iaSdk.setGuestUserDataWithSalutationFirstNameLastNameEmailPhoneNumberCountryCodePhoneNumberWithoutCountryCodeCompletionHandler(
            salutation,
            firstName,
            lastName,
            email,
            phoneNumberCountryCode,
            phoneNumberWithoutCountryCode,
            completionHandler,
        )
    }

    transferPrescriptions(
        images: Array<string> | null,
        pdfs: Array<string> | null,
        codes: Array<string> | null,
        orderId: string | null,
        completionHandler: (e: any) => void,
    ): void {
        const nsDataImageArray = NSMutableArray.alloc().init();
        for (const imageBase64 of images) {
            const data = NSData.alloc().initWithBase64EncodedStringOptions(
                imageBase64, 
                NSDataBase64DecodingOptions.IgnoreUnknownCharacters,
            );
            nsDataImageArray.addObject(data);
        }
        const nsDataPdfArray = NSMutableArray.alloc().init();
        for (const pdfBase64 of pdfs) {
            const data = NSData.alloc().initWithBase64EncodedStringOptions(
                pdfBase64, 
                NSDataBase64DecodingOptions.IgnoreUnknownCharacters,
            );
            nsDataPdfArray.addObject(data);
        }
        this.iaSdk.transferPrescriptionsWithImagesPdfsCodesOrderIdFinishActionCompletionHandler(
            nsDataImageArray,
            nsDataPdfArray,
            codes.flat(),
            orderId,
            "noAction",
            completionHandler,
        );
    }

    logout(
        completionHandler: (e: any) => void,
    ): void {
        this.iaSdk.logoutWithCompletionHandler(
            completionHandler,
        );
    }

    signatureListener = new OrderSignatureListener();

    get orderSignatureListener(): OrderSignatureListener {
        return this.signatureListener;
    }
}
