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
    // shared demo code
    config.resolve.alias.set('@demo/shared', resolve(__dirname, '..', '..', 'tools', 'demo'));

    // Inject secrets and env config as global constants
    config.plugin('define-secrets').use(DefinePlugin, [
      {
        APPSDK_ACCESS_KEY: JSON.stringify(secrets.APPSDK_ACCESS_KEY || ''),
        ANDROID_APPSDK_VERSION: JSON.stringify(envConfig.ANDROID_APPSDK_VERSION || 'N/A'),
        IOS_APPSDK_VERSION: JSON.stringify(envConfig.IOS_APPSDK_VERSION || 'N/A'),
      },
    ]);
  });

  // Example if you need to share images across demo apps:
  // webpack.Utils.addCopyRule({
  //   from: '../../../tools/images',
  // 	to: 'images',
  //   context: webpack.Utils.project.getProjectFilePath('node_modules')
  // });

  return webpack.resolveConfig();
};
