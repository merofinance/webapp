import { initWeb3, percySnapshot } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3();
    cy.visit("/pools");
  });
});

describe("Wallet Select Popup", () => {
  it("Should have link", () => {
    cy.get("#wallet-select-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backd-1.gitbook.io/backd/resources/faq/general");
  });
  it("Should connect wallet", () => {
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
  });
});

describe("Connector", () => {
  it("Should show address", () => {
    cy.get("#connector-address").contains("...");
  });
  it("Should show network color dot for Kovan", () => {
    cy.get("#connector-network-dot").should("have.css", "background-color", "rgb(137, 102, 246)");
  });
  it("Should show network label Kovan", () => {
    cy.get("#network-name").contains("Kovan");
  });
});

describe("Overview", () => {
  it("Should show overview by default", () => {
    cy.get("#overview").contains("Overview");
    cy.get("#overview").invoke("outerHeight").should("be.gt", 48);
  });
  it("Should close overview", () => {
    cy.get("#overview-header").click();
    cy.get("#overview").invoke("outerHeight").should("be.lt", 80);
  });
  it("Should open overview", () => {
    cy.get("#overview-header").click();
    cy.get("#overview").invoke("outerHeight").should("be.gt", 48);
  });
  it("Should should have overview link", () => {
    cy.get("#overview-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/");
  });
});

describe("Pools", () => {
  it("Should load Pools", () => {
    cy.get("#pool-row-bdai", { timeout: WEB3_TIMEOUT }).should("be.visible");
  });
  it("Should snapshot page", () => {
    percySnapshot();
  });
  it("Should navigate to Pool", () => {
    cy.get("#pool-row-bdai", { timeout: WEB3_TIMEOUT }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pool/bDAI");
    });
  });
  it("Should navigate back to pools", () => {
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pools");
    });
  });
});
