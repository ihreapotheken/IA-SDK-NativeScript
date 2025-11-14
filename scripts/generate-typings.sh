#!/bin/bash

# https://docs.nativescript.org/guide/native-code/generate-typings
#
# Usage:
#
# sh ./scripts/generate-typings.sh

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
PROJECT_DIR="$SCRIPT_DIR/.."

cd "$PROJECT_DIR/apps/demo" 

# Generate Android typings.
ns build android && ns typings android --aar "$PROJECT_DIR/packages/ia-sdk/platforms/android/ia_sdk.aar"

# Generate iOS typings.
# ns build ios && ns typings ios 