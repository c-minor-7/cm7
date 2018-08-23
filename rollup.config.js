import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const base_config = {
  input: 'src/main.js',
  plugins: [
    resolve(),
    commonjs(),
  ],
};

export default [
  // umd
  {
    ...base_config,
    output: {
      file: 'dist/Cm7.umd.js',
      format: 'umd',
      name: 'Cm7',
    },
  },
  // es
  {
    ...base_config,
    output: {
      file: 'dist/Cm7.es.js',
      format: 'es',
    },
  },
];
