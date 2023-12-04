describe('login business', () => {
  it('login successful ', () => {
    cy.visit('https://www.fresha.com')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-qa="link-for-business"]').click();
    cy.get('.hero__topBtnWrapper > .button').click();
    cy.get('[data-qa="for-businesses"] > .CLn2yq').click();
     /* ==== End Cypress Studio ==== */
    cy.wait(500);
    /* --- enter email account */
    cy.get('.c96c73cca').type('bthd1805@gmail.com');
    cy.get('[data-qa="continue"]').click();
    cy.wait(500);
    // enter password
    cy.get('.c96c73cca').type('1convitcon');
    cy.get('[data-qa="login"]').click();
  })
 
})
describe('login customer', () => {
  it('login successful ', () => {
    cy.visit('https://www.fresha.com')

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-qa="link-for-business"]').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.hero__topBtnWrapper > .button').click();
    cy.get('[data-qa="for-everyone"] > .CLn2yq').click();
    cy.get('#input-react-aria-3').type("daobuisiteupz@gmail.com");
    cy.get('[data-qa="react-aria-4"]').click();
    /* enter password */
    cy.get('#input-react-aria-8').type("1convitcon");
    cy.get('[data-qa="react-aria-9"]').click();
    /* check exist */
    cy.get('[data-qa="avatar-button-desktop"]').click();
    cy.get('[data-qa="action-dropdown-btn-info-profile"]').click();
    cy.get('[data-qa="user-email"]').should('exist').contains('daobuisiteupz@gmail.com');

  })
 
})