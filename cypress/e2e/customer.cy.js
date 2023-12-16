import "../support/commands";
import * as XLSX from "xlsx";

const website = "https://www.fresha.com";
describe("search services", () => {
  const store_name_path = "cypress/fixtures/search_store_name.xlsx";
  const user_location_path = "cypress/fixtures/user_location.xlsx";

  //oke ne
  it("Search by store name ", () => {
    cy.readFile(store_name_path, {
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
        let name = row.name;
        let contain = row.contain;

        let check = null;
        cy.visit(website);
        cy.get(
          '.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]'
        ).type(name);
        cy.wait(1000);
        cy.get(".p_e4TX").find("li").eq(0).click();
        //check
        check = cy
          .get("h1")
          .invoke("text")
          .then((txt) => {
            if (txt.includes(contain)) {
              check = true;
              return true;
            } else {
              check = false;
              return false;
            }
          });
        row.actual = check ? "passed" : "failed";
        result = [...result, row];
      });

      const worksheet1 = XLSX.utils.json_to_sheet(result);
      const workbook1 = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook1, worksheet1, "SearchStore");
      XLSX.writeFile(workbook1, "_search_store_name.xlsx", {
        compression: true,
      });
    });
  });
  it("Choose a catogory, hair & styling ", () => {
    cy.visit(website);
    cy.get(
      '.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]'
    ).click();
    cy.wait(500);
    cy.get(".rmGUu7 > li").eq(0).click();
    // cy.get('#button-react-aria-230').click();
    cy.get('[data-qa="search-button-mobile-variant-home"]').click();
    cy.wait(1000);
    //check
    cy.get(".octcYA").contains("Hair & styling");
  });
  //oke ne
  it("use current location", () => {
    cy.readFile(user_location_path, {
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
        let location = row.location;
        let contain = row.contain;

        let check = null;
        cy.visit(website);
        cy.get(
          '.display-default-flex.gJ1v3P > [data-qa="location-search-input"]'
        ).click();
        cy.wait(4000);
        // cy.get('.otggd7 > [data-qa="location-search"]').type(location);
        cy.get(
          '.otg7W7 > [data-qa="location-search"] > [data-qa="location-search-input"]'
        ).type(location);
        // cy.get("._8TeLm7").click();
        // cy.wait(500);
        // cy.get('[data-qa="search-button-mobile-variant-home"]').click();
        //check
        check = cy
          .get("#button-react-aria-230")
          .should("exist")
          .invoke("text")
          .then((txt) => {
            if (txt.includes(contain)) {
              return true;
            } else {
              return false;
            }
          });
        row.actual = check ? "passed" : "failed";
        result = [...result, row];
      });

      const worksheet1 = XLSX.utils.json_to_sheet(result);
      const workbook1 = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook1, worksheet1, "SearchStore");
      XLSX.writeFile(workbook1, "_search_location.xlsx", {
        compression: true,
      });
    });
  });
  it("Search by date and time", () => {
    cy.visit(website);
    cy.get(".xDtH6q").click();
    // choose date
    cy.get(".display-default-flex.C0F5vv").click();
    cy.get("#button-tomorrow").click();
    cy.wait(1000);
    cy.get(".Lqd8vm").find("button").eq(1).click();
    //choose time
    cy.get(".display-default-flex.i6cY4E").click();
    cy.get("#button-evening").click();
    cy.get("select").eq(1).select("8:00pm");
    cy.wait(1000);
    cy.get(".Lqd8vm").find("button").eq(1).click();
    // click search button
    cy.get('[data-qa="search-button-mobile-variant-home"]').click();
    cy.wait(500);
    //check
    cy.get("#button-search-labels-container")
      .should("exist")
      .contains("Tomorrow");
  });
});

