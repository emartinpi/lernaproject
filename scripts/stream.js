const { spawn } = require('child_process');

module.exports = (cmd) => {
  const stream = spawn(cmd,[''], { shell: true });

  stream.stdout.on('data', (data) => {
    console.log(`out: ${data}`);
  });
  
  stream.stderr.on('data', (data) => {
    console.log(`err: ${data}`);
  });
  
  stream.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}