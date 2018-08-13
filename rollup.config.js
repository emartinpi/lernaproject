import typescript from 'rollup-plugin-typescript2';

const pkg = require(`${process.env.INIT_CWD}/package.json`);

export default {
  input: `${process.env.INIT_CWD}/src/index.ts`,
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
  typescript({
    tsconfigOverride: {
      include: [
        `${process.env.INIT_CWD}/src/**/*`
      ]
    }
  }),
  ],
}