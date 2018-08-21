import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require(`${process.env.INIT_CWD}/package.json`);

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
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    typescript({
      tsconfigOverride: {
        useTsconfigDeclarationDir: false,
        include: [
          `${process.env.INIT_CWD}/src/**/*`
        ]
      }
    }),
  ],
}