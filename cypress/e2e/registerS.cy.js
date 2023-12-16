const XLSX = require("xlsx");

describe("Gmail Registration", () => {
  it("Should register Gmail accounts from Excel", () => {
    cy.readFile("cypress/fixtures/RegisData.xlsx", { encoding: "binary" }).then(
      (excelData) => {
        const workbook = XLSX.read(excelData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const excelDataArray = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        excelDataArray.forEach((row) => {
          // Check if email field is not empty
          if (row.email) {
            // Start Cypress test commands
            cy.visit("https://partners.fresha.com/users/sign-in");
            cy.get(".c96c73cca").type(row.email);
            cy.get('[data-qa="continue"]').click();

            // Check if the account already exists
            cy.get('[data-qa="headline-title"]').then(($headlineTitle) => {
              if ($headlineTitle.text().includes("Login")) {
                // Account already exists, login
                cy.get('.c96c73cca').type(row.password);
                if(row.password == "") {
                  cy.get('[data-qa="password-helper-text"]').should('exist');
                }
                cy.get('[data-qa="create-account"]').click();
                cy.get('[data-qa="modal-header-in-content"] > .u4xwZq').should(
                  "exist"
                );
              } else {
                // Account doesn't exist, fill in other fields and register
                if (row.firstname) {
                  cy.get(
                    '[data-qa="input-input-structure-first-name-input"]'
                  ).type(row.firstname);
                }
                if (row.lastname) {
                  cy.get(
                    '[data-qa="input-input-structure-last-name-input"]'
                  ).type(row.lastname);
                }
                if (row.password) {
                  cy.get(
                    '[data-qa="password-input"] > ._06c627cca > .c96c73cca'
                  ).type(row.password);
                }
                if (row.phone) {
                  cy.get('[data-qa="phone-input"]').type(row.phone);
                }

                // CLICK BUTTON REGIS
                cy.get('[data-qa="create-account"]').click();

                // Check for errors if fields are empty
                if (row.phone == "") {
                  cy.get('[data-qa="phone-input-status-message"]').should(
                    "exist"
                  );
                }
                if (row.firstname == "") {
                  cy.get('[data-qa="first-name-input-status-message"]').should(
                    "exist"
                  );
                }
                if (row.password == "") {
                  cy.get('[data-qa="password-input-status-message"]').should(
                    "exist"
                  );
                }
              }
            });
          }
        });
      }
    );
  });
});
