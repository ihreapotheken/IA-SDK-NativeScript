# IA SDK Verify Demo

A lightweight NativeScript app for smoke-testing the latest published release of `@ihreapotheken/ia-sdk` from the GitHub Package Registry.

Unlike `apps/demo` (which depends on the local workspace package), this app installs the SDK from GitHub Packages — so it verifies that the deployed build is fully functional end-to-end.

## Purpose

After each release tag is pushed (triggering the `package_deploy` GitHub Actions workflow), run this app on a device to confirm:

- The published package installs correctly from GitHub Packages
- The SDK initialises without errors
- Core flows (dashboard, pharmacy switch, logout, etc.) work as expected

## Project structure

```
apps/verify-demo/
├── .npmrc                  ← GitHub Packages auth (gitignored — see below)
├── .secrets -> ../demo/.secrets        ← symlink: shared SDK access key
├── src/     -> ../demo/src             ← symlink: shared app source
├── hooks/   -> ../demo/hooks           ← symlink: shared NativeScript hooks
├── package.json            ← pins @ihreapotheken/ia-sdk to the release version
├── nativescript.config.ts  ← app ID: de.ihreapotheken.nativescript
├── webpack.config.js
└── tsconfig.json
```

`src/`, `.secrets`, and `hooks/` are symlinked from `apps/demo` so there is no duplicated source code to maintain.

## Prerequisites

### 1. `.npmrc` — GitHub Packages token

`@ihreapotheken/ia-sdk` is hosted on the GitHub Package Registry and requires authentication. Create `apps/verify-demo/.npmrc` (it is gitignored):

```
@ihreapotheken:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GITHUB_PAT>
```

The token needs the `read:packages` scope. Generate one at **GitHub → Settings → Developer settings → Personal access tokens**.

### 2. `.secrets` — SDK access key

The `.secrets` file is symlinked from `apps/demo/.secrets`. Ensure that file contains:

```
APPSDK_ACCESS_KEY=<your_access_key>
```

### 3. Update the target version

In `package.json`, set the version you want to verify:

```json
"@ihreapotheken/ia-sdk": "2026.3.19-535"
```

Version format mirrors the release tag `YYYY.MM.DD.BUILD` → `YYYY.M.D-BUILD` (leading zeros stripped from month/day).

## Running

```bash
cd apps/verify-demo
npm install
ns run android   # or ios
```

To target a specific connected device:

```bash
ns run android --device <device-id>
```

List available devices with `ns device android`.
