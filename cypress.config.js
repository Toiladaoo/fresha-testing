import { defineConfig } from "cypress";
import * as XLSX from "xlsx";
import * as path from "path";
import fs from "fs";

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
        convertXLSXToJson: async (filePath) => {
          // const workbook = XLSX.readFile(filePath);
          const workbook = XLSX.read(filePath, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            range: 1,
          });

          // const fileName = path.basename(filePath, ".xlsx");
          // const jsonFilePath = `./cypress/fixtures/${fileName}.json`;
          // fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
          return workbook.SheetNames;
        },
      });
    },
  },
});
