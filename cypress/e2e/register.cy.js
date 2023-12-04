describe('register customer', () => {
  it('register customer successful ', () => {
    cy.visit('https://www.fresha.com')
     cy.get('[data-qa="link-for-business"]').click();
     cy.get('.hero__topBtnWrapper > .button').click();
     cy.get('[data-qa="for-everyone"] > .CLn2yq').click();
     cy.get('#input-react-aria-3').type("daobth@siteupz.com");
    cy.get('[data-qa="react-aria-4"]').click();
    // enter info account 
    cy.get('#input-react-aria-8').type('muoi');
    cy.get('#input-react-aria-9').type('beo');
    cy.get('#input-react-aria-10').type('1convitcon');
    cy.get('[data-qa="input-input-structure-mobile-number"]').type('0901407625');
    cy.get('#agreement > .JZmSyt').click();
    cy.get('#marketingConsent > .JZmSyt').click();
    cy.get('[data-qa="react-aria-15"]').click();
  })
 
})
describe.only('register business', () => {
  it('register business successful ', () => {
    cy.visit('https://www.fresha.com')
     cy.get('[data-qa="link-for-business"]').click();
     cy.get('.hero__topBtnWrapper > .button').click();
    
     cy.get('[data-qa="for-businesses"] > .CLn2yq').click();
     cy.get('.c96c73cca').type("daobthd@siteupz.com");
     cy.get('[data-qa="continue"]').click();
     // check exist
     cy.wait(500);
     cy.get('[data-qa="headline-caption"] > ._-wK3ss').should('exist').contains('daobthd@siteupz.com');
     cy.get('[data-qa="input-input-structure-first-name-input"]').type('muoi');
     cy.get('[data-qa="input-input-structure-last-name-input"]').type('muoi');
     cy.get('[data-qa="password-input"] > ._06c627cca > .c96c73cca').type('1convitcon');
     cy.get('[data-qa="phone-input"]').type('0901407625');

  })
 
})