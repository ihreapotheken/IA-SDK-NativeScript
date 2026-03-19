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
    config.resolve.alias.set('@demo/shared', resolve(__dirname, '..', '..', 'tools', 'demo'));

    // css-tree (via @nativescript/core) pulls in `url` which is a Node.js built-in.
    // Provide an empty fallback since it's not needed at runtime on mobile.
    config.resolve.merge({ fallback: { url: false } });

    // Disable type checking — platform-specific SDK source files (index.android.ts / index.ios.ts)
    // trigger cross-platform type errors. Type safety is verified in the main workspace.
    config.plugins.delete('ForkTsCheckerWebpackPlugin');

    config.plugin('define-secrets').use(DefinePlugin, [
      {
        APPSDK_ACCESS_KEY: JSON.stringify(secrets.APPSDK_ACCESS_KEY || ''),
      },
    ]);
  });

  return webpack.resolveConfig();
};
