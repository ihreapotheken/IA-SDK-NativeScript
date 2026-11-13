# AppSDK NativeScript Plugin

NativeScript [Plugin](https://docs.nativescript.org/plugins/) project implemented with the ia.de AppSDK services.

## 1. General Info

---

The plugin implementation is based on the native AppSDK libraries developed by the ia.de team with Kotlin and Swift.

These native libraries offer both checkout services as well as view components in order to ensure seamless integration
with any client setup.

Public API Reference: https://ihreapotheken.github.io/docs/appsdk/nativescript

## 2. Developer Setup

---

- [NativeScript SDK](https://docs.nativescript.org) 8.9 and up
- [Node Package Manager](https://docs.npmjs.com/getting-started) 11.6 and up
- [Github Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) for native library access

## 3. Platform Support

---

The library is supported on both of the major mobile operating systems, with constraints noted below:

### Android

- Minimum SDK Version: `30`
- Target SDK Version: `36`
- Kotlin `2.1.0`
- Gradle `8.12.3`

### iOS

- Minimum iOS Version: `15`
- Xcode: `16.0`
- Swift `5.9`

## 4. Client Setup

---

For official reference, please see
[the NativeScript SDK documentation](https://docs.nativescript.org/plugins/)
on using plugins.

### 4.1. Add the dependency to the `package.json` file

The library is accessed from Github NPM Package Registry.

Firstly, the location must be defined in your app's `.npmrc` file, located in the root of your project:

```
@ihreapotheken:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Make sure to replace `YOUR_GITHUB_PAT` with the actual value of your Github Personal Access Token.

Afterwards, the library can be installed from the command line:

```sh
npm install @ihreapotheken/ia-sdk@VERSION_NUMBER
```

The `VERSION_NUMBER` value can be referenced from the 
[package release page](https://github.com/ihreapotheken/IA-SDK-NativeScript/pkgs/npm/ia-sdk).

### 4.2. iOS Permissions

Add the following keys to your `Info.plist` file. Location and camera are always required, NFC only with `ia_cardlink`:

```xml
<!-- Location permission - always required, used by Apofinder (part of the core package) -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Used to show pharmacies nearby.</string>

<!-- Camera permission - always required, used by the Apofinder pharmacy code scanner, product scanner and prescription scanner -->
<key>NSCameraUsageDescription</key>
<string>Camera access is needed to scan pharmacy codes, products and prescriptions.</string>

<!-- NFC permission - required for CardLink module -->
<key>NFCReaderUsageDescription</key>
<string>NFC is used to read your health insurance card for prescription redemption.</string>
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
    <string>D2760001448000</string>
    <string>D27600014601</string>
    <string>D27600014606</string>
    <string>D27600000102</string>
    <string>A000000167455349474E</string>
    <string>D27600006601</string>
    <string>D27600014602</string>
    <string>E828BD080FA000000167455349474E</string>
    <string>E828BD080FD27600006601</string>
    <string>D27600014603</string>
</array>
```

| Permission | Key | Required For | Purpose |
|------------|-----|--------------|---------|
| Location (When In Use) | `NSLocationWhenInUseUsageDescription` | Always (Apofinder, core package) | Find nearby pharmacies and get directions |
| Camera | `NSCameraUsageDescription` | Always (Apofinder, `ia_over_the_counter`, `ia_prescription`) | Scan pharmacy codes, products and prescriptions |
| NFC | `NFCReaderUsageDescription` | CardLink module | Read health insurance cards via NFC for prescription redemption |

**Note:** The `com.apple.developer.nfc.readersession.iso7816.select-identifiers` key with the listed AIDs is required for CardLink to communicate with German health insurance cards (eGK) and related secure messaging protocols.

CardLink also needs the following in the Runner target:
- **NFC capability**: Add the "Near Field Communication Tag Reading" capability in the target's **Signing & Capabilities**.
  Make sure the reader session formats in the Runner's `.entitlements` file include `TAG`:
  ```xml
  <key>com.apple.developer.nfc.readersession.formats</key>
  <array>
      <string>TAG</string>
  </array>
  ```
- **Localization**: Add the
  [`LocalizableNFC.xcstrings`](https://github.com/ihreapotheken/IA-SDK-iOS/blob/main/Docs/resources/LocalizableNFC.xcstrings)
  file with the strings shown during NFC scanning.

### 4.3. Add typings

In the host app `references.d.ts` file, a reference path is appended in order for the host app to access the library typings:

```ts
/// <reference path="./node_modules/@ihreapotheken/ia-sdk/references.d.ts" />
```

### 4.4. Plugin usage

Methods and properties made available as public APIs implemented with the `IaSdk` object.

The client setup requires instantiation of this object for usage:

```ts
import { IaSdk } from '@ihreapotheken/ia-sdk/common';

export class MyAppClass {
  iaSdk = new IaSdk();
}
```

You may then proceed with API usages on this object:

```ts
	async initialize() {
		try {
			await this.iaSdk.initIaSdk(
				"c33b7d2757ff7b24613b78c9dc69950aad1588c8d519706fb69b91fcedec65d7",
				"5004",
				IaSdkBase.ServerEnvironment.Staging,
			);
		} catch (error) {
			console.error("Init failed:", error);
		}
	}
```

The  host app developers must ensure the `accessKey` and `clientId` values are updated according to their specific setup.

For more information, please reach out to the ia.de development team. 

---

For further information, please see the
[API reference](https://ihreapotheken.github.io/docs/appsdk/nativescript) 
and [Usage and Testing documentation](https://ihreapotheken.github.io/docs/appsdk/common/usage-and-testing).
