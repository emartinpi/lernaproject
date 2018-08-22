const exec = require('child_process').exec;

const cmd = 'npx ../../node_modules/.bin/jest --config ../../jest.config.js';
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
