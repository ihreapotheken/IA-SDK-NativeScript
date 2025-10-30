import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'de.ihreapotheken.sdk',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    id: "de.ihreapotheken.sdk.iasdkdemo.staging",
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    id: "test.demo.sdkv2.ios",
    SPMPackages: [
      {
        name: 'IA-SDK-iOS',
        libs: ['IAOverTheCounter', 'IAOrdering', 'IAPharmacy', 'IACardLink', 'IAIntegrations', 'IAPrescription'],
        repositoryURL: 'https://github.com/ihreapotheken/IA-SDK-iOS',
        version: '0.17.11-beta',
      },
    ]
  }
} as NativeScriptConfig;