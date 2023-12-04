describe('search services', () => {
  it('Search by store name ', () => {
    cy.visit('https://www.fresha.com')
    cy.get('.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]').type('na flower');
    cy.wait(500);
    cy.get('#button-react-aria-229').click();
  })
  it.only('Choose a catogory, hair & styling ', () => {
    cy.visit('https://www.fresha.com')
    cy.get('.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]').click();
    cy.wait(500);
    cy.get('#button-react-aria-229').click();
    cy.get('[data-qa="search-button-mobile-variant-home"]').click();
    cy.get('.Qv1YQt').click();
  })
})