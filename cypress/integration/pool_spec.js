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
  it("Should snapshot page", () => {
    percySnapshot();
  });
});

describe("Deposit Validation", () => {
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

describe("Deposit Input Methods", () => {
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
  it("Should snapshot page", () => {
    percySnapshot();
  });
  it("Should Deposit", () => {
    cy.get("#action-button").click();
  });
  it("Should show loading button", () => {
    cy.get("#button-loading-indicator", { timeout: 30_000 }).should("be.visible");
  });
});

describe("Account Details", () => {
  it("Should show loading indicator on connector", () => {
    cy.get("#connector-loading-indicator", { timeout: 30_000 }).should("be.visible");
  });
  it("Should open Account Details", () => {
    cy.get("#desktop-connector").click();
  });
  it("Should show pending transaction", () => {
    cy.get("#account-details-transactions div").first().contains("Deposit");
  });
  it("Should show wallet type", () => {
    cy.get("#account-details-wallet").contains("MetaMask");
  });
  it("Should show address", () => {
    cy.get("#account-details-address").contains("...");
  });
  it("Should network as Kovan", () => {
    cy.get("#account-details-network").contains("Ethereum Kovan Testnet");
  });
  it("Should finish loading", () => {
    cy.get("#connector-loading-indicator", { timeout: 30_000 }).should("have.css", "opacity", "0");
  });
  it("Should snapshot page", () => {
    percySnapshot();
  });
  it("Should clear transactions", () => {
    cy.get("#account-details-clear").click();
    cy.get("#account-details-transactions").children().should("have.length", 0);
  });
  it("Should close", () => {
    cy.get("#popup-exit").click();
  });
});

describe("Withdraw Tab", () => {
  it("Should support navigation", () => {
    cy.get("#radio-option-withdraw").click();
  });
  it("Should have DAI Header", () => {
    cy.get("#content-header").contains("Withdraw DAI");
  });
  it("Should have disabled button", () => {
    cy.get("#withdraw-button").contains("Withdraw DAI");
    cy.get("#withdraw-button").should("be.disabled");
  });
  it("Should have max button", () => {
    cy.get("#input-button").contains("max");
  });
});

describe("Withdraw Validation", () => {
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
    percySnapshot();
    cy.get("#amount-input").clear();
  });
});

describe("Withdraw Input Methods", () => {
  it("Should input max amount", () => {
    cy.get("#input-button").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 9)
      .should("be.lt", 11);
    cy.get("#amount-input").clear();
  });
  it("Should input 50%", () => {
    cy.get("#slider-50").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 4)
      .should("be.lt", 6);
    cy.get("#amount-input").clear();
  });
  it("Should input 100%", () => {
    cy.get("#slider-100").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 9)
      .should("be.lt", 11);
    cy.get("#amount-input").clear();
  });
});

describe("Withdraw", () => {
  it("Should input value", () => {
    cy.get("#input-button").click();
  });
  it("Should Deposit", () => {
    cy.get("#withdraw-button").click();
  });
  it("Should show loading button", () => {
    cy.get("#button-loading-indicator", { timeout: 30_000 }).should("be.visible");
  });
  it("Should show loading indicator on connector", () => {
    cy.get("#connector-loading-indicator", { timeout: 30_000 }).should("be.visible");
  });
  it("Should open Account Details", () => {
    cy.get("#desktop-connector").click();
  });
  it("Should show pending transaction", () => {
    cy.get("#account-details-transactions div").first().contains("Withdraw");
  });
  it("Should finish loading", () => {
    cy.get("#connector-loading-indicator", { timeout: 30_000 }).should("have.css", "opacity", "0");
  });
  it("Should close", () => {
    cy.get("#popup-exit").click();
  });
});
