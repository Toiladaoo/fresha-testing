
describe('Important processes', () => {
  beforeEach(() => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

 
  it.only('Add new appointment', () => {
    cy.get('[data-qa="cookie-accept-btn"]').click();
    cy.wait(2000);
    cy.get('._06c6e7041').find('button').eq(1).click();
    cy.wait(500)
    cy.get('._06c6e7041').find('button').contains('New appointment').click();
  })
  it('Add new sale', () => {
  
  })
  it('the complete the payment process', () => {
    cy.get('[data-qa="cookie-accept-btn"]').click();
    cy.wait(2000);
    cy.get('[data-qa="right-arrow-sign"]').click();
    cy.get('[data-qa="calendar-event-booking-860420705"]').click();
    cy.wait(4000)
    // update state confirm
    cy.get('[data-qa="drawer-feed-header-title"] > [data-qa="change-status-dropdown"]').click({force:true});
    cy.wait(500)
    cy.get('[data-qa="confirmed-option"]').click();
    //check   
    cy.get('[data-qa="calendar-event-booking-860420705"]').click();
    cy.get('[data-qa="drawer-feed-header-title-scrolled"] > [data-qa="change-status-dropdown"] > ._-wK3ss').should('have.text','Confirmed')
    //update state started 
    cy.wait(1000)
    cy.get('[data-qa="drawer-feed-header-title"] > [data-qa="change-status-dropdown"]').click({force:true});
    cy.wait(500)
    cy.get('[data-qa="started-option"]').click();
    cy.wait(1000)
    cy.get('[data-qa="calendar-event-booking-860420705"]').click();
    cy.get('[data-qa="drawer-feed-header-title-scrolled"] > [data-qa="change-status-dropdown"] > ._-wK3ss').should('have.text','Started')
    //check out
    cy.get('[data-qa="checkout-button"]').click();
    cy.wait(500)
    cy.url().should('eq','https://partners.fresha.com/sales/new-sale');
    // confirm booking
    cy.get('[data-qa="cart-continue-button"]').click();
    //add tip
    cy.get('[data-qa="tip-tile-10"] > ._06c620699').click();
    cy.get('[data-qa="cart-continue-button"]').click();
    cy.wait(1000)
    // payment method
    cy.get('[data-qa="modal-title"]').should('includes.text','Select payment')
    cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();
    cy.wait(500)
    cy.get('[data-qa="collect-cash"]').click();
    cy.wait(300)
    cy.get('[data-qa="cart-continue-button"]').click();
    cy.wait(500)
    cy.get('[data-qa="invoice-status-title"]').should('exist')
    cy.get('[data-qa="back-to-calendar-button"]').click();
  })
  
})