module.exports = {
  preset: 'jest-puppeteer',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  projects: [
    {
      displayName: 'unit tests',
      testMatch: ['<rootDir>/**/*.unit.js'],
    },
    {
      displayName: 'puppeteer',
      preset: 'jest-puppeteer',
      testMatch: ['<rootDir>/**/*.pup.js'],
    },
  ],
};
