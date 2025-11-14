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

### 4.1. Source control access

TODO

### 4.2. Add the dependency to the `package.json` file

The library is accessed from Github as in below example:

```json
{
  "dependencies": {
    "@nativescript/core": "*",
    "@ia-sdk/ia-sdk": "github:ihreapotheken/IA-SDK-NativeScript"
  }
}
```

You may reference specific branch, tag, or commit hash by specifying the reference with `#`:

`github:ihreapotheken/IA-SDK-NativeScript#myCustomReference`

### 4.3. Plugin usage

Methods and properties made available as public APIs implemented with the `IaSdk` object.

The client setup requires instantiation of this object for usage:

```ts

```

---

For further information, please see the
[API reference](https://ihreapotheken.github.io/docs/appsdk/nativescript).
