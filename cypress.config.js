const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const json2xls = require("json2xls");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("task", {
        exportToExcel({data,filename}) {
          const xls = json2xls(data);
          fs.writeFileSync(filename, xls, "binary");
          return null;
        },
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "cypress/e2e/*.feature",
    supportFile: false,
    watchForFileChanges: false,
    viewportWidth:1280,
    viewportHeight:720,
    defaultCommandTimeout:10000,
    pageLoadTimeout:60000,
    chromeWebSecurity: false
  },
});
