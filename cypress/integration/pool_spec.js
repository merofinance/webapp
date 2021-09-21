import { initWeb3, percySnapshot } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3();
    cy.visit("/pools/pool/bDAI");
  });
});

describe("Default state", () => {
  cy.get("#content-header").contains("Deposit DAI");
});

describe("Innitial Data", () => {
  it("Should load balance", () => {
    cy.get("#available-amount", { timeout: 30_000 }).contains(".", { timeout: 30_000 });
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
