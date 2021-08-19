import { percySnapshot } from "../support";

const isEnglish = () => {
  cy.get("h1").contains("Reactive Liquidity");
  cy.get("h3").contains(
    "A trustless and interest generating protocol designed to prevent collateralized loans from becoming liquidatable."
  );
  cy.get("#how-it-works-2").contains("Stake to Earn Rewards");
};

const isChinese = () => {
  cy.get("h1").contains("响应式流动资产");
  cy.get("h3").contains("一个去信任化利息生成，旨在防止担保贷款被清算的保护协议");
  cy.get("#how-it-works-2").contains("质押盈利");
};

describe("Setting Language with Query Parameter", () => {
  it("Should Show English with no Parameter", () => {
    cy.visit("/");
    isEnglish();
  });

  it("Should Show Chinese with ZH Parameter", () => {
    cy.visit("/?lng=zh");
    isChinese();
  });

  it("Should Show English with EN Parameter", () => {
    cy.visit("/?lng=en");
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

  it("Should Change Language to Chinese", () => {
    cy.get("#language-selector").click();
    cy.get("#zh").click();
  });

  it("Should Show Chinese", () => {
    isChinese();
  });

  it("Percy Should Screenshot Chinese Landing Page", () => {
    percySnapshot();
  });

  it("Should Change Language back to English", () => {
    cy.get("#language-selector").click();
    cy.get("#en").click();
  });

  it("Should Show English again", () => {
    isEnglish();
  });
});
