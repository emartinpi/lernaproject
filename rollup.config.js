import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const pkg = require(`${process.env.INIT_CWD}/package.json`);

delete pkg.scripts;
delete pkg.files;
delete pkg.directories;

export default {
  input: `${process.env.INIT_CWD}/src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.main,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    json(),
    typescript({
      tsconfigOverride: {
        useTsconfigDeclarationDir: false,
        include: [
          `${process.env.INIT_CWD}/src/**/*`
        ]
      }
    }),
    commonjs(),
    generatePackageJson({
      outputFolder:`dist/${pkg.name}`,
      baseContents: pkg
    }),
  ],
}
