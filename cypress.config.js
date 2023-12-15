import { defineConfig } from "cypress";
import * as XLSX from "xlsx";
import * as path from "path";

export default defineConfig({
  projectId: "i3t8gb",
  env: {
    url: "https://www.fresha.com",
    login_json_file: "cypress/fixtures/login-data.json",
  },
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on("task", {
        convertXLSXToJson(filePath) {
          const workbook = XLSX.readFile();
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const fileName = path.basename(filePath, ".xlsx");
          const jsonFilePath = `./cypress/fixtures/${fileName}.json`;

          writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
          return null;
        },
      });
    },
  },
});
