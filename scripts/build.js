const stream = require('./stream');

const cmd = `npx ../../node_modules/.bin/rollup -c ../../rollup.config.js ${process.env.WATCH}`;

stream(cmd);