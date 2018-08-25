import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const base_config = {
  input: 'src/main.js',
  plugins: [
    resolve(),
    commonjs(),
  ],
};

const umd_config = {
  ...base_config,
  output: {
    file: 'dist/Cm7.umd.js',
    format: 'umd',
    name: 'Cm7',
  },
};

const umd_min_config = {
  ...umd_config,
  plugins: [
    terser(),
    ...umd_config.plugins,
  ],
  output: {
    ...umd_config.output,
    file: 'dist/Cm7.umd.min.js',
  },
};

const es_config = {
  ...base_config,
  output: {
    file: 'dist/Cm7.es.js',
    format: 'es',
  },
};

const es_min_config = {
  ...es_config,
  plugins: [
    terser(),
    ...es_config.plugins,
  ],
  output: {
    ...es_config.output,
    file: 'dist/Cm7.es.min.js',
  },
};

const configs = [
  umd_config,
  umd_min_config,
  es_config,
  es_min_config,
];

// console.log(JSON.stringify(configs, null, 2));

export default configs;
