describe("Innitial Load", () => {
  it("Should Load Home Page", () => {
    cy.visit("/");
  });
});

describe("Language Switching", () => {
  it("Should Show English by default", () => {
    cy.get("h1").contains("Reactive Liquidity");
    cy.get("h3").contains(
      "A trustless and interest generating protocol designed to prevent collateralized loans from becoming liquidatable."
    );
    cy.get('[id="How It Works - 2"]').contains("Stake to Earn Rewards");
  });

  it("Should Change Language to Japanese", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="jp"]').click();
  });

  it("Should Show Japanese", () => {
    cy.get("h1").contains("反応性流動資産");
    cy.get("h3").contains(
      "担保付ローンを清算から防ぐために設計された、管理者不在の利子生成プロトコルです。"
    );
    cy.get('[id="How It Works - 2"]').contains("利益獲得のための出資");
  });

  describe("Percy", () => {
    it("Should Screenshot Japanese Landing Page", () => {
      cy.percySnapshot();
    });
  });

  it("Should Change Language back to English", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="en"]').click();
  });

  it("Should Show English again", () => {
    cy.get("h1").contains("Reactive Liquidity");
    cy.get("h3").contains(
      "A trustless and interest generating protocol designed to prevent collateralized loans from becoming liquidatable."
    );
    cy.get('[id="How It Works - 2"]').contains("Stake to Earn Rewards");
  });
});
