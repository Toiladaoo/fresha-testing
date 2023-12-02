describe('homepage', () => {
  it('search successful ', () => {
    cy.visit('https://example.cypress.io')
  })
  it('search theo tu khoa ', () => {
    cy.visit('https://example.cypress.io')
    
  })
  it('filter', () => {
    cy.visit('https://example.cypress.io')
    cy.contains("Kitchen Sink")
  })
})