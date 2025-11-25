#!/bin/bash

# Deploys a client package using the Github NPM Package Registry.
#
# Usage:
#
# sh ./scripts/deploy-client.sh

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# Setup the environment variables.
source $SCRIPT_DIR/dev-env-setup.sh

# Tag the current release.
git tag "$APP_SDK_BUILD_VERSION-$APP_SDK_BUILD_NUMBER"

# Push the tags, triggering a Github Action workflow for deploying a library update.
git push --tags