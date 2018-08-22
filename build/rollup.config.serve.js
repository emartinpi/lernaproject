import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import nodeGlobals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require(`${process.env.INIT_CWD}/package.json`);

export default {
  input: `${process.env.INIT_CWD}/src/index.ts`,
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
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
          `${process.env.INIT_CWD}/src/**/*`,
          `${process.env.INIT_CWD}/node_modules/@monorepo/*`,
        ]
      }
    }),
    nodeGlobals(),
    livereload(),
    serve({
      contentBase: `${process.env.INIT_CWD}/public`,
      port: 8080,
      open: true
    })
  ],
}
