import { NativeScriptConfig } from '@nativescript/core';

export default {
  ios: {
    SPMPackages: [
      {
        name: 'IA-SDK-iOS',
        libs: ['IAOverTheCounter', 'IAOrdering', 'IAPharmacy', 'IACardLink', 'IAIntegrations', 'IAPrescription'],
        repositoryURL: 'https://github.com/ihreapotheken/IA-SDK-iOS',
        version: '0.18.5-beta',
      },
    ]
  }
} as NativeScriptConfig;
