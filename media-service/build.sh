#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

# set current working directory to script parent directory to run script from everywhere
cd "$(dirname "$0")"/../media-service

mkdir -p artifacts
rm -f artifacts/*.wasm
marine build --release
cp target/wasm32-wasi/release/media_service.wasm artifacts/
marine aqua artifacts/media_service.wasm >../aqua/aqua/media_service.aqua
