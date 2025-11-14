import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugindemo',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    id: 'de.ihreapotheken.sdk.iasdkdemo.staging',
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  ios: {
    id: 'test.demo.sdkv2.ios',
  },
  appPath: 'src',
  cli: {
    packageManager: 'npm',
  },
} as NativeScriptConfig;
