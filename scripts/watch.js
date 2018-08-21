const exec = require('child_process').exec;

const cmd = 'npx ../../node_modules/.bin/cross-env SERVE=true && npx ../../node_modules/.bin/rollup -c ../../build/rollup.config.js -w';
exec(cmd, function(error, stdout, stderr) {
  if (error) {
    throw error;
  }
  if(stdout){
    console.log(stdout);
  }
  if(stderr) {
    console.log(stderr)
  }
});
