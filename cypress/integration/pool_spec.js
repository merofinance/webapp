import { initWeb3, percySnapshot } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3();
    cy.visit("/pools");
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
    cy.get("#pool-row-bdai", { timeout: 30_000 }).click();
  });
});

describe("Default state", () => {
  it("Should have DAI Header", () => {
    cy.get("#content-header").contains("Deposit DAI");
  });
  it("Should have disabled button", () => {
    cy.get("#action-button").contains("Deposit and Stake");
    cy.get("#action-button").should("be.disabled");
  });
  it("Should have max button", () => {
    cy.get("#input-button").contains("max");
  });
});

describe("Innitial Data", () => {
  it("Should load balance", () => {
    cy.get("#available-amount", { timeout: 30_000 }).contains(".", { timeout: 30_000 });
  });
});

describe("Validation", () => {
  it("Should error on 0", () => {
    cy.get("#amount-input").type("0");
    cy.get("#input-label").should("have.css", "color", "rgb(244, 67, 54)");
    cy.get("#input-note").contains("Amount must be a positive number");
    cy.get("#amount-input").clear();
  });
  it("Should error on above amount", () => {
    cy.get("#amount-input").type("1000000000000");
    cy.get("#input-label").should("have.css", "color", "rgb(244, 67, 54)");
    cy.get("#input-note").contains("Amount exceeds available balance");
    cy.get("#amount-input").clear();
  });
});

describe("Input Methods", () => {
  it("Should input max amount", () => {
    cy.get("#input-button").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 10);
    cy.get("#amount-input").clear();
  });
  it("Should input 50%", () => {
    cy.get("#slider-50").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 10);
    cy.get("#amount-input").clear();
  });
  it("Should input 100%", () => {
    cy.get("#slider-100").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 20);
    cy.get("#amount-input").clear();
  });
});

describe("Depositing", () => {
  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("10");
  });

  it("Should Deposit", () => {
    cy.get("#action-button").click();
  });
});
