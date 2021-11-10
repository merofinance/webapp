import { initWeb3, percySnapshot, WEB3_TIMEOUT } from "../support";

// TEst search address

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3();
    cy.visit("/actions");
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
  });
});

describe("Default state", () => {
  it("Should have Registered Actions Header", () => {
    cy.get("#content-header").contains("Registered Actions");
  });
  it("Should have no Actions", () => {
    cy.get("#register-positions-empty").contains("You have not registered any Actions yet..");
  });
  it("Should have Register an Action Button", () => {
    cy.get("#register-action-button").contains("Register an Action");
  });
  it("Should have Your Deposits Info Card", () => {
    cy.get("#your-deposits-header").contains("Your Deposits");
  });
  it("Should have no deposits", () => {
    cy.get("#your-deposits-empty").contains("You do not have any existing Deposits...");
  });
  it("Should have Overview Info Card", () => {
    cy.get("#overview-header").contains("Overview");
  });
  it("Should have Overview Description", () => {
    cy.get("#overview-description").contains(
      "Use this screen to monitor your Actions. Actions are a set of predefined market triggers, that when occur, something is done on your behalf."
    );
  });
  it("Should have Overview Link", () => {
    cy.get("#overview-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/top-ups");
  });
  it("Should have Protectable Loans", () => {
    cy.get("#protectable-loans-header", { timeout: WEB3_TIMEOUT }).contains(
      "I have found a protectable loan!"
    );
  });
  it("Should show Aave loan", () => {
    cy.get("#aave-protectable-loan", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should navigate to protectable loan path", () => {
    cy.get("#aave-protectable-loan-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
      );
    });
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions");
    });
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should navigate to register page", () => {
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register");
    });
  });
});

describe("Register Page", () => {
  it("Should have Register Action Header", () => {
    cy.get("#content-header").contains("Register an Action");
  });
  it("Should have stage indicator", () => {
    cy.get("#content-key").contains("1/4");
  });
  it("Should have Your Deposits Info Card", () => {
    cy.get("#your-deposits-header").contains("Your Deposits");
  });
  it("Should have no deposits", () => {
    cy.get("#your-deposits-empty").contains("You do not have any existing Deposits...");
  });
  it("Should have Overview Description", () => {
    cy.get("#overview-description").contains(
      "Define the market triggers that will enable your action using this interface."
    );
  });
  it("Should have Overview Link", () => {
    cy.get("#overview-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/top-ups");
  });
  it("Should have Existing Actions Info Card", () => {
    cy.get("#existing-actions-header").contains("Existing Actions");
  });
  it("Should have no deposits", () => {
    cy.get("#existing-actions-empty").contains("You have not registered any Actions yet...");
  });
  it("Should have Top-up Note", () => {
    cy.get("#top-up-note").contains(
      "Use your Backd deposits as back-up collateral to protect your overcollateralised loans on Aave or Compound from getting liquidated."
    );
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should navigate to Loan Selection", () => {
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register/topup");
    });
  });
});

describe("Loan Selection", () => {
  it("Should have Loan Selection Header", () => {
    cy.get("#content-header").contains("Register an Action");
  });
  it("Should have Loan Selection Sub Header", () => {
    cy.get("#content-sub-header").contains("Top-up Position");
  });
  it("Should have stage indicator", () => {
    cy.get("#content-key").contains("2/4");
  });
  it("Should have Overview Description", () => {
    cy.get("#overview-description").contains(
      "Define the market triggers that will enable your action using this interface."
    );
  });
  it("Should navigate back", () => {
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register");
    });
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register/topup");
    });
  });
  it("Should have header", () => {
    cy.get("#register-topup-loan-header").contains("Select a loan to protect");
  });
  it("Should have loan search header", () => {
    cy.get("#loan-search-header").contains("Or, enter wallet address with a loan:");
  });
  it("Should show error on searching invalid address", () => {
    cy.get("#loan-search-input").focus();
    cy.get("#loan-search-input").type("not a valid address");
    cy.get("#loan-search-error").contains("Invalid Address");
  });
  it("Should enter valid address", () => {
    cy.get("#loan-search-input").clear();
    cy.get("#loan-search-input").type("0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D");
    cy.get("#loan-search-error").should("not.exist");
  });
  it("Should show loading spinner", () => {
    cy.get("#loan-search-spinner", { timeout: WEB3_TIMEOUT }).should("be.visible");
  });
  it("Should show loading spinner", () => {
    cy.get("#loan-search-spinner", { timeout: WEB3_TIMEOUT }).should("not.be.visible");
  });
  it("Should show aave from search", () => {
    cy.get("#loan-search-row-aave", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should have disabled button", () => {
    cy.get("#register-topup-loan-button").should("be.disabled");
  });
  it("Should select Aave loan", () => {
    cy.get("#aave-option").click();
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should navigate to pool selection", () => {
    cy.get("#register-topup-loan-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
      );
    });
  });
});

