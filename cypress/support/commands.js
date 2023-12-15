
Cypress.Commands.add("login_business", (email, password) => {
  cy.visit(Cypress.env("url"));
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-qa="link-for-business"]').click();
  cy.get(".hero__topBtnWrapper > .button").click();
  cy.get('[data-qa="for-businesses"] > .CLnQGg').click();
  /* ==== End Cypress Studio ==== */
  cy.wait(2000);
  /* --- enter email account */
  cy.get(".c96c73cca").type(email);
  cy.get('[data-qa="continue"]').click();
  cy.wait(1000);
  // enter password
  cy.get(".c96c73cca").type(password);
  cy.get('[data-qa="login"]').click();
  cy.wait(500)
});
 
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on("uncaught:exception", (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // ignore the error
    return false;
  }
});
 
Cypress.Commands.add("login_everyone", (email, password) => {
  cy.visit(Cypress.env("url"));
 
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-qa="link-for-business"]').click();
  /* ==== End Cypress Studio ==== */
 
  /* ==== Generated with Cypress Studio ==== */
  cy.get(".hero__topBtnWrapper > .button").click();
  cy.get('[data-qa="for-everyone"] > .CLn2yq').click();
  cy.get("#input-react-aria-3").type(email);
  cy.get('[data-qa="react-aria-4"]').click();
  /* enter password */
  cy.get("#input-react-aria-8").type("1convitcon");
  cy.get('[data-qa="react-aria-9"]').click();
  /* check exist */
  cy.get('[data-qa="avatar-button-desktop"]').click();
  cy.get('[data-qa="action-dropdown-btn-info-profile"]').click();
  cy.get('[data-qa="user-email"]').should("exist").contains(password);
});

Cypress.Commands.add("RandomString",(length) =>{
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
    console.log(result);
  }

  return result;
})

Cypress.Commands.add("VisitTeamMemberPage", () => {
  cy.wait(1000)
  cy.get('[data-qa="cookie-accept-btn"]').click();
  cy.wait(2000);
  cy.get('[data-qa="nav-d-business-settings"]').click();
  cy.get('[data-qa="modal-title"]').should('have.text','Business settings');
  cy.get('[href="/setup/team"]').click();
  cy.wait(3000)
  cy.get('[data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Team');
  cy.get('[href="/staff/employees"]').click();
  cy.wait(3000)
  cy.get('[data-qa="modal-title"] > .fWGqQa').should('includes.text','Team members');
})