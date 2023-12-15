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
Cypress.Commands.add("login_business", (email, password) => {
  cy.visit(Cypress.env("url"));
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-qa="link-for-business"]').click();
  cy.get(".hero__topBtnWrapper > .button").click();
  cy.get('[data-qa="for-businesses"] > .CLnQGg').click();
  /* ==== End Cypress Studio ==== */
  cy.wait(500);
  /* --- enter email account */
  cy.get(".c96c73cca").type(email);
  cy.get('[data-qa="continue"]').click();
  cy.wait(500);
  // enter password
  cy.get(".c96c73cca").type(password);
  cy.get('[data-qa="login"]').click();

  cy.get('[data-qa="cookie-accept-btn"]').should("be.visible").click();
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

Cypress.Commands.add("sale_buy_n_product_tip", (num, tip_option) => {
  //go to sale tab
  cy.get('[data-qa="nav-d-sales"]').click();
  cy.wait(1000);
  cy.get('[data-qa="tab-products"]').click();
  //choose product
  cy.get('[data-qa="cell-product-name-7269439"]').click();

  //invoice list
  cy.get("._3aa3d0699 > .gap-default-0")
    .find('[data-qa*="pos-cart-item-container"]')
    .eq(0)
    .click();

  //add quantity
  if (num > 1) {
    while (num > 1) {
      cy.get('[data-qa="cart-edit-quantity-plus"]').click();
      num--;
    }
  }

  //save
  cy.get('[data-qa="pos-cart-edit-save"]').click();
  cy.wait(1000);
  cy.get('[data-qa="cart-continue-button"]').click();

  //tip
  let tip_money = 0;
  if (tip_option == "0") {
    cy.get('[data-qa="no-tip-button"] > ._06c620699').click();
  } else {
    cy.get(`[data-qa="tip-tile-${tip_option}"] > ._06c620699`).click();
    cy.get(
      `[data-qa="tip-tile-${tip_option}"] > ._06c620699 > .n5MyOK > .font-default-body-s-regular`
    )
      .invoke("text")
      .then((text) => {
        const money_str = text.slice(1).replace(/,/g, "");
        tip_money = parseInt(money_str, 10);
        cy.log("tip: " + tip_money);
      });
  }

  cy.wait(4000);
  //continue
  cy.get('[data-qa="cart-continue-button"]').click();
});

Cypress.Commands.add("sale_collect_cast", (pay_option, pay) => {
  if (!pay) {
    //unpaid
    cy.get('[data-qa="cart-continue-button"]').click();
    cy.wait(1000);
    //continue
    // cy.get('[data-qa="confirm-button"]').click();
    //pay button
    cy.get('[data-qa="pos-summary-cta"]').click();
  }
  cy.wait(2000);

  //by cash
  cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();

  //select pay cash option 1
  cy.get(`[data-qa="predefined-change-${pay_option}"]`).click();
  let selected = "";
  cy.get(`[data-qa="predefined-change-${pay_option}"]`)
    .invoke("text")
    .then((txt) => {
      selected = txt;
    });

  //collect
  cy.get('[data-qa="collect-cash"]').click();

  const ifElementExists = (selector, attempt = 0) => {
    if (attempt === 100) return null; // no appearance, return null
    if (Cypress.$(selector).length === 0) {
      cy.wait(100, { log: false }); // wait in small chunks
      getDialog(selector, ++attempt); // try again
    }
    return cy.get(selector, { log: false }); // done, exit with the element
  };

  // //cookie accept
  // cy.get('[data-qa="cookie-accept-btn"]').should("be.visible").click();

  //change
  cy.get('[data-qa="cart-continue-button"]').click();

  //check Completed status
  cy.get('[data-qa="invoice-status-badge"]')
    .invoke("text")
    .should("include", "Completed");
});

//
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
