# Demo App

This is the NativeScript demo application for the ia.de AppSDK plugin.

## Prerequisites

- NativeScript CLI 8.9+
- Node.js and npm
- iOS: Xcode 16.0+ (macOS only)
- Android: Android SDK with API level 30+

## Configuration

### Secrets Setup

The demo app requires an access key for SDK initialization. This key is loaded from a `.secrets` file at build time.

1. Create a `.secrets` file in the `apps/demo/` directory:

```
APPSDK_ACCESS_KEY=your_access_key_here
```

2. Replace `your_access_key_here` with your actual SDK access key provided by the ia.de team.

> **Note:** The `.secrets` file is already included in `.gitignore` and should never be committed to version control.

### How It Works

The `webpack.config.js` reads the `.secrets` file during the build process and injects the `APPSDK_ACCESS_KEY` as a global constant via webpack's DefinePlugin. This approach:

- Keeps sensitive credentials out of source control
- Injects the key at build time (not runtime)
- Allows different keys for different environments/developers

## Running the Demo

From the repository root:

```bash
# Install dependencies
npm install

# Run on iOS
npm start demo.ios

# Run on Android
npm start demo.android
```

Or from the `apps/demo/` directory:

```bash
# Run on iOS
ns run ios

# Run on Android
ns run android
```

## Project Structure

```
apps/demo/
├── .secrets              # Local secrets file (not committed)
├── .gitignore            # Includes .secrets
├── webpack.config.js     # Webpack config with secrets injection
└── src/
    └── plugin-demos/
        └── ia-sdk.ts     # SDK demo implementation
```

## Troubleshooting

### Missing Access Key Warning

If you see a warning about the `.secrets` file not being found, ensure:

1. The `.secrets` file exists in `apps/demo/`
2. The file contains `APPSDK_ACCESS_KEY=your_key`
3. There are no extra spaces around the `=` sign

### Build Errors

If the build fails with an undefined `APPSDK_ACCESS_KEY`:

1. Verify the `.secrets` file format
2. Clean the build: `ns clean`
3. Rebuild the app
