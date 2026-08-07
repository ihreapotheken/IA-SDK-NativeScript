#!/usr/bin/env bash

# Sets up the development environment for script execution management.
#
# Usage:
#
# source ./scripts/dev-env-setup.sh

# Export ENV variables for build versioning.
if [[ -z "$APP_SDK_VERSION" || $0 == "dev-env-setup.sh" ]]; then
  # Define the library version number.
  export APP_SDK_BUILD_VERSION="$(date +%Y.%m.%d)"
  echo "APP_SDK_BUILD_VERSION $APP_SDK_BUILD_VERSION"
  # Define the build version number.
  export APP_SDK_BUILD_NUMBER="$(date +'%H*60+%M' | bc)"
  echo "APP_SDK_BUILD_NUMBER $APP_SDK_BUILD_NUMBER"
  # Export library and app version numbers.
  export APP_SDK_VERSION="$APP_SDK_BUILD_VERSION.$APP_SDK_BUILD_NUMBER"
  echo "APP_SDK_VERSION $APP_SDK_VERSION"
fi

# Server environment the demo initialises the SDK against. Single source of truth: it selects the
# ServerEnvironment in the demo (via the webpack define) and is stamped into the launcher label on
# both platforms, so a tester can always tell which backend a build points at.
export APPSDK_SERVER_ENV="${APPSDK_SERVER_ENV:-staging}"
echo "APPSDK_SERVER_ENV $APPSDK_SERVER_ENV"

# Short environment tag shown to testers. Deliberately not the uppercased environment
# name: `staging` runs against the QA backend, and the Flutter and React Native demos
# both advertise it as QA, so the three stay worded the same.
case "$APPSDK_SERVER_ENV" in
  development) export IA_ENV_LABEL="DEV" ;;
  production) export IA_ENV_LABEL="PROD" ;;
  *) export IA_ENV_LABEL="QA" ;;
esac
echo "IA_ENV_LABEL $IA_ENV_LABEL"

# Launcher label for iOS, consumed by CFBundleDisplayName in App_Resources/iOS/Info.plist.
# Android composes the equivalent string in App_Resources/Android/app.gradle.
export IA_DEMO_DISPLAY_NAME="AppSDK NativeScript Demo $IA_ENV_LABEL"
echo "IA_DEMO_DISPLAY_NAME $IA_DEMO_DISPLAY_NAME"
