describe('Important processes', () => {
  beforeEach(() => {
    // cy.visit('https://www.fresha.com')
    // /* ==== Generated with Cypress Studio ==== */
    // cy.get('[data-qa="link-for-business"]').click();
    // cy.get('.hero__topBtnWrapper > .button').click();
    // cy.wait(4000)
    // cy.get('[data-qa="for-businesses"]').click();
    //  /* ==== End Cypress Studio ==== */
    // cy.wait(1000);
    // /* --- enter email account */
    // cy.get('.c96c73cca').type('bthd1805@gmail.com');
    // cy.get('[data-qa="continue"]').click();
    // cy.wait(1000);
    // // enter password
    // cy.get('.c96c73cca').type('1convitcon');
    // cy.get('[data-qa="login"]').click();
    cy.loginBussiness();
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it('Add new staff_sucessfull ', () => {
    cy.get('[data-qa="cookie-accept-btn"]').click();
    cy.wait(2000);
    cy.get('[data-qa="nav-d-business-settings"]').click();
    cy.get('[data-qa="modal-title"]').should('have.text','Business settings');
    cy.get('[href="/setup/team"]').click();
    cy.wait(4000)
    cy.get('[data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Team');
    cy.get('[href="/staff/employees"]').click();
    cy.wait(4000)
    cy.get('[data-qa="modal-title"] > .fWGp_B').should('includes.text','Team members');
    cy.get('[data-qa="fab-add-staff"]').click();
    cy.wait(3000)
    cy.get('[data-qa="modal-title"]').should('includes.text','Add team member');
    cy.get('[data-qa="input-input-structure-profile-section-first-name"]').type('nguyen');
    cy.get('[data-qa="profile-section-email"] > ._06c627cca > .c96c73cca').type('nguyen111@gmail.com');
    cy.get('[data-qa="color-sample-pink"] > .af2bf461c').click();
    cy.wait(1000)
    cy.get('[data-qa="save-button"]').click();
    cy.wait(3000);
    //check
    cy.get('[data-qa="staff-list-item"] >').find('p').should('includes.text','nguyen');

  })
  it('Add new appointment', () => {
    cy.get('[data-qa="cookie-accept-btn"]').click();
    cy.wait(2000);
    cy.get('._06c6e7041').find('button').eq(1).click();
    cy.wait(500)
    cy.get('._06c6e7041').find('button').contains('New appointment').click();
  })
  it.only('Add new sale', () => {
  
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