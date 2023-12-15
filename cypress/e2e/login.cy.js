describe("login business", () => {
  it.only("login successful-read data from Json", () => {
    cy.readFile("cypress/fixtures/login-data.json").then((data) => {
      const email = data.email;
      const pw = data.password;

      cy.visit(Cypress.env("url"));
      /* ==== Generated with Cypress Studio ==== */
      cy.get('[data-qa="link-for-business"]').click();
      cy.get(".hero__topBtnWrapper > .button").click();
      cy.wait(4000);
      cy.get('[data-qa="for-businesses"]').click();
      /* ==== End Cypress Studio ==== */
      cy.wait(2000);
      /* --- enter email account */

      cy.get(".c96c73cca").type(email);
      cy.get('[data-qa="continue"]').click();
      cy.wait(1000);
      // enter password
      cy.get(".c96c73cca").type(pw);
      cy.get('[data-qa="login"]').click();
    });
  });
});
describe("login customer", () => {
  it("login successful ", () => {
    cy.visit("https://www.fresha.com");

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-qa="link-for-business"]').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get(".hero__topBtnWrapper > .button").click();
    cy.get('[data-qa="for-everyone"] > .CLn2yq').click();
    cy.get("#input-react-aria-3").type("daobuisiteupz@gmail.com");
    cy.get('[data-qa="react-aria-4"]').click();
    /* enter password */
    cy.get("#input-react-aria-8").type("1convitcon");
    cy.get('[data-qa="react-aria-9"]').click();
    /* check exist */
    cy.get('[data-qa="avatar-button-desktop"]').click();
    cy.get('[data-qa="action-dropdown-btn-info-profile"]').click();
    cy.get('[data-qa="user-email"]')
      .should("exist")
      .contains("daobuisiteupz@gmail.com");
  });
});
