import { IaSdkBase, OrderCodes, OrderSignatureListener } from './types';

export class IaSdkIOS extends IaSdkBase {
  private static _instance: IaSdkIOS | null = null;

  private constructor() {
    super();
    this.iaSdk.listenForSignatures((codes) => {
      if (codes != null) {
        this.iaSdk.finishAllActivitiesWithCompletionHandler((e: any) => {});
        this.signatureListener.value = new OrderCodes(codes.iaOrderCode, codes.internalOrderCode);
      }
    });
  }

  public static get instance(): IaSdkIOS {
    if (!IaSdkIOS._instance) {
      IaSdkIOS._instance = new IaSdkIOS();
    }
    return IaSdkIOS._instance;
  }

  iaSdk = new NSCIaSdk();

  initIaSdk(accessKey: string, clientId: string, serverEnvironment: string, analyticsEnabled: boolean, completionHandler: (e: any) => void): void {
    // Cast: typings still describe the pre-`analyticsEnabled` selector; the Swift side has
    // the new selector. NS dispatches via Obj-C runtime.
    (this.iaSdk as any).initIaSdkWithAccessKeyClientIdServerEnvironmentAnalyticsEnabledCompletionHandler(accessKey, clientId, serverEnvironment, analyticsEnabled, completionHandler);
  }

  configureIaSdk(options: { footerShouldShowDataProcessing?: boolean; shouldFetchThemeFromRemote?: boolean }): void {
    // Convert TypeScript object to NSDictionary
    const nativeOptions: any = {};
    if (options.footerShouldShowDataProcessing !== undefined) {
      nativeOptions.footerShouldShowDataProcessing = options.footerShouldShowDataProcessing;
    }
    if (options.shouldFetchThemeFromRemote !== undefined) {
      nativeOptions.shouldFetchThemeFromRemote = options.shouldFetchThemeFromRemote;
    }
    this.iaSdk.configureIaSdk(nativeOptions);
  }

  setGuestUserData(salutation: IaSdkBase.Salutation, firstName: string, lastName: string, email: string, phoneNumberCountryCode: number, phoneNumberWithoutCountryCode: number, completionHandler: (e: any) => void): void {
    this.iaSdk.setGuestUserDataWithSalutationFirstNameLastNameEmailPhoneNumberCountryCodePhoneNumberWithoutCountryCodeCompletionHandler(salutation, firstName, lastName, email, phoneNumberCountryCode, phoneNumberWithoutCountryCode, completionHandler);
  }

  transferPrescriptions(images: Array<string> | null, pdfs: Array<string> | null, codes: Array<string> | null, orderId: string | null, completionHandler: (e: any) => void): void {
    const nsDataImageArray = NSMutableArray.alloc().init();
    for (const imageBase64 of images) {
      const data = NSData.alloc().initWithBase64EncodedStringOptions(imageBase64, NSDataBase64DecodingOptions.IgnoreUnknownCharacters);
      nsDataImageArray.addObject(data);
    }
    const nsDataPdfArray = NSMutableArray.alloc().init();
    for (const pdfBase64 of pdfs) {
      const data = NSData.alloc().initWithBase64EncodedStringOptions(pdfBase64, NSDataBase64DecodingOptions.IgnoreUnknownCharacters);
      nsDataPdfArray.addObject(data);
    }
    this.iaSdk.transferPrescriptionsWithImagesPdfsCodesOrderIdFinishActionCompletionHandler(nsDataImageArray, nsDataPdfArray, codes.flat(), orderId, 'noAction', completionHandler);
  }

  startDashboardActivity(completionHandler: (e: any) => void): void {
    this.iaSdk.startDashboardActivityWithCompletionHandler(completionHandler);
  }

  finishAllActivities(completionHandler: (e: any) => void): void {
    this.iaSdk.finishAllActivitiesWithCompletionHandler(completionHandler);
  }

  logout(completionHandler: (e: any) => void): void {
    this.iaSdk.logoutWithCompletionHandler(completionHandler);
  }

  setPharmacyId(pharmacyId: string, completionHandler: (e: any) => void): void {
    this.iaSdk.setPharmacyIdWithPharmacyIdCompletionHandler(pharmacyId, completionHandler);
  }

  transferSDKv1UserData(completionHandler: (e: any) => void): void {
    this.iaSdk.transferSDKv1UserDataWithCompletionHandler(completionHandler);
  }

  clearCart(completionHandler: (e: any) => void): void {
    this.iaSdk.clearCartWithCompletionHandler(completionHandler);
  }

  signatureListener = new OrderSignatureListener();

  get orderSignatureListener(): OrderSignatureListener {
    return this.signatureListener;
  }
}
