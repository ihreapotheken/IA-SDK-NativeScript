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

### 4.2. Add typings

In the host app `references.d.ts` file, a reference path is appended in order for the host app to access the library typings:

```ts
/// <reference path="./node_modules/@ihreapotheken/ia-sdk/references.d.ts" />
```

### 4.3. Plugin usage

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
[API reference](https://ihreapotheken.github.io/docs/appsdk/nativescript).
