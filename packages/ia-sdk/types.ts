import { Observable } from '@nativescript/core';

export abstract class IaSdkBase extends Observable {
  abstract initIaSdk(accessKey: string | null, clientId: string | null, serverEnvironment: IaSdkBase.ServerEnvironment, analyticsEnabled: boolean, completionHandler: ((e: any) => void) | null): void;

  abstract setGuestUserData(salutation: IaSdkBase.Salutation, firstName: string, lastName: string, email: string, phoneNumberCountryCode: number, phoneNumberWithoutCountryCode: number, completionHandler: ((e: any) => void) | null): void;

  abstract transferPrescriptions(images: string[] | null, pdfs: string[] | null, codes: string[] | null, orderId: string | null, completionHandler: ((e: any) => void) | null): void;

  abstract startDashboardActivity(completionHandler: ((e: any) => void) | null): void;

  abstract finishAllActivities(completionHandler: ((e: any) => void) | null): void;

  abstract logout(completionHandler: ((e: any) => void) | null): void;

  abstract setPharmacyId(pharmacyId: string, completionHandler: ((e: any) => void) | null): void;

  abstract transferSDKv1UserData(completionHandler: ((e: any) => void) | null): void;

  abstract clearCart(completionHandler: ((e: any) => void) | null): void;

  abstract get orderSignatureListener(): OrderSignatureListener;
}

export namespace IaSdkBase {
  export enum ServerEnvironment {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
  }

  export enum Salutation {
    Male = 'Herr',
    Female = 'Frau',
    NotDisclosed = 'Keine Angabe',
  }
}

export class OrderCodes {
  iaOrderCode: string;
  hostAppOrderCode: string;

  constructor(iaOrderCode: string, hostAppOrderCode: string) {
    this.iaOrderCode = iaOrderCode;
    this.hostAppOrderCode = hostAppOrderCode;
  }
}

export class OrderSignatureListener extends Observable {
  private _value: OrderCodes | null = null;

  constructor() {
    super();
  }

  get value(): OrderCodes | null {
    return this._value;
  }

  set value(v: OrderCodes | null) {
    this._value = v;
    if (v != null) {
      this.notify({
        eventName: 'change',
        object: this,
        value: v,
      });
    }
  }
}
