const webpack = require('@nativescript/webpack');
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const { DefinePlugin } = require('webpack');

function loadSecrets() {
  const secretsPath = resolve(__dirname, '.secrets');
  const secrets = {};

  if (existsSync(secretsPath)) {
    const content = readFileSync(secretsPath, 'utf-8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          secrets[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  } else {
    console.warn('Warning: .secrets file not found at', secretsPath);
  }

  return secrets;
}

module.exports = (env) => {
  const secrets = loadSecrets();

  webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack((config) => {
    // shared demo code
    config.resolve.alias.set('@demo/shared', resolve(__dirname, '..', '..', 'tools', 'demo'));

    // Inject secrets as global constants
    config.plugin('define-secrets').use(DefinePlugin, [
      {
        APPSDK_ACCESS_KEY: JSON.stringify(secrets.APPSDK_ACCESS_KEY || ''),
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
