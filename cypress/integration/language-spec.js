const isJapanese = () => {
  cy.get("h1").contains("反応性流動資産");
  cy.get("h3").contains(
    "担保付ローンを清算から防ぐために設計された、管理者不在の利子生成プロトコルです。"
  );
  cy.get('[id="How It Works - 2"]').contains("利益獲得のための出資");
};

const isEnglish = () => {
  cy.get("h1").contains("Reactive Liquidity");
  cy.get("h3").contains(
    "A trustless and interest generating protocol designed to prevent collateralized loans from becoming liquidatable."
  );
  cy.get('[id="How It Works - 2"]').contains("Stake to Earn Rewards");
};

describe("Setting Language with Query Parameter", () => {
  it("Should Show English with no Parameter", () => {
    cy.visit("/");
    isEnglish();
  });

  it("Should Show Japanese with JP Parameter", () => {
    cy.visit("/?lang=jp");
    isJapanese();
  });

  it("Should Show English with EN Parameter", () => {
    cy.visit("/?lang=en");
    isEnglish();
  });
});

describe("Language Switching", () => {
  it("Should navigate to Langing Page", () => {
    cy.visit("/");
  });

  it("Should Show English by default", () => {
    isEnglish();
  });

  it("Should Change Language to Japanese", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="jp"]').click();
  });

  it("Should Show Japanese", () => {
    isJapanese();
  });

  it("Percy Should Screenshot Japanese Landing Page", () => {
    cy.percySnapshot();
  });

  it("Should Change Language back to English", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="en"]').click();
  });

  it("Should Show English again", () => {
    isEnglish();
  });
});
