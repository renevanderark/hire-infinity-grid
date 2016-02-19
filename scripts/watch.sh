#!/bin/sh

mkdir -p build/development/js
mkdir -p build/development/css

cp src/index.html build/development/index.html

node_modules/.bin/browserify \
	--require react \
	--require react-dom > build/development/js/react-libs.js

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/index.css \
	--watch \
	src/stylus/index.styl &

node_modules/.bin/watchify src/index.js \
	--outfile build/development/js/index.js \
	--external react \
	--external react-dom \
	--standalone InfinityGrid \
	--transform [ babelify ] \
	--verbose
