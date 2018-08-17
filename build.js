const exec = require('child_process').exec;
const ora = require('ora');
const fs = require('fs');
const pkg = require(`${process.env.INIT_CWD}/package.json`);

generatePackageJson();
generateDist();


async function generatePackageJson() {
  const spinner = ora(`Creating ${pkg.name}'s package.json `).start();
  
  delete pkg.scripts;
  delete pkg.files;
  delete pkg.directories;
  
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg), (err) => {
    if (err) throw err;
  });

  spinner.succeed();
}

async function generateDist() {
  const spinner = ora(`Creating ${pkg.name}'s dist`).start();
	const cmd = 'npx ../../node_modules/.bin/rollup -c ../../rollup.config.js';
	
	await exec(cmd, function(error, stdout, stderr) {
		spinner.succeed();

	});
}