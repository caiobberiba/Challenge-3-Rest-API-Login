const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'e2e/**/*.cy.js',
    supportFile: 'support/e2e.js',
    fixturesFolder: 'fixtures',
    downloadsFolder: 'downloads',
    screenshotsFolder: 'screenshots',
    videosFolder: 'videos'
  },
}) 