mkdir -p build

node_modules/.bin/watchify src/index.js \
	--external react \
	--external react-dom \
	--external react-dnd \
	--external react-dnd-touch-backend \
	--outfile 'node_modules/.bin/derequire > build/index.js' \
	--standalone InfinityGrid \
	--transform [ babelify ] \
	--verbose
