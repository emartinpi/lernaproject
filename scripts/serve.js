const stream = require('./stream');

const cmd = 'npx ../../node_modules/.bin/rollup -c ../../rollup.config.serve.js -w';

stream(cmd);