describe("Pool Selection", () => {
  it("Should have Pool Selection Header", () => {
    cy.get("#content-header").contains("Register an Action");
  });
  it("Should have Loan Selection Sub Header", () => {
    cy.get("#content-sub-header").contains("Top-up Position");
  });
  it("Should have stage indicator", () => {
    cy.get("#content-key").contains("3/4");
  });
  it("Should have Overview Description", () => {
    cy.get("#overview-description").contains(
      "Define the market triggers that will enable your action using this interface."
    );
  });
  it("Should navigate back", () => {
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register/topup");
    });
    cy.get("#aave-option").click();
    cy.get("#register-topup-loan-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
      );
    });
  });
  it("Should have header", () => {
    cy.get("#register-topup-pool-header").contains(
      "To register an action you must deposit assets into a Backd pool"
    );
  });
  it("Should have DAI Pool", () => {
    cy.get("#dai-pool-option").should("exist");
  });
  it("Should have ETH Pool", () => {
    cy.get("#eth-pool-option").should("exist");
  });
  it("Should have disabled button", () => {
    cy.get("#register-topup-pool-button").should("be.disabled");
  });
  it("Should have ETH Pool", () => {
    cy.get("#eth-pool-option").should("exist");
  });
  it("Should select DAI Pool", () => {
    cy.get("#dai-pool-option").click();
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should navigate to deposit stage", () => {
    cy.get("#register-topup-pool-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/deposit/bdai/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
      );
    });
  });
});

describe("Pool Deposit", () => {
  it("Should have stage indicator", () => {
    cy.get("#content-key").contains("3/4");
  });
  it("Should have deposit header", () => {
    cy.get("#register-topup-pool-deposit").contains("Enter an amount of DAI to deposit");
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("1000");
  });
  it("Should have input value", () => {
    cy.get("#amount-input").should("have.value", "1000");
  });
  it("Should have no errors", () => {
    cy.get("#input-note").should("not.exist");
  });
  it("Should have disabled button", () => {
    cy.get("#register-topup-pool-deposit-button").should("be.disabled");
  });
  it("Should have Your Deposits Info Card", () => {
    cy.get("#your-deposits-header").contains("Your Deposits");
  });
  it("Should have no deposits", () => {
    cy.get("#your-deposits-empty").contains("You do not have any existing Deposits...");
  });
  it("Should not show dai in info card", () => {
    cy.get("#your-deposits-dai").should("not.exist");
  });
  it("Should not show your deposits total", () => {
    cy.get("#your-deposits-total").should("not.exist");
  });
  it("Should Deposit", () => {
    cy.get("#action-button").should("be.enabled");
    cy.get("#action-button").click();
  });
  it("Should disable button", () => {
    cy.get("#action-button", { timeout: WEB3_TIMEOUT }).should("be.disabled");
  });
  it("Should show deposit in info card", () => {
    cy.get("#your-deposits-dai", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should show your deposits total", () => {
    cy.get("#your-deposits-total", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should navigate to conditions page", () => {
    cy.get("#register-topup-pool-deposit-button", { timeout: WEB3_TIMEOUT }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave/bdai"
      );
    });
  });
});

