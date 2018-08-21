module.exports = {
  preset: 'jest-puppeteer',
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
