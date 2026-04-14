#!/bin/bash

# Deploys a client package using the Github NPM Package Registry.
#
# Usage:
#
# sh ./scripts/deploy-client.sh --beta
# sh ./scripts/deploy-client.sh --release

# Parse the required --beta or --release argument.
if [[ "$1" == "--beta" ]]; then
  TAG_SUFFIX="-beta"
elif [[ "$1" == "--release" ]]; then
  TAG_SUFFIX=""
else
  echo "Error: Required argument missing."
  echo "Usage: sh ./scripts/deploy-client.sh --beta | --release"
  exit 1
fi

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
PROJECT_DIR="$SCRIPT_DIR/.."

# Setup the environment variables.
source $SCRIPT_DIR/dev-env-setup.sh

# Change current working directory.
cd "$PROJECT_DIR" 

# Add latest updates to source control.
git branch release/$APP_SDK_VERSION
git checkout release/$APP_SDK_VERSION
git add packages/ tools/ apps/ README.md package.json package-lock.json
git commit -m "NativeScript library deploy version $APP_SDK_VERSION"
git push origin release/$APP_SDK_VERSION

# Tag the current release.
git tag "$APP_SDK_BUILD_VERSION-$APP_SDK_BUILD_NUMBER$TAG_SUFFIX"

# Push the tags, triggering a Github Action workflow for deploying a library update.
git push --tags

git checkout develop