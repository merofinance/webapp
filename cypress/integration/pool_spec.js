import { initWeb3, percySnapshot, WEB3_TIMEOUT } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3("/pools");
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
    cy.get("#pool-row-bkdeth", { timeout: WEB3_TIMEOUT }).click();
  });
});

describe("Innitial Data", () => {
  it("Should load ETH balance", () => {
    cy.get("#available-amount", { timeout: WEB3_TIMEOUT }).contains("0.05", {
      timeout: WEB3_TIMEOUT * 2,
    });
  });
  it("Should navigate back to pools", () => {
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/pools");
    });
  });
  it("Should navigate to DAI Pool", () => {
    cy.get("#pool-row-bkddai").click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/pool/bkdDAI");
    });
  });
  it("Should load DAI balance", () => {
    cy.get("#available-amount", { timeout: WEB3_TIMEOUT }).contains("500", {
      timeout: WEB3_TIMEOUT,
    });
  });
});

describe("Default state", () => {
  it("Should have DAI Header", () => {
    cy.get("#content-header").contains("DAI pool");
  });
  it("Should have disabled button", () => {
    cy.get("#action-button").contains("Deposit and Stake");
    cy.get("#action-button").should("be.disabled");
  });
  it("Should have max button", () => {
    cy.get("#input-button").contains("max");
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
    cy.get("#amount-input").type("600");
    cy.get("#input-label").should("have.css", "color", "rgb(244, 67, 54)");
    cy.get("#input-note").contains("Amount exceeds available balance");
    cy.get("#amount-input").clear();
  });
});

describe("Deposit Input Methods", () => {
  it("Should input max amount", () => {
    cy.get("#input-button").click();
    cy.get("#amount-input").should("have.value", "500");
    cy.get("#amount-input").clear();
  });
  it("Should input 50%", () => {
    cy.get("#slider-50").click();
    cy.get("#amount-input").should("have.value", "250");
    cy.get("#amount-input").clear();
  });
  it("Should input 100%", () => {
    cy.get("#slider-100").click();
    cy.get("#amount-input").should("have.value", "500");
    cy.get("#amount-input").clear();
  });
});

describe("Depositing", () => {
  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("10");
  });
  it("Should have input value", () => {
    cy.get("#amount-input").should("have.value", "10");
  });
  it("Should have no errors", () => {
    cy.get("#input-note").should("not.exist");
  });
  it("Should snapshot page", () => {
    percySnapshot();
  });
  it("Should have disabled deposit button", () => {
    cy.get("#action-button").should("be.disabled");
  });
  it("Should Approve", () => {
    cy.get("#approve-button").should("be.enabled");
    cy.get("#approve-button").click();
    cy.get("#desktop-connector").click();
    cy.get("#account-details-transactions div", { timeout: WEB3_TIMEOUT })
      .first()
      .contains("Approve");
    cy.get("#connector-loading-indicator", { timeout: WEB3_TIMEOUT }).should(
      "have.css",
      "opacity",
      "0"
    );
    cy.get("#account-details-clear").click();
    cy.get("#account-details-transactions").children().should("have.length", 0);
    cy.get("#connection-details-popup-exit").click();
  });
  it("Should Deposit", () => {
    cy.get("#action-button", { timeout: WEB3_TIMEOUT }).should("be.enabled");
    cy.get("#action-button").click();
  });
  it("Should disable button", () => {
    cy.get("#action-button", { timeout: WEB3_TIMEOUT }).should("be.disabled");
  });
});

describe("Account Details", () => {
  it("Should open Account Details", () => {
    cy.get("#desktop-connector").click();
  });
  it("Should show deposit transaction", () => {
    cy.get("#account-details-transactions div", { timeout: WEB3_TIMEOUT })
      .first()
      .contains("Deposit");
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
  it("Should snapshot page", () => {
    percySnapshot();
  });
  it("Should finish loading", () => {
    cy.get("#connector-loading-indicator", { timeout: WEB3_TIMEOUT }).should(
      "have.css",
      "opacity",
      "0"
    );
  });
  it("Should clear transactions", () => {
    cy.get("#account-details-clear").click();
    cy.get("#account-details-transactions").children().should("have.length", 0);
  });
  it("Should close", () => {
    cy.get("#connection-details-popup-exit").click();
  });
});

describe("Approve Button", () => {
  it("Should show after deposit", () => {
    cy.get("#approve-button").should("exist");
  });
  it("Should hide on revisiting of deposit", () => {
    cy.get('[id="pool.tabs.withdraw.tab"]').click();
    cy.get('[id="pool.tabs.deposit.tab"]').click();
    cy.get("#approve-button", { timeout: WEB3_TIMEOUT }).should("not.exist");
  });
});

describe("Withdraw Tab", () => {
  it("Should support navigation", () => {
    cy.get('[id="pool.tabs.withdraw.tab"]').click();
  });
  it("Should have DAI Header", () => {
    cy.get("#content-header").contains("DAI pool");
  });
  it("Should have disabled button", () => {
    cy.get("#withdraw-button").contains("Withdraw DAI");
    cy.get("#withdraw-button").should("be.disabled");
  });
  it("Should have max button", () => {
    cy.get("#input-button").contains("max");
  });
  it("Should load balance", () => {
    cy.get("#available-amount", { timeout: WEB3_TIMEOUT }).contains("10", {
      timeout: WEB3_TIMEOUT,
    });
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
    cy.get("#amount-input").clear();
  });
});

describe("Withdraw Input Methods", () => {
  it("Should input max amount", () => {
    cy.get("#input-button").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 9);
    cy.get("#amount-input").clear();
  });
  it("Should input 50%", () => {
    cy.get("#slider-50").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 4);
    cy.get("#amount-input").clear();
  });
  it("Should input 100%", () => {
    cy.get("#slider-100").click();
    cy.get("#amount-input")
      .invoke("val")
      .then((val) => +val)
      .should("be.gt", 9);
    cy.get("#amount-input").clear();
  });
});

describe("Withdraw", () => {
  it("Should input value", () => {
    cy.wait(30_000);
    cy.get("#input-button").click();
  });
  it("Should open withdrawal confirmation", () => {
    cy.get("#withdraw-button").click();
  });
  it("Should show withdrawal confirmation", () => {
    cy.get("#withdrawal-confirmation-popup-header").contains("Confirm withdrawal");
    percySnapshot();
  });
  it("Should confirm withdrawal", () => {
    cy.get("#withdrawal-confirmation-popup-button").click();
  });
  it("Should disable button", () => {
    cy.get("#withdrawal-confirmation-popup-button").should("be.disabled");
  });
  it("Should exit confirmation", () => {
    cy.get("#withdrawal-confirmation-popup-exit").click();
  });
  it("Should not show confirmation", () => {
    cy.get("#withdrawal-confirmation-popup-header").should("not.be.visible");
  });
  it("Should open Account Details", () => {
    cy.get("#desktop-connector").click();
  });
  it("Should show pending transaction", () => {
    cy.get("#account-details-transactions div", { timeout: WEB3_TIMEOUT })
      .first()
      .contains("Withdraw");
  });
  it("Should finish loading", () => {
    cy.get("#connector-loading-indicator", { timeout: WEB3_TIMEOUT }).should(
      "have.css",
      "opacity",
      "0"
    );
  });
  it("Should close", () => {
    cy.get("#connection-details-popup-exit").click();
  });
});
