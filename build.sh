#!/usr/bin/env bash
set -euxo pipefail

mkdir -p build/
browserify src/index.ts -p [ tsify -p . ] > build/bundle.js
cp ./build/bundle.js ./docs/ShittyInfiniteScroll.js 
