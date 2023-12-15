describe("new sales", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1440, 900);
  });

  it("choose 1 product", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    //go to sale tab
    cy.get('[data-qa="nav-d-sales"]').click();
    cy.get('[data-qa="tab-products"]').click();
    //choose product
    cy.get('[data-qa="cell-product-name-7269439"]').click();

    //invoice list
    cy.get("._3aa3d0699 > .gap-default-0")
      .find('[data-qa*="pos-cart-item-container"]')
      .should("have.length", 1);
  });

  it.only("choose 1 product and add quantity", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    //go to sale tab
    cy.get('[data-qa="nav-d-sales"]').click();
    cy.get('[data-qa="tab-products"]').click();
    //choose product
    cy.get('[data-qa="cell-product-name-7269439"]').click();

    //invoice list
    cy.get("._3aa3d0699 > .gap-default-0")
      .find('[data-qa*="pos-cart-item-container"]')
      .eq(0)
      .click();
  });
});
