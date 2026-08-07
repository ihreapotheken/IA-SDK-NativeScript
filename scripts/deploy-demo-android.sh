#!/bin/bash

# Deploys the Android demo app using the Firebase App Tester service.
#
# Usage:
#
# sh ./scripts/deploy-demo-android.sh

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
PROJECT_DIR="$SCRIPT_DIR/.."

# Setup the environment variables.
source $SCRIPT_DIR/dev-env-setup.sh

# Ensure Android SDK build-tools (zipalign, apksigner) are on PATH. Pick
# the highest-versioned build-tools dir installed on the runner.
if [ -n "$ANDROID_HOME" ] && [ -d "$ANDROID_HOME/build-tools" ]; then
  BUILD_TOOLS_DIR=$(ls -d "$ANDROID_HOME/build-tools"/* 2>/dev/null | sort -V | tail -1)
  if [ -n "$BUILD_TOOLS_DIR" ]; then
    export PATH="$BUILD_TOOLS_DIR:$PATH"
  fi
fi

# Install workspace dependencies (ns clean wipes node_modules; ns prepare
# needs @nativescript/webpack et al. resolvable).
cd "$PROJECT_DIR"
npm install || exit 1

# Change current working directory.
cd "$PROJECT_DIR/apps/demo"

# Clean any temporary files.
ns clean

# Reinstall after clean, since ns clean removes apps/demo/node_modules.
cd "$PROJECT_DIR"
npm install || exit 1
cd "$PROJECT_DIR/apps/demo"

# Verify the build.
ns prepare android --release || exit 1

# Move to native project location.
cd "$PROJECT_DIR/apps/demo/platforms/android"

# Build the Android project.
#
# Abort on failure. Without this the align/sign/upload chain below runs against
# whatever app-release.apk an earlier build left behind, which means a stale APK
# gets signed and distributed to testers under a fresh version number.
#
# --no-daemon: this machine shares its Gradle daemon registry with Android Studio, a Kotlin
# LSP and other checkouts. A stray `--stop` from any of them killed a deploy mid-upload with
# "Gradle build daemon has been stopped: stop command received", so the deploy runs in its own
# single-use JVM rather than a pool anything else can reach into.
./gradlew --no-daemon assembleRelease || exit 1

# Define the output location.
APK_OUTPUT_DIR="$PROJECT_DIR/apps/demo/platforms/android/app/build/outputs/apk/release"

# After the app is built, it needs to be aligned.
zipalign -v -p 4 \
  "$APK_OUTPUT_DIR/app-release.apk" \
  "$APK_OUTPUT_DIR/app-release-aligned.apk" || exit 1

# Once the app is aligned, it needs to be signed.
apksigner sign \
  --ks "$PROJECT_DIR/tools/assets/App_Resources/Android/demo.jks" \
  --ks-key-alias demo \
  --ks-pass pass:Password1! \
  --out "$APK_OUTPUT_DIR/app-release.apk" \
  "$APK_OUTPUT_DIR/app-release-aligned.apk" || exit 1

# Verify the signing process has completed successfully.
apksigner verify "$APK_OUTPUT_DIR/app-release.apk" || exit 1

# Upload the APK to the Firebase app distribution service.
cd $PROJECT_DIR/apps/demo/platforms/android
./gradlew --no-daemon appDistributionUploadRelease || exit 1

# Display an informative message.
set -a # Automatically export all variables
source $PROJECT_DIR/packages/ia-sdk/.env
set +a
sh $SCRIPT_DIR/info.sh \
    "Android NativeScript demo app version $APP_SDK_VERSION has been deployed with AppSDK version $ANDROID_APPSDK_VERSION."