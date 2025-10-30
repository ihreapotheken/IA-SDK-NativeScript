/// <reference path="../typings/android/ia-sdk.d.ts" />
/// <reference path="../typings/ios/x86_64/objc!nsswiftsupport.d.ts" />

import { Observable, isAndroid, isIOS } from '@nativescript/core';

export class MainPageModel extends Observable {
  iaSdkAndroid: de.ihreapotheken.sdk.client.nativescript.IaSdk;
  iaSdkIos: NSCIaSdk;

  constructor() {
    super();
    if (isAndroid) {
      this.iaSdkAndroid = new de.ihreapotheken.sdk.client.nativescript.IaSdk();
    }
    if (isIOS) {
      this.iaSdkIos = new NSCIaSdk();
    }
  }

  initIaSdk() {
    if (isAndroid && this.iaSdkAndroid) {
      this.iaSdkAndroid.initIaSdk(
        "a1f4b6e3c7d58f9032eeaa1bc02b4f44f9863d1e5c7a49f7d23e0c96b17af5cd",
        "5004"
      );
    }

    if (isIOS && this.iaSdkIos) {
      this.iaSdkIos.initIaSdkWithAccessKeyClientIdCompletionHandler(
        "e9f3d6a12c4b8f75d1e0a93c5b7d6e2f3c1a9b8e7f4d2c0a1b6e5d3f8c7a1b9e",
        "5004",
        (e) => {
          console.log(e);
        },
      );
    }
  }
}