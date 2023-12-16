import * as path from "path";

describe("new sales", () => {
  const xlsxPath = "cypress/downloads/tip_option.xlsx";
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
    cy.fixture("sale_case").as("saleCaseData");
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

  it("choose 1 product and choose tips", () => {
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

    cy.get("@tipOptionsData").then((tips) => {
      for (let i = 0; i < tips.length; i++) {
        const tip = tips[i].tip;
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

  it("choose n product and unpaid", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.sale_buy_n_product_tip(2, "10");

    //continue
    cy.get('[data-qa="cart-continue-button"]').click();
    //unpaid
    cy.get('[data-qa="cart-continue-button"]').click();
    //continue
    cy.get('[data-qa="confirm-button"]').click();

    //check unpaid status
    cy.get('[data-qa="invoice-status-badge"]')
      .invoke("text")
      .should("include", "Unpaid");
  });

  it("choose n product > unpaid > check pay cash option", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.sale_buy_n_product_tip(2, "10");

    //unpaid
    cy.get('[data-qa="cart-continue-button"]').click();
    //continue
    cy.get('[data-qa="confirm-button"]').click();

    //pay button
    cy.get('[data-qa="pos-summary-cta"]').click();

    //by cash
    cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();

    cy.get("._33bfb6ca9 > .n5MyOK")
      .find('[data-qa*="predefined-change"]')
      .should("have.length.greaterThan", 0)
      .then(($elements) => {
        const count = $elements.length;

        //check pay cash pick
        for (let i = 0; i < count; i++) {
          cy.get(`[data-qa="predefined-change-${i}"]`).click();
          cy.get(`[data-qa="predefined-change-${i}"]`)
            .invoke("text")
            .then((txt) => {
              let selected = parseFloat(txt.slice(1).replace(/,/g, ""));
              cy.get('[data-qa="amount-input"]').should(($input) => {
                const inputValue = Math.round(parseFloat($input.val()));
                expect(inputValue).to.equal(selected);
              });
            });

          // cy.wait();
        }
      });
  });

  it("choose n product > unpaid > choose pay cash option n > check change", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.sale_buy_n_product_tip(2, "10");

    cy.sale_collect_cast("1", true);
  });

  it("choose n product > unpaid > choose pay cash option 1 > pay", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.sale_buy_n_product_tip(2, "10");

    //continue
    cy.get('[data-qa="cart-continue-button"]').click();
    //unpaid
    cy.get('[data-qa="cart-continue-button"]').click();
    //continue
    cy.get('[data-qa="confirm-button"]').click();

    //pay button
    cy.get('[data-qa="pos-summary-cta"]').click();

    //by cash
    cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();

    //select pay cash option 1
    cy.get(`[data-qa="predefined-change-0"]`).click();
    let selected = "";
    cy.get(`[data-qa="predefined-change-0"]`)
      .invoke("text")
      .then((txt) => {
        selected = txt;
      });

    //collect
    cy.get('[data-qa="collect-cash"]').click();

    //cookie accept
    cy.get('[data-qa="cookie-accept-btn"]').click();

    //change
    cy.get('[data-qa="cart-continue-button"]').click();

    //check Completed status
    cy.get('[data-qa="invoice-status-badge"]')
      .invoke("text")
      .should("include", "Completed");
  });

  it.only("customize test", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.get("@saleCaseData").then((datas) => {
      cy.log(datas.length);
      for (let i = 0; i < datas.length; i++) {
        let number_product = datas[i].number_product;
        let tip_option = datas[i].tip_option;
        let pay_option = datas[i].pay_option;
        let is_pay = datas[i].is_pay;

        cy.sale_buy_n_product_tip(number_product, tip_option);
        cy.sale_collect_cast(pay_option, is_pay);
      }
    });

    //   //change
    //   cy.get('[data-qa="cart-continue-button"]').click();

    //   //check Completed status
    //   cy.get('[data-qa="invoice-status-badge"]')
    //     .invoke("text")
    //     .should("include", "Completed");
  });
});
