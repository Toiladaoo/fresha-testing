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
import * as XLSX from "xlsx";
import * as path from "path";
import fs from "fs";

Cypress.Commands.add("login_business", (email, password) => {
  cy.visit(Cypress.env("url"));
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-qa="link-for-business"]').click();
  cy.get(".hero__topBtnWrapper > .button").click();
  cy.get('[data-qa="for-businesses"] > .CLnQGg').click();
  /* ==== End Cypress Studio ==== */
  cy.wait(2000);
  /* --- enter email account */
  cy.get(".c96c73cca").type(email);
  cy.get('[data-qa="continue"]').click();
  cy.wait(1000);
  // enter password
  cy.get(".c96c73cca").type(password);
  cy.get('[data-qa="login"]').click();
  cy.wait(500)

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

Cypress.Commands.add("RandomString",(length) =>{
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
    console.log(result);
  }

  return result;
})

Cypress.Commands.add("VisitTeamMemberPage", () => {
  cy.wait(1000)
  // cy.get('[data-qa="cookie-accept-btn"]').click();
  cy.wait(2000);
  cy.get('[data-qa="nav-d-business-settings"]').click();
  cy.get('[data-qa="modal-title"]').should('have.text','Business settings');
  cy.get('[href="/setup/team"]').click();
  cy.wait(3000)
  cy.get('[data-qa="modal-header-in-content"] > [data-qa="modal-title"]').should('includes.text','Team');
  cy.get('[href="/staff/employees"]').click();
  cy.wait(3000)
  cy.get('[data-qa="modal-title"] > .fWGqQa').should('includes.text','Team members');
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

  cy.wait(2000);
  //continue
  cy.get('[data-qa="cart-continue-button"]').click();
});

Cypress.Commands.add("sale_collect_cast", (pay_option, pay) => {
  return cy.wrap(false).then(() => {
    if (!pay) {
      // unpaid
      cy.get('[data-qa="cart-continue-button"]').click();
      cy.wait(1000);
      // continue
      cy.get('[data-qa="confirm-button"]').click();
      // pay button
      cy.get('[data-qa="pos-summary-cta"]').click();
    }
    cy.wait(2000);

    // by cash
    cy.get('[data-qa="cash-payment-method"] > ._06c620699').click();

    // select pay cash option 1
    cy.get(`[data-qa="predefined-change-${pay_option}"]`).click();

    // collect
    cy.get('[data-qa="collect-cash"]').click();

    // change
    cy.get('[data-qa="cart-continue-button"]').click();

    // check Completed status
    return cy
      .get('[data-qa="invoice-status-badge"]')
      .invoke("text")
      .then((text) => {
        // Use the 'text' variable in your custom logic
        const isCompleted = text.includes("Completed");

        // Perform additional actions based on the result
        if (isCompleted) {
          // Do something if the text includes "Completed"
          cy.log("Invoice is completed");
          return Cypress.Promise.resolve(true);
        } else {
          return Cypress.Promise.resolve(false);
        }
      });
  });
});

Cypress.Commands.add("jsonToExcel", (jsonArray, filePath) => {
  // Create a new workbook
  const ws = XLSX.utils.json_to_sheet(jsonArray);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Convert the workbook to a blob
  const blob = XLSX.write(wb, {
    bookType: "xlsx",
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Save the blob to a file
  cy.writeFile(filePath, blob, "binary");
});

Cypress.Commands.add('getEmployeeEmailList', () => {

  // Chờ đến khi dữ liệu được load
  cy.get('[data-qa="staff-list-item"]').should('have.length.greaterThan', 0);

    const employeeList = []; 
    // Chờ đến khi dữ liệu được load
    cy.get('.employee-item').should('have.length.greaterThan', 0);
  
    // Lặp qua từng nhân viên trên trang danh sách
    cy.get('[data-qa="staff-list-item"]').each(($employeeItem) => {
      const employeeInfo = {} ;
    
      // Click vào nhân viên để điều hướng đến trang chi tiết
      cy.wrap($employeeItem).click();
      cy.wait(1000);  
      // Lấy thông tin chi tiết từ trang chi tiết
      cy.get('#employee-form-profile > .gap-default-400x').within(() => {
        // Thực hiện các lệnh để lấy thông tin nhân viên từ trang chi tiết
        employeeInfo.email = cy.get('[data-qa="profile-section-email"] > ._06c627cca > .c96c73cca').text().trim();
      });
  
      // Quay lại trang danh sách
      cy.go('back');
  
      // Thêm thông tin về nhân viên vào danh sách
      employeeList.push(employeeInfo);
    });
  
    return employeeList;
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
