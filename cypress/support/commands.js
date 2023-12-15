
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // ignore the error
    return false
  }
});

Cypress.Commands.add('loginBussiness', () => { 
  cy.readFile('cypress/fixtures/login-data.json').then((data) => {
    const email = data.email;
    const pw = data.password;

    cy.visit('https://www.fresha.com')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-qa="link-for-business"]').click();
    cy.get('.hero__topBtnWrapper > .button').click();
    cy.wait(4000)
    cy.get('[data-qa="for-businesses"]').click();
     /* ==== End Cypress Studio ==== */
    cy.wait(2000);
    /* --- enter email account */
    
    cy.get('.c96c73cca').type(email);
    cy.get('[data-qa="continue"]').click();
    cy.wait(1000);
    // enter password
    cy.get('.c96c73cca').type(pw);
    cy.get('[data-qa="login"]').click();
  })

 });
