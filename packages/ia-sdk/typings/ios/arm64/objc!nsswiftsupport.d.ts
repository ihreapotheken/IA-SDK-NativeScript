
declare class IaClientViewUIKitViewController extends UIViewController {

	static alloc(): IaClientViewUIKitViewController; // inherited from NSObject

	static finishAllActivities(): void;

	static new(): IaClientViewUIKitViewController; // inherited from NSObject

	readonly viewId: string;

	constructor(o: { viewId: string; });

	initWithViewId(viewId: string): this;
}

declare class NSCIaSdk extends NSObject {

	static alloc(): NSCIaSdk; // inherited from NSObject

	static new(): NSCIaSdk; // inherited from NSObject

	clearCartWithCompletionHandler(completionHandler: (p1: string) => void): void;

	finishAllActivitiesWithCompletionHandler(completionHandler: (p1: string) => void): void;

	initIaSdkWithAccessKeyClientIdServerEnvironmentCompletionHandler(accessKey: string, clientId: string, serverEnvironment: string, completionHandler: (p1: string) => void): void;

	listenForSignatures(callback: (p1: SignatureCodes) => void): void;

	logoutWithCompletionHandler(completionHandler: (p1: string) => void): void;

	setGuestUserDataWithSalutationFirstNameLastNameEmailPhoneNumberCountryCodePhoneNumberWithoutCountryCodeCompletionHandler(salutation: string, firstName: string, lastName: string, email: string, phoneNumberCountryCode: number, phoneNumberWithoutCountryCode: number, completionHandler: (p1: string) => void): void;

	startDashboardActivityWithCompletionHandler(completionHandler: (p1: string) => void): void;

	transferPrescriptionsWithImagesPdfsCodesOrderIdFinishActionCompletionHandler(images: NSArray<NSData> | NSData[], pdfs: NSArray<NSData> | NSData[], codes: NSArray<string> | string[], orderId: string, finishAction: string, completionHandler: (p1: string) => void): void;
}

declare class NativeScriptContainerCtrl extends UIViewController {

	static alloc(): NativeScriptContainerCtrl; // inherited from NSObject

	static new(): NativeScriptContainerCtrl; // inherited from NSObject

	updateData: (p1: NSMutableDictionary<any, any>) => void;
}

/**
 * @since 13.0
 */
declare class NativeScriptViewFactory extends NSObject implements NativeScriptEmbedderDelegate {

	static alloc(): NativeScriptViewFactory; // inherited from NSObject

	/**
	 * @since 15.0
	 */
	static getKeyWindow(): UIWindow;

	static initShared(): void;

	static new(): NativeScriptViewFactory; // inherited from NSObject

	static setApp(value: NativeScriptContainerCtrl): void;

	static setShared(value: NativeScriptViewFactory): void;

	viewCreator: (p1: string) => void;

	viewDestroyer: (p1: string) => void;

	views: NSMutableDictionary<any, any>;

	static app: NativeScriptContainerCtrl;

	static shared: NativeScriptViewFactory;

	getViewById(id: string): UIView;

	presentNativeScriptApp(vc: UIViewController): any;
}

declare class SignatureCodes extends NSObject {

	static alloc(): SignatureCodes; // inherited from NSObject

	static new(): SignatureCodes; // inherited from NSObject

	iaOrderCode: string;

	internalOrderCode: string;

	constructor(o: { iaOrderCode: string; internalOrderCode: string; });

	initWithIaOrderCodeInternalOrderCode(iaOrderCode: string, internalOrderCode: string): this;
}
