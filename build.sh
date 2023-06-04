#! /usr/bin/env bash

rm -r ./docs
npx honkit build
mv _book ./docs
