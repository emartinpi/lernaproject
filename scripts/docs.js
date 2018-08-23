const stream = require('./stream');

const cmd = 'npx ../../node_modules/.bin/typedoc src/index.ts --options ../../typedoc.json --tsconfig ../../tsconfig.json';

stream(cmd);