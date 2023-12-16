const XLSX = require("xlsx");

describe("Gmail Registration", () => {
  it("Should register Gmail accounts from Excel", () => {
    cy.readFile("cypress/fixtures/LoginData.xlsx", { encoding: "binary" }).then(
      (excelData) => {
        const workbook = XLSX.read(excelData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const excelDataArray = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        excelDataArray.forEach((row) => {
          // Check if email field is not empty
          cy.visit("https://partners.fresha.com/users/sign-in");
         
          cy.get('[data-qa="continue"]').click();

          if(row.status == "empty email") {
            cy.get('[data-qa="email-status-message"]').should('exist');

          } else {

            if(row.password == "") {
              cy.get('[data-qa="password-helper-text"]').should('exist');
            }

            if(row.status == "invalid email") {
              cy.wait(3000);
              cy.get(".c96c73cca").type(row.email);
              cy.wait(3000);
              cy.get('[data-qa="continue"]').click();
              cy.wait(3000);
              cy.get('[data-qa="headline-title"]').should('exist');
  
            } else if(row.status == "invalid password") {
              cy.wait(3000);
              cy.get(".c96c73cca").type(row.email);
               cy.wait(3000);
              cy.get('[data-qa="continue"]').click();
            } else {
              cy.wait(3000);
              cy.get(".c96c73cca").type(row.email);
              cy.get('[data-qa="continue"]').click();
              cy.wait(3000)
              cy.get('.c96c73cca').type(row.password);
              cy.wait(3000)
              cy.get('[data-qa="login"]').click();
              cy.wait(3000)
              cy.get('.WTZV0a > :nth-child(1) > ._06c66a0bc > .ed709e0bc > .c671260bc').should('exist');
  
            }
          }             // Check if the account already exists
            // cy.get('[data-qa="headline-title"]').then(($headlineTitle) => {
            //   if ($headlineTitle.text().includes("Login")) {
            //     // Account already exists, login
            //     cy.get('.c96c73cca').type(row.password);
            //     if(row.password == "") {
            //       cy.get('[data-qa="password-helper-text"]').should('exist');
            //     }
            //     cy.get('[data-qa="create-account"]').click();
            //     cy.get('[data-qa="modal-header-in-content"] > .u4xwZq').should(
            //       "exist"
            //     );
            //   } else {
            //     // Account doesn't exist, fill in other fields and register
            //     if (row.firstname) {
            //       cy.get(
            //         '[data-qa="input-input-structure-first-name-input"]'
            //       ).type(row.firstname);
            //     }
            //     if (row.lastname) {
            //       cy.get(
            //         '[data-qa="input-input-structure-last-name-input"]'
            //       ).type(row.lastname);
            //     }
            //     if (row.password) {
            //       cy.get(
            //         '[data-qa="password-input"] > ._06c627cca > .c96c73cca'
            //       ).type(row.password);
            //     }
            //     if (row.phone) {
            //       cy.get('[data-qa="phone-input"]').type(row.phone);
            //     }

            //     // CLICK BUTTON REGIS
            //     cy.get('[data-qa="create-account"]').click();

            //     // Check for errors if fields are empty
            //     if (row.phone == "") {
            //       cy.get('[data-qa="phone-input-status-message"]').should(
            //         "exist"
            //       );
            //     }
            //     if (row.firstname == "") {
            //       cy.get('[data-qa="first-name-input-status-message"]').should(
            //         "exist"
            //       );
            //     }
            //     if (row.password == "") {
            //       cy.get('[data-qa="password-input-status-message"]').should(
            //         "exist"
            //       );
            //     }
            //   }
            // });
        });
      }
    );
  });
});
