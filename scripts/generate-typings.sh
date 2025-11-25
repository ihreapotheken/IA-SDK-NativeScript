#!/bin/bash

# https://docs.nativescript.org/guide/native-code/generate-typings
#
# Usage:
#
# sh ./scripts/generate-typings.sh

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
PROJECT_DIR="$SCRIPT_DIR/.."

# Change current working directory.
cd "$PROJECT_DIR/apps/demo" 

# Remove any previously-existing typings.
rm -rf "$PROJECT_DIR/packages/ia-sdk/typings"

# Generate and move Android typings.
ns clean
ns build android
ns typings android --aar "$PROJECT_DIR/packages/ia-sdk/platforms/android/ia_sdk.aar"
mv -f "$PROJECT_DIR/apps/demo/typings/android/" "$PROJECT_DIR/packages/ia-sdk/typings/android/" 

# Generate and move iOS typings.
ns clean
ns build ios
ns typings ios 
mv -f "$PROJECT_DIR/apps/demo/typings/ios/" "$PROJECT_DIR/packages/ia-sdk/typings/ios/" 