describe("Conditions Page", () => {
  it("Should have stage indicator", () => {
    cy.get("#content-key").contains("4/4");
  });
  it("Should have top-up conditions header", () => {
    cy.get("#register-topup-conditions-header").contains("Enter top-up conditions");
  });
  it("Should have top-up conditions header", () => {
    cy.get("#register-topup-conditions-header").contains("Enter top-up conditions");
  });
  it("Should have disabled button", () => {
    cy.get("#action-button").should("be.disabled");
  });

  it("Should have Action Summary", () => {
    cy.get("#action-summary", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should Change Pools", () => {
    cy.get("#action-summary-change-pool").should("exist");
    cy.get("#action-summary-change-pool").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave"
      );
    });
    cy.get("#dai-pool-option").click();
    cy.get("#register-topup-pool-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(
        "/actions/register/topup/0x3Dd5A5BBE1204dE8c5dED228a27fA942e439eA7D/Aave/bdai"
      );
    });
  });

  it("Should not show Live Help", () => {
    cy.get("#live-help").should("not.exist");
  });

  it("Should have nothing in threshold input", () => {
    cy.get("#register-topup-threshold-input").should("have.value", "");
  });
  it("Should not have threshold error", () => {
    cy.get("#register-topup-threshold-error").should("not.exist");
  });
  it("Should show threshold error on no entry", () => {
    cy.get("#register-topup-threshold-input").focus();
    cy.get("#register-topup-threshold-input").blur();
    cy.get("#register-topup-threshold-error").contains("Threshold is required");
  });
  it("Should show threshold error on 0", () => {
    cy.get("#register-topup-threshold-input").focus();
    cy.get("#register-topup-threshold-input").type("0");
    cy.get("#register-topup-threshold-error").contains("Must be greater than 1");
  });
  it("Should show Live Help on 1.1", () => {
    cy.get("#register-topup-threshold-input").clear();
    cy.get("#register-topup-threshold-input").focus();
    cy.get("#register-topup-threshold-input").type("1.1");
    cy.get("#register-topup-threshold-input").blur();
    cy.get("#live-help").should("exist");
  });
  it("Should implement Live Help", () => {
    cy.get("#live-help-implement").should("be.enabled");
    cy.get("#live-help-implement").click();
    cy.get("#register-topup-threshold-input").should("have.value", "1.2");
    cy.get("#live-help").should("not.exist");
  });
  it("Should show Live Help on 10000", () => {
    cy.get("#register-topup-threshold-input").clear();
    cy.get("#register-topup-threshold-input").focus();
    cy.get("#register-topup-threshold-input").type("10000");
    cy.get("#register-topup-threshold-input").blur();
    cy.get("#live-help").should("exist");
  });
  it("Should implement Live Help", () => {
    cy.get("#live-help-implement").should("be.enabled");
    cy.get("#live-help-implement").click();
    cy.get("#register-topup-threshold-input").should("have.value", "1.2");
    cy.get("#live-help").should("not.exist");
  });
  it("Should enter threshold", () => {
    cy.get("#register-topup-threshold-input").clear();
    cy.get("#register-topup-threshold-input").type("2");
    cy.get("#register-topup-threshold-error").should("not.exist");
  });

  it("Should have nothing in single input", () => {
    cy.get("#register-topup-singletopup-input").should("have.value", "");
  });
  it("Should not have single error", () => {
    cy.get("#register-topup-singletopup-error").should("not.exist");
  });
  it("Should show single error on no entry", () => {
    cy.get("#register-topup-singletopup-input").focus();
    cy.get("#register-topup-singletopup-input").blur();
    cy.get("#register-topup-singletopup-error").contains("Single Top-up is required");
  });
  it("Should show single error on 0", () => {
    cy.get("#register-topup-singletopup-input").focus();
    cy.get("#register-topup-singletopup-input").type("0");
    cy.get("#register-topup-singletopup-error").contains("Must be positive number");
  });
  it("Should enter single", () => {
    cy.get("#register-topup-singletopup-input").clear();
    cy.get("#register-topup-singletopup-input").type("100");
    cy.get("#register-topup-singletopup-error").should("not.exist");
  });

  it("Should have nothing in total input", () => {
    cy.get("#register-topup-maxtopup-input").should("have.value", "");
  });
  it("Should not have total error", () => {
    cy.get("#register-topup-maxtopup-error").should("not.exist");
  });
  it("Should show total error on no entry", () => {
    cy.get("#register-topup-maxtopup-input").focus();
    cy.get("#register-topup-maxtopup-input").blur();
    cy.get("#register-topup-maxtopup-error").contains("Max Top-up required");
  });
  it("Should show total error on 0", () => {
    cy.get("#register-topup-maxtopup-input").focus();
    cy.get("#register-topup-maxtopup-input").type("0");
    cy.get("#register-topup-maxtopup-error").contains("Invalid number");
  });
  it("Should show total error less than single", () => {
    cy.get("#register-topup-maxtopup-input").clear();
    cy.get("#register-topup-maxtopup-input").type("1");
    cy.get("#register-topup-singletopup-error").contains("Must be less than max top-up");
  });
  it("Should enter total", () => {
    cy.get("#register-topup-maxtopup-input").clear();
    cy.get("#register-topup-maxtopup-input").type("400");
    cy.get("#register-topup-maxtopup-error").should("not.exist");
    cy.get("#register-topup-singletopup-error").should("not.exist");
  });

  it("Should have nothing in gas input", () => {
    cy.get("#register-topup-maxgasprice-input").should("have.value", "");
  });
  it("Should not have gas error", () => {
    cy.get("#register-topup-maxgasprice-error").should("not.exist");
  });
  it("Should show gas error on no entry", () => {
    cy.get("#register-topup-maxgasprice-input").focus();
    cy.get("#register-topup-maxgasprice-input").blur();
    cy.get("#register-topup-maxgasprice-error").contains("Max Gas Price required");
  });
  it("Should show gas error on 0", () => {
    cy.get("#register-topup-maxgasprice-input").focus();
    cy.get("#register-topup-maxgasprice-input").type("0");
    cy.get("#register-topup-maxgasprice-error").contains("Must be positive number");
  });
  it("Should show Live Help on high gas", () => {
    cy.get("#register-topup-maxgasprice-input").clear();
    cy.get("#register-topup-maxgasprice-input").focus();
    cy.get("#register-topup-maxgasprice-input").type("100");
    cy.get("#register-topup-maxgasprice-input").blur();
    cy.get("#live-help").should("exist");
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should implement Live Help", () => {
    cy.get("#live-help-implement").should("be.enabled");
    cy.get("#live-help-implement").click();
    cy.get("#register-topup-singletopup-input").should("not.have.value", "100");
    cy.get("#live-help").should("not.exist");
  });
  it("Should enter single", () => {
    cy.get("#register-topup-singletopup-input").clear();
    cy.get("#register-topup-singletopup-input").type("100");
    cy.get("#register-topup-singletopup-error").should("not.exist");
  });
  it("Should enter gas", () => {
    cy.get("#register-topup-maxgasprice-input").clear();
    cy.get("#register-topup-maxgasprice-input").type("50");
    cy.get("#register-topup-maxgasprice-error").should("not.exist");
    cy.get("#register-topup-maxtopup-error").should("not.exist");
  });

  it("Should Show Top-up Creation Confirmation", () => {
    cy.get("#action-button").should("be.enabled");
    cy.get("#action-button").click();
  });
});

