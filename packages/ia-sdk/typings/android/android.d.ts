/// <reference path="android-declarations.d.ts"/>

declare module de {
  export module ihreapotheken {
    export module sdk {
      export module client {
        export module nativescript {
          export class IaSdk {
            public static class: java.lang.Class<de.ihreapotheken.sdk.client.nativescript.IaSdk>;
            public finishAllActivities(): void;
            public constructor();
            public logout(success: globalAndroid.content.Context): void;
            public initIaSdk(serverEnv: globalAndroid.content.Context, this_: string, applicationContext: string, accessKey: string): void;
            public getOrderSignaturesListener(): androidx.lifecycle.MutableLiveData<de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes>;
            public setGuestUserData(guestUserData: globalAndroid.content.Context, this_: string, context: string, salutation: string, firstName: string, lastName: string, email: string): void;
            public clearCart(success: globalAndroid.content.Context): void;
            public notifyJs(this_: string, id: string, message: globalAndroid.content.Context): void;
            public getOrderSignatures(): androidx.lifecycle.MutableLiveData<de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes>;
            public transferPrescriptions(this_: globalAndroid.content.Context, context: java.util.List<androidNative.Array<number>>, images: java.util.List<androidNative.Array<number>>, pdfs: java.util.List<string>, codes: string): void;
            public setOrderSignatures(context: androidx.lifecycle.MutableLiveData<de.ihreapotheken.sdk.client.nativescript.IaSdk.SignatureCodes>): void;
            public configureIaSdk(onboardingShouldBeShown: boolean): void;
            public startDashboardActivity(context: globalAndroid.content.Context): void;
            public setPharmacyId(context: globalAndroid.content.Context, pharmacyId: string): void;
            public transferSDKv1UserData(context: globalAndroid.content.Context): void;
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
