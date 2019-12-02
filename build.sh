#!/usr/bin/env bash
set -euxo pipefail

tsc
cp ./build/ShittyInfiniteScroll.js ./docs/ShittyInfiniteScroll.js 
