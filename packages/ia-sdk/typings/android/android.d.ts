/// <reference path="android-declarations.d.ts"/>

declare module de {
	export module ihreapotheken {
		export module sdk {
			export module client {
				export module nativescript {
					export class IaSdk {
						public static class: java.lang.Class<de.ihreapotheken.sdk.client.nativescript.IaSdk>;
						public constructor();
						public initIaSdk(this_: globalAndroid.content.Context, applicationContext: string, accessKey: string, clientId: string): void;
						public finishAllActivities(): void;
						public getOrderSignaturesListener(): androidx.lifecycle.MutableLiveData<de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes>;
						public transferPrescriptions(context: globalAndroid.content.Context, images: java.util.List<androidNative.Array<number>>, pdfs: java.util.List<androidNative.Array<number>>, codes: java.util.List<string>, orderId: string): void;
						public setGuestUserData(context: globalAndroid.content.Context, this_: string, salutation: string, firstName: string, lastName: string, email: string, phoneNumberCountryCode: string): void;
						public logout(this_: globalAndroid.content.Context): void;
					}
					export module IaSdk {
						export class SignatureCodes {
							public static class: java.lang.Class<de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes>;
							public component2(): string;
							public getIaOrderCode(): string;
							public hashCode(): number;
							public equals(other: any): boolean;
							public constructor(iaOrderCode: string, hostOrderCode: string);
							public getHostOrderCode(): string;
							public toString(): string;
							public component1(): string;
							public copy(iaOrderCode: string, hostOrderCode: string): de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes;
						}
					}
				}
			}
		}
	}
}

//Generics information:

