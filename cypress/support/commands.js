// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://www.fresha.com");
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-qa="link-for-business"]').click();
  cy.get(".hero__topBtnWrapper > .button").click();
  cy.get('[data-qa="for-businesses"] > .CLn2yq').click();
  /* ==== End Cypress Studio ==== */
  cy.wait(500);
  /* --- enter email account */
  cy.get(".c96c73cca").type(email);
  cy.get('[data-qa="continue"]').click();
  cy.wait(500);
  // enter password
  cy.get(".c96c73cca").type(password);
  cy.get('[data-qa="login"]').click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
