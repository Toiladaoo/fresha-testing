import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "i3t8gb",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // experimentalStudio: true
  },
});
