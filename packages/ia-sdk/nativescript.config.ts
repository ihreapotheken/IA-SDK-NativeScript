import { NativeScriptConfig } from '@nativescript/core';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(__dirname, '.env');
const raw = fs.readFileSync(envPath, 'utf-8');
const env: Record<string,string> = {};
raw.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) env[k.trim()] = v.trim().replaceAll("\"", "");
});

export default {
  ios: {
    SPMPackages: [
      {
        name: 'IA-SDK-iOS',
        libs: ['IAOverTheCounter', 'IAOrdering', 'IAPharmacy', 'IACardLink', 'IAIntegrations', 'IAPrescription'],
        repositoryURL: 'https://github.com/ihreapotheken/IA-SDK-iOS',
        version: env.IOS_APPSDK_VERSION,
      },
    ]
  },
} as NativeScriptConfig;
