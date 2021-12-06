import { initWeb3, percySnapshot, WEB3_TIMEOUT } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3("/actions", true);
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
  });
});

describe("Default state", () => {
  it("Should have Registered Actions Header", () => {
    cy.get("#content-header").contains("Registered Actions");
  });
  it("Should have Protectable Loans", () => {
    cy.get("#protectable-loans-header").contains("We have found a protectable loan!");
  });
  it("Should show Aave loan", () => {
    cy.get("#aave-protectable-loan", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should navigate to protectable loan path", () => {
    cy.get("#aave-protectable-loan-button").click();
    cy.location().should((loc) => {
      if (loc.pathname)
        expect(loc.pathname).to.eq(
          "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
        );
    });
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/actions");
    });
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should navigate to register page", () => {
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/actions/register");
    });
  });
});

describe("Loan Selection", () => {
  it("Should navigate to Loan Selection", () => {
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/actions/register/topup");
    });
  });
  it("Should have header", () => {
    cy.get("#register-topup-loan-header").contains("Select a loan to protect");
  });
  it("Should have loan search header", () => {
    cy.get("#loan-search-header").contains("Or, enter wallet address with a loan:");
  });
  it("Should select Aave loan", () => {
    cy.get("#aave-option").click();
  });
  it("Should navigate to pool selection", () => {
    cy.get("#register-topup-loan-button").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.not.be.undefined;
    });
    cy.location().should((loc) => {
      if (loc.pathname)
        expect(loc.pathname).to.eq(
          "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
        );
    });
  });
});