describe("Top-up Position Confirmation", () => {
  it("Should be visible", () => {
    cy.get("#register-topup-confirmation-popup-header").contains("Confirm top-up position");
  });
  it("Should close", () => {
    cy.get("#register-topup-confirmation-popup-exit").click();
  });
  it("Should not be visible", () => {
    cy.get("#register-topup-confirmation-popup-header").should("not.be.visible");
  });
  it("Should open", () => {
    cy.get("#action-button").should("be.enabled");
    cy.get("#action-button").click();
    cy.get("#register-topup-confirmation-popup-header").contains("Confirm top-up position");
  });
  it("Should cancel", () => {
    cy.get("#register-topup-confirmation-popup-cancel").click();
  });
  it("Should not be visible", () => {
    cy.get("#register-topup-confirmation-popup-header").should("not.be.visible");
  });
  it("Should open", () => {
    cy.get("#action-button").should("be.enabled");
    cy.get("#action-button").click();
    cy.get("#register-topup-confirmation-popup-header").contains("Confirm top-up position");
  });
  it("Should have position data", () => {
    cy.get("#topup-information-protocol").contains("Aave");
    cy.get("#topup-information-threshold").contains("2");
    cy.get("#topup-information-single-topup").contains("100");
    cy.get("#topup-information-max-topup").contains("400");
    cy.get("#topup-information-max-gas").contains("50");
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should Confirm", () => {
    cy.get("#register-topup-confirmation-popup-button").should("be.enabled");
    cy.get("#register-topup-confirmation-popup-button").click();
  });
  it("Should disable button", () => {
    cy.get("#register-topup-confirmation-popup-button", { timeout: WEB3_TIMEOUT }).should(
      "be.disabled"
    );
  });
  it("Should redirect to actions on completion", () => {
    cy.get("#register-action-button", { timeout: WEB3_TIMEOUT }).should("exist");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions");
    });
  });
});

