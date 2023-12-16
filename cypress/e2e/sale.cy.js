import * as path from "path";
import * as XLSX from "xlsx";
import fs from "fs";

describe("new sales", () => {
  const tip_option_path = "cypress/fixtures/tip_option.xlsx";
  const sale_cases_path = "cypress/fixtures/sale_cases.xlsx";
  // const jsonName = path.basename(xlsxPath).replace(".xlsx", ".json");

  before(() => {
    // cy.task("convertXLSXToJson", xlsxPath).then((res) => {
    //   cy.log(res);
    // });
    // Example using xlsx library
  });

  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1440, 900);
    // cy.fixture(jsonName).as("tipOptionsData");
    // cy.fixture("sale_case").as("saleCaseData");
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

    cy.readFile(tip_option_path, {
      encoding: "binary",
    }).then((excelData) => {
      const workbook = XLSX.read(excelData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const excelDataArray = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );

      excelDataArray.forEach((row) => {
        const tip = row.tip;
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
      });
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

  //ok ne
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

        let result = [];

        //check pay cash pick
        for (let i = 0; i < count; i++) {
          let res = "no result";

          cy.get(`[data-qa="predefined-change-${i}"]`).click();
          let selected = "selected";
          //check
          res = cy
            .get(`[data-qa="predefined-change-${i}"]`)
            .invoke("text")
            .then((txt) => {
              selected = parseFloat(txt.slice(1).replace(/,/g, ""));
              cy.get('[data-qa="amount-input"]').should(($input) => {
                const inputValue = Math.round(parseFloat($input.val()));

                if (inputValue === selected) {
                  return Cypress.Promise.resolve(true);
                } else {
                  return Cypress.Promise.resolve(false);
                }
                // expect(inputValue).to.equal(selected);
              });
            });

          cy.log(res);
          // cy.wait();
          result = [
            ...result,
            {
              cash_option: i,
              actual: res ? "passed" : "failed",
              check: "tested",
            },
          ];
        }

        const worksheet1 = XLSX.utils.json_to_sheet(result);
        const workbook1 = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook1, worksheet1, "CashOptions");

        console.log(worksheet1);
        console.log(workbook1);

        XLSX.writeFile(workbook1, "cash_option_result.xlsx", {
          compression: true,
        });
      });
  });

  it.only("choose n product > choose pay cash option n > check change", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.readFile(sale_cases_path, {
      encoding: "binary",
    }).then((excelData) => {
      const workbook = XLSX.read(excelData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelDataArray = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );

      const resultColumnIndex = excelDataArray[0].length + 1;

      let result = [];

      excelDataArray.forEach(async (row, index) => {
        let number_product = row.number_product;
        let tip_option = row.tip_option;
        let pay_option = row.pay_option;
        let is_pay = row.is_pay;

        let res = "";

        cy.sale_buy_n_product_tip(number_product, tip_option);
        cy.wait(2000);

        // by cash
        cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();

        // select pay cash option 1
        cy.get(`[data-qa="predefined-change-${pay_option}"]`).click();

        let selected = "";
        cy.get(`[data-qa="predefined-change-${pay_option}"]`)
          .invoke("text")
          .then((txt) => {
            selected = parseFloat(txt.slice(1).replace(/,/g, ""));
          });

        // collect
        cy.get('[data-qa="collect-cash"]').click();
        let final = null;
        //check change
        cy.get('[data-qa="payment-amount"]')
          .invoke("text")
          .then((txt) => {
            cy.log("txt: " + txt);
            let val = parseFloat(txt.slice(1).replace(/,/g, ""));

            if (selected === val) {
              final = true;
            } else {
              final = false;
            }
          });

        // row.result = res ? "passed" : "failed";
        row.result = final ? "failed" : "passed";
        result = [...result, row];
      });

      const worksheet1 = XLSX.utils.json_to_sheet(result);
      const workbook1 = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook1, worksheet1, "Employees");

      console.log(worksheet1);
      console.log(workbook1);

      XLSX.writeFile(workbook1, "_cash_check_pay_result.xlsx", {
        compression: true,
      });
    });

    cy.sale_buy_n_product_tip(2, "10");
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

  it("customize test", () => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });

    cy.readFile(sale_cases_path, {
      encoding: "binary",
    }).then((excelData) => {
      const workbook = XLSX.read(excelData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelDataArray = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );

      const resultColumnIndex = excelDataArray[0].length + 1;

      let result = [];

      excelDataArray.forEach((row, index) => {
        let number_product = row.number_product;
        let tip_option = row.tip_option;
        let pay_option = row.pay_option;
        let is_pay = row.is_pay;

        let res = "";

        cy.sale_buy_n_product_tip(number_product, tip_option);
        cy.sale_collect_cast(pay_option, is_pay)
          .then((res) => {
            cy.log("res1: " + res);

            worksheet[
              XLSX.utils.encode_cell({ r: index + 1, c: resultColumnIndex })
            ] = { v: res ? "passed" : "failed" };
            if (res) {
              return Cypress.Promise.resolve(true);
            } else {
              return Cypress.Promise.resolve(false);
            }
          })
          .then((val) => {
            cy.log("res1: " + res);

            res = val;
          });

        cy.log(res);
        row.result = res ? "passed" : "failed";

        result = [...result, row];
      });
      // cy.writeFile(
      //   "cypress/fixtures/sales/result/sale_cases_result.json",
      //   result,
      //   "binary"
      // );

      const worksheet1 = XLSX.utils.json_to_sheet(result);
      const workbook1 = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook1, worksheet1, "Employees");

      console.log(worksheet1);
      console.log(workbook1);

      XLSX.writeFile(workbook1, "sale_cases_result.xlsx", {
        compression: true,
      });
    });
  });
});