describe("add salon to favorite", () => {
  beforeEach(() => {
    cy.visit("https://www.fresha.com");

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-qa="link-for-business"]').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get(".hero__topBtnWrapper > .button").click();
    cy.wait(500);
    cy.get('[data-qa="for-everyone"] > .CLnQGg').click();
    cy.get("#input-react-aria-3").type("daobuisiteupz@gmail.com");
    cy.get('[data-qa="react-aria-4"]').click();
    /* enter password */
    cy.get("#input-react-aria-8").type("1convitcon");
    cy.get('[data-qa="react-aria-9"]').click();
    /* check exist */
    cy.get('[data-qa="avatar-button-desktop"]').click();
    cy.get('[data-qa="action-dropdown-btn-info-profile"]').click();
    cy.get('[data-qa="user-email"]')
      .should("exist")
      .contains("daobuisiteupz@gmail.com");
  });
  it("add na flower to favorite list ", () => {
    // find na flower store
    cy.visit(website);
    cy.get(".xDtH6q").click();
    cy.get(
      '.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]'
    ).type("na flower");
    cy.wait(1000);
    cy.get(".p_e4TX").find("li").eq(0).click();
    //check
    cy.get("h1").contains("Na");
    // click add to favorite
    cy.get('[data-qa="venue-page-favourite-button-desktop"]').click();
    //check
    cy.get('[data-qa="avatar-button-desktop"]').click();
    cy.get("ul._8TeLm7").should("be.visible");
    cy.get('[data-qa="action-menu-item-my-favorites"]').click();

    cy.get(".mre0Hq").should("be.visible");
    cy.get(".Grid-sc-14lvbxm-0")
      .find("p")
      .eq(0)
      .should("include.text", "Na'Flower");
  });
});
// find store, login -> chuyen qua commands.js de dung lai nhieu lan
describe("booking", () => {
  beforeEach(() => {
    cy.readFile(Cypress.env("login_json_file")).then((data) => {
      cy.login_business(data.email, data.password);
    });
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it.only("booking one service", () => {
    // find na flower store
    cy.visit(website);
    cy.get(".xDtH6q").click();
    cy.get(
      '.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]'
    ).type("na flower");
    cy.wait(4000);
    cy.get(".p_e4TX").find("li").eq(0).click();
    //check
    cy.get("h1").contains("Na'Flower");
    // booking process
    cy.scrollTo(0, 700);
    cy.wait(500);
    cy.get(".yhiQMX ").eq(2).click();
    cy.get('[data-qa="service-modal"]').should("be.visible");
    cy.get('[data-qa="service-modal-add-to-booking"]').click();
    cy.wait(4000);

    cy.get('[data-qa="continue-button-mobile"]').click();
    // add member
    cy.get("h1").contains("Select team member");
    cy.wait(2000);
    cy.get(".yzh99b").eq(1).click();
    cy.get('[data-qa="continue-button-mobile"]').click();
    cy.wait(3000);
    // add time
    cy.get("._8XJyZL").find("button").eq(4).click();
    cy.scrollTo(0, 500);
    cy.wait(3000);
    cy.get("._5zCVQX").children().eq(4).click();
    cy.wait(2000);
    cy.get('[data-qa="continue-button-mobile"]').click();
    // review and confirm
    cy.wait(1000);
    cy.get("h1").contains("Review and confirm");
    cy.get(
      '[data-qa="cart-mobile"] > .hB0YAs > .fWGp_B > .font-default-body-s-semibold'
    ).contains("Na'Flower");
    cy.get(
      ":nth-child(1) > ._6lhlpX > ._002hAX > ._nTFgX > ._2rJOeX > .font-default-body-m-medium"
    ).should("have.text", "Tuesday 12 December");
    cy.get(
      ".gap-default-250x > :nth-child(3) > ._6lhlpX > ._002hAX > ._nTFgX > ._2rJOeX > ._-wK3ss"
    ).should("have.text", "dao");
    cy.get(".K9pZ96 > .direction-default-horizontal").should("be.visible");
    cy.get('[data-qa="continue-button-mobile"]').click();
  });
  it("booking many service", () => {
    // find na flower store
    cy.visit(website);
    cy.get(".xDtH6q").click();
    cy.get(
      '.display-default-flex.ICZmSz > [data-qa="venue-treatment-search-input"]'
    ).type("na flower");
    cy.wait(4000);
    cy.get(".p_e4TX").find("li").eq(0).click();
    //check
    cy.get("h1").contains("Na'Flower");
    // booking process
    cy.scrollTo(0, 700);
    cy.wait(500);
    cy.get(".yhiQMX ").eq(2).click();
    cy.get('[data-qa="service-modal"]').should("be.visible");
    cy.get('[data-qa="service-modal-add-to-booking"]').click();
    cy.wait(4000);
    //check

    cy.get("._5zCVQX > :nth-child(2) > ._-wK3ss").should("include.text", "1");
    cy.get('[data-qa="continue-button-mobile"]').should("be.enabled");

    // add service
    cy.get(".yhiQMX ").eq(3).click();
    cy.wait(4000);
    cy.get('[data-qa="service-modal-add-to-booking"]').click();

    //check
    cy.get("._5zCVQX > :nth-child(2) > ._-wK3ss").should("include.text", "2");
    cy.get('[data-qa="continue-button-mobile"]').should("be.enabled");
    cy.get('[data-qa="continue-button-mobile"]').click();
    // add member
    cy.get("h1").contains("Select team member");
    cy.wait(2000);
    cy.get(".yzh99b").eq(1).click();
    cy.get('[data-qa="continue-button-mobile"]').click();
    cy.wait(3000);
    // add time
    cy.get("._8XJyZL").find("button").eq(5).click();
    cy.scrollTo(0, 500);
    cy.wait(3000);
    cy.get("._5zCVQX").children().eq(4).click();
    cy.wait(2000);
    cy.get('[data-qa="continue-button-mobile"]').click();
    // review and confirm
    cy.wait(1000);
    cy.get("h1").contains("Review and confirm");
    cy.get(
      '[data-qa="cart-mobile"] > .hB0YAs > .fWGp_B > .font-default-body-s-semibold'
    ).contains("Na'Flower");
    cy.get(
      ":nth-child(1) > ._6lhlpX > ._002hAX > ._nTFgX > ._2rJOeX > .font-default-body-m-medium"
    ).should("have.text", "Wednesday 13 December");
    cy.get(
      ".gap-default-250x > :nth-child(3) > ._6lhlpX > ._002hAX > ._nTFgX > ._2rJOeX > ._-wK3ss"
    ).should("have.text", "dao");
    cy.get(".K9pZ96 > .direction-default-horizontal").should("be.visible");
    cy.get('[data-qa="continue-button-mobile"]').click();
  });
});