describe("Existing Topup View", () => {
  it("Should not show registered actions empty text", () => {
    cy.get("#register-positions-empty").should("not.exist");
  });
  it("Should show registered action", () => {
    cy.get("#registered-action-aave", { timeout: WEB3_TIMEOUT }).should("exist");
  });
  it("Should not show protectable loans", () => {
    cy.get("#aave-protectable-loan", { timeout: WEB3_TIMEOUT }).should("not.exist");
  });
  it("Should have Register an Action Button", () => {
    cy.get("#register-action-button").contains("Register an Action");
  });
  it("Should navigate to register page", () => {
    cy.get("#register-action-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions/register");
    });
  });
  it("Should have Existing Actions Info Card", () => {
    cy.get("#existing-actions-header").contains("Existing Actions");
  });
  it("Should show existing action", () => {
    cy.get("#existing-action-aave").should("exist");
  });
  it("Should view existing action", () => {
    cy.get("#existing-action-aave-view").click();
  });
  it("Should show existing action view popup", () => {
    cy.get("#topup-action-popup-header").should("be.visible");
    cy.get("#topup-action-popup-header").contains("Top-up Position");
  });
  it("Should close popup", () => {
    cy.get("#topup-action-popup-exit").click();
  });
  it("Should go back to actions page", () => {
    cy.get("#back-button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/actions");
    });
  });
  it("Should take snapshot", () => {
    percySnapshot();
  });
  it("Should open action view", () => {
    cy.get("#registered-action-aave").click();
  });
  it("Should have position data", () => {
    cy.get("#topup-information-protocol").contains("Aave");
    cy.get("#topup-information-threshold").contains("2");
    cy.get("#topup-information-single-topup").contains("100");
    cy.get("#topup-information-max-topup").contains("400");
    cy.get("#topup-information-max-gas").contains("50");
  });
  it("Should have delete button", () => {
    cy.get("#delete-action-button").contains("Delete Top-up Position");
  });
  it("Should show delete Top-up Position confirmation", () => {
    cy.get("#delete-action-button").click();
    cy.get("#delete-topup-confirmation-popup-header").contains("Delete Top-up Position");
  });
  it("Should show delete confirmation description", () => {
    cy.get("#delete-topup-confirmation-popup-body").contains(
      "Deleting this top-up position will remove automated collateral top-ups of DAI on Aave. 400 DAI will be unstaked and can be withdrawn after removing the position."
    );
  });
  it("Should have cancel button", () => {
    cy.get("#delete-topup-confirmation-cancel").contains("Do not delete");
  });
  it("Should have delete button", () => {
    cy.get("#delete-topup-confirmation-button").contains("Delete Top-up Position");
    cy.get("#register-action-button").should(
      "have.css",
      "background-image",
      "linear-gradient(rgb(15, 8, 48), rgb(15, 8, 48)), linear-gradient(to right, rgb(209, 39, 250) 0%, rgb(36, 189, 227) 50%, rgb(209, 39, 250) 100%)"
    );
  });
  it("Should Confirm", () => {
    cy.get("#delete-topup-confirmation-button").should("be.enabled");
    cy.get("#delete-topup-confirmation-button").click();
  });
  it("Should disable button", () => {
    cy.get("#delete-topup-confirmation-button", { timeout: WEB3_TIMEOUT }).should("be.disabled");
  });
  it("Should not show popups", () => {
    cy.get("#delete-topup-confirmation-popup-header", { timeout: WEB3_TIMEOUT }).should(
      "not.exist"
    );
  });
  it("Should have no Actions", () => {
    cy.get("#register-positions-empty", { timeout: WEB3_TIMEOUT }).contains(
      "You have not registered any Actions yet.."
    );
  });
  it("Should have Register an Action Button", () => {
    cy.get("#register-action-button").contains("Register an Action");
  });
  it("Should have Protectable Loans", () => {
    cy.get("#protectable-loans-header", { timeout: WEB3_TIMEOUT }).contains(
      "I have found a protectable loan!"
    );
  });
  it("Should show Aave loan", () => {
    cy.get("#aave-protectable-loan", { timeout: WEB3_TIMEOUT }).should("exist");
  });
});
