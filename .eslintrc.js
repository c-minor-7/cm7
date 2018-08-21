module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    'es6': true,
    'jest': true,
    'browser': true,
    'node': true,
  },
  globals: {
    page: true,
    browser: true,
    jestPuppeteer: true,
  },
  extends: '@ycm.jason/eslint-config'
};
