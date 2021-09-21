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

describe("Depositing", () => {
  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("10");
  });

  it("Should Deposit", () => {
    cy.get("#action-button").click();
  });
});
