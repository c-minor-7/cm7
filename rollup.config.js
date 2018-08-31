import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import deepmerge from 'deepmerge';
import babel from 'rollup-plugin-babel';

const base_config = {
  input: 'src/Cm7.js',
  plugins: [
    resolve(),
    commonjs(),
  ],
};

const umd_config = deepmerge(base_config, {
  output: {
    file: 'dist/Cm7.umd.js',
    format: 'umd',
    name: 'Cm7',
  },
});

const umd_min_config = deepmerge(umd_config, {
  plugins: [
    terser(),
  ],
  output: {
    file: 'dist/Cm7.umd.min.js',
  },
});

const es_config = deepmerge(base_config, {
  output: {
    file: 'dist/Cm7.es.js',
    format: 'es',
  },
});

const es_min_config = deepmerge(es_config, {
  plugins: [
    terser(),
  ],
  output: {
    file: 'dist/Cm7.es.min.js',
  },
});

const docs_config = deepmerge(umd_config, {
  output: {
    file: 'docs/Cm7.umd.js',
  },
});

const configs = [
  umd_config,
  umd_min_config,
  es_config,
  es_min_config,
  docs_config,
];

// console.log(JSON.stringify(configs, null, 2));

export default configs;
