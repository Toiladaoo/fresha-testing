import * as path from "path";

describe("new sales", () => {
  const xlsxPath = "../fresha-testing/cypress/downloads/tip_option.xlsx";
  const jsonName = path.basename(xlsxPath).replace(".xlsx", ".json");

  before(() => {
    cy.task("convertXLSXToJson", xlsxPath).then((res) => {
      cy.log(res);
    });
  });

  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1440, 900);
    cy.fixture(jsonName).as("tipOptionsData");
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

  it("choose 2 product", () => {
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
      .should("have.length", 2);
  });

  it("choose 1 product and add quantity", () => {
    const expectedText = "2";

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

    //add quantity
    cy.get('[data-qa="cart-edit-quantity-plus"]').click();
    //check quantity
    cy.get('[data-qa="cart-edit-quantity-input"]')
      .should("be.visible")
      .invoke("val")
      .should("eq", expectedText);
  });

  it("choose 1 product and add quantity and save", () => {
    const expectedText = "2";

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

    //add quantity
    cy.get('[data-qa="cart-edit-quantity-plus"]').click();

    //save
    cy.get('[data-qa="pos-cart-edit-save"]').click();

    //check quantity
    cy.get("._3aa3d0699 > .gap-default-0")
      .find('[data-qa*="pos-cart-item-container"]')
      .eq(0)
      .get('[data-qa="pos-cart-item-amount"]')
      .should("include.text", "2");
  });

  it.only("choose 1 product and buy", () => {
    cy.get("@tipOptionsData").then((tips) => {
      for (const tip_option in tips) {
        const tip = tip_option["tip"];

        cy.log(dataFile);

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

        //add quantity
        cy.get('[data-qa="cart-edit-quantity-plus"]').click();

        //save
        cy.get('[data-qa="pos-cart-edit-save"]').click();
        cy.wait(1000);
        cy.get('[data-qa="cart-continue-button"]').click();
        //tip
        let tip_money = 0;
        if (tip == "0") {
          cy.get('[data-qa="no-tip-button"] > ._06c620699').click();
        } else {
          cy.get(`[data-qa="tip-tile-${tip}"] > ._06c620699`).click();
          cy.get(
            '[data-qa="tip-tile-10"] > ._06c620699 > .n5MyOK > .font-default-body-s-regular'
          )
            .invoke("text")
            .then((text) => {
              const money_str = text.slice(1).replace(/,/g, "");
              tip_money = parseInt(money_str, 10);
              cy.log("tip: " + tip_money);
            });
        }

        cy.wait(4000);

        //total
        let total = 0;
        cy.get('[data-qa="pos-summary-total-price"]')
          .invoke("text")
          .then((text) => {
            const money_str = text.slice(1).replace(/,/g, "");
            total = parseInt(money_str, 10);
            cy.log("total: " + total);
          });

        //check total money + tip
        cy.get('[data-qa="pos-cart-to-pay"]')
          .invoke("text")
          .then((text) => {
            cy.log("final: " + text);
            const money_str = text.slice(1).replace(/,/g, "");
            let final_total = parseInt(money_str, 10);
            expect(final_total).to.equal(total + tip_money);
          });
      }
    });
  });
});
