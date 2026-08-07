const webpack = require('@nativescript/webpack');
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const { DefinePlugin } = require('webpack');

function loadKeyValueFile(filePath) {
  const vars = {};

  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf-8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          vars[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
        }
      }
    });
  } else {
    console.warn('Warning: file not found at', filePath);
  }

  return vars;
}

module.exports = (env) => {
  const secrets = loadKeyValueFile(resolve(__dirname, '.secrets'));
  const envConfig = loadKeyValueFile(resolve(__dirname, '..', '..', 'packages', 'ia-sdk', '.env'));

  webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack((config) => {
    config.resolve.alias.set('@demo/shared', resolve(__dirname, '..', '..', 'tools', 'demo'));

    // css-tree (via @nativescript/core) pulls in `url` which is a Node.js built-in.
    // Provide an empty fallback since it's not needed at runtime on mobile.
    config.resolve.merge({ fallback: { url: false } });

    // Disable type checking — platform-specific SDK source files (index.android.ts / index.ios.ts)
    // trigger cross-platform type errors. Type safety is verified in the main workspace.
    config.plugins.delete('ForkTsCheckerWebpackPlugin');

    // src/ is a symlink to ../demo/src, so every global that demo's webpack defines must be
    // defined here too or the shared code throws a ReferenceError on load.
    config.plugin('define-secrets').use(DefinePlugin, [
      {
        APPSDK_ACCESS_KEY: JSON.stringify(secrets.APPSDK_ACCESS_KEY || ''),
        ANDROID_APPSDK_VERSION: JSON.stringify(envConfig.ANDROID_APPSDK_VERSION || 'N/A'),
        IOS_APPSDK_VERSION: JSON.stringify(envConfig.IOS_APPSDK_VERSION || 'N/A'),
        APPSDK_SERVER_ENV: JSON.stringify(process.env.APPSDK_SERVER_ENV || 'staging'),
      },
    ]);
  });

  return webpack.resolveConfig();
};
