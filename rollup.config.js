import typescript from 'rollup-plugin-typescript2';
import tslint from 'rollup-plugin-tslint';

const pkg = require(`${process.env.INIT_CWD}\\package.json`);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
plugins: [
  tslint({
    exclude: '/node_modules/**',
    include: `${process.env.INIT_CWD}/src/**`
  }),
  typescript({
    tsconfigOverride: {
      include: [
        `${process.env.INIT_CWD}\\src\\**\\*`
      ]
    }
  }),
  ],
}