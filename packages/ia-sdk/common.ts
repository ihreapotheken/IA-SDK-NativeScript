import { Observable, isAndroid, isIOS } from '@nativescript/core';
import { IaSdkAndroid } from './index.android';
import { IaSdkIOS } from './index.ios';
import { IaSdkBase } from './types';

/**
 * Base definitions for the ia.de SDK service, including any relevant methods, fields, and callbacks.
 */
export class IaSdk extends Observable {
    private static accessKey: string | null = null

    private static clientId: string | null = null

    private static serverEnv: IaSdkBase.ServerEnvironment | null = null

    /**
     * Allocate the resources required for the ia.de SDK runtime execution.
     * 
     * The method must be called before accessing any additional SDK resources.
     * 
     * @param accessKey Authentication key used to identify the host app. 
     * @param clientId Client identifier used for pharmacy selection services.
     * @param serverEnvironment Specified server environment for the ia.de services.
     */
    initIaSdk(
        accessKey: string | null,
        clientId: string | null,
        serverEnvironment: IaSdkBase.ServerEnvironment = IaSdkBase.ServerEnvironment.Staging,
    ): Promise<void> {
        IaSdk.accessKey = accessKey
        IaSdk.clientId = clientId
        IaSdk.serverEnv = serverEnvironment
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.initIaSdk(
                    accessKey,
                    clientId,
                    serverEnvironment,
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                IaSdkIOS.instance.initIaSdk(
                    accessKey,
                    clientId,
                    serverEnvironment.toString(),
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                )
            }
        });
    }

    /**
     * Forwards the client personal information to the ia.de library for checkout purposes.
     * 
     * @param salutation Customer pronouns.
     * @param firstName First / personal customer name.
     * @param lastName Last name or customer surname. 
     * @param email Email address used for communication purposes.
     * @param phoneNumberCountryCode Phone number country code (e.g., 49).
     * @param phoneNumberWithoutCountryCode Phone number without country code.
     */
    setGuestUserData(
        salutation: IaSdkBase.Salutation,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumberCountryCode: number,
        phoneNumberWithoutCountryCode: number,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.setGuestUserData(
                    salutation,
                    firstName,
                    lastName,
                    email,
                    phoneNumberCountryCode,
                    phoneNumberWithoutCountryCode,
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
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
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                )
            }
        });
    }

    /**
     * Transfers a collection of prescription entries to the ia.de backend for checkout purposes.
     * 
     * @param images Base64-encoded PDF or JPG images.
     * @param pdfs Base64-encoded PDF files.
     * @param codes JSON-encoded eRezept codes (e.g., `["{\"urls\":[\"Task\/test9ba2fee0d07e4ef2b6205f8012e1445b\/$accept?ac=5e24cc059ff244bdbb01efcccf834a6329bdac67a4a64733938fe1b799ac19a9\"]}"]`).
     * @param orderId Client order identifier forwarded in order to differentiate between orders on 
     * @param finishAction Specification for the AppSDK handling of successful prescription transaction.
     */
    transferPrescriptions(
        images: Array<string> | null,
        pdfs: Array<string> | null,
        codes: Array<string> | null,
        orderId: string | null,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.transferPrescriptions(
                    images,
                    pdfs,
                    codes,
                    orderId,
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                IaSdkIOS.instance.transferPrescriptions(
                    images,
                    pdfs,
                    codes,
                    orderId,
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
        });
    }

    /**
     * Launches the dashboard screen on top of the navigation stack.
     */
    startDashboardActivity(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (IaSdk.accessKey == null) {
                return reject("initIaSdk method not invoked.");
            }
            if (isAndroid) {
                IaSdkAndroid.instance.startDashboardActivity(
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                this.initIaSdk(
                    IaSdk.accessKey,
                    IaSdk.clientId,
                    IaSdk.serverEnv,
                ).then(
                    (_) => {
                        IaSdkIOS.instance.startDashboardActivity(
                            (e: any) => {
                                if (e == null) {
                                    resolve();
                                } else {
                                    reject(e);
                                }
                            },
                        );
                    },
                    (e) => {
                        reject(e);
                    },
                );
            }
        });
    }

    /**
     * Launches the dashboard screen on top of the navigation stack.
     */
    finishAllActivities(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.finishAllActivities(
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                IaSdkIOS.instance.finishAllActivities(
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
        });
    }

    /**
     * Clears all user data and preferences.
     */
    logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.logout(
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                IaSdkIOS.instance.logout(
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
        });
    }

    /**
     * Clears the user cart.
     */
    clearCart(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                IaSdkAndroid.instance.clearCart(
                    (e: any) => {
                        if (e == "success") {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
            if (isIOS) {
                IaSdkIOS.instance.clearCart(
                    (e: any) => {
                        if (e == null) {
                            resolve();
                        } else {
                            reject(e);
                        }
                    },
                );
            }
        });
    }

    /**
     * [Observable] object notifying of any updates with the ia.de checkout process, 
     * forwarding the SDK and any submitted order codes to listeners. 
     * 
     * The notifier value will be updated with "change" callback identifier:
     * 
     * ```ts
     * signatureListener.addEventListener(
	 *     "change",
     *     (data: EventData) => {
     *          const observable = (data.object as OrderSignatureListener)
     *          console.log(observable.value.iaOrderCode);
     *          console.log(observable.value.hostAppOrderCode);
     *     }
     * )
     * ```
     */
    signatureListener = isAndroid ? IaSdkAndroid.instance.orderSignatureListener : IaSdkIOS.instance.orderSignatureListener;
}