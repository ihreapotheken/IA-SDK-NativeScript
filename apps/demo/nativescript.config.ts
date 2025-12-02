import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugindemo',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    id: 'de.ihreapotheken.nativescript',
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  ios: {
    id: 'de.ihreapotheken.nativescript',
  },
  appPath: 'src',
  cli: {
    packageManager: 'npm',
  },
} as NativeScriptConfig;
