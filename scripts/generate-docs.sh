#!/bin/bash

# https://typedoc.org/index.html
#
# Usage:
#
# sh ./scripts/generate-docs.sh

# Declare script and project paths.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
PROJECT_DIR="$SCRIPT_DIR/.."

cd "$PROJECT_DIR" 

npm run docs