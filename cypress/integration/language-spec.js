import { percySnapshot } from "../support";

const isEnglish = () => {
  cy.get("h1").contains("Reactive Liquidity");
  cy.get("h3").contains(
    "Maximize the power of your assets and start earning yield with Backd's liquidity pools."
  );
  cy.get("#how-it-works-2").contains("Protect & Earn");
};

const isChinese = () => {
  cy.get("h1").contains("响应式流动资产");
  cy.get("h3").contains("一个去信任化利息生成，旨在防止担保贷款被清算的保护协议");
  cy.get("#how-it-works-2").contains("安全放心地赚取");
};

const isJapanese = () => {
  cy.get("h1").contains("リアクティブ流動資産");
  cy.get("h3").contains(
    "お客様の資産を最大限活用し、Backdの流動性プールで利回りを稼ぎ始めましょう。"
  );
  cy.get("#how-it-works-2").contains("安全に稼ぐ");
};

const isSpanish = () => {
  cy.get("h1").contains("Liquidez reactiva");
  cy.get("h3").contains(
    "Un protocolo trustless y generador de intereses diseñado para prevenir que préstamos colaterizados se conviertan en liquidables."
  );
  cy.get("#how-it-works-2").contains("Protege y Gana");
};

const isFrench = () => {
  cy.get("h1").contains("Liquidité Réactive");
  cy.get("h3").contains(
    "Un protocole qui génére des intérêts sans nécessiter de tiers de confiance. Conçu pour éviter la liquidation de prêts garantis."
  );
  cy.get("#how-it-works-2").contains("Protéger et gagner");
};

const isPortuguese = () => {
  cy.get("h1").contains("Liquidez reativa");
  cy.get("h3").contains(
    "Maximize o poder de seus ativos e comece a ganhar rendimento com as pools de liquidez do Backd."
  );
  cy.get("#how-it-works-2").contains("Proteja e ganhe");
};

describe("Setting Language with Query Parameter", () => {
  it("Should Show English with no Parameter", () => {
    cy.visit("/");
    isEnglish();
  });

  it("Should Show Chinese with ZH Parameter", () => {
    cy.visit("/?lng=zh-Hant");
    isChinese();
  });

  it("Should Show Japanese with JA Parameter", () => {
    cy.visit("/?lng=ja");
    isJapanese();
  });

  it("Should Show Spanish with ES Parameter", () => {
    cy.visit("/?lng=es");
    isSpanish();
  });

  it("Should Show French with FR Parameter", () => {
    cy.visit("/?lng=fr");
    isFrench();
  });

  it("Should Show Portuguese with pt_PT Parameter", () => {
    cy.visit("/?lng=pt_PT");
    isPortuguese();
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
    cy.get('[id="zh-Hant"]').click();
  });

  it("Should Show Chinese", () => {
    isChinese();
  });

  it("Should Change Language to Japanese", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="ja"]').click();
  });

  it("Should Show Japanese", () => {
    isJapanese();
  });

  it("Should Change Language to Portuguese", () => {
    cy.get('[id="language-selector"]').click();
    cy.get('[id="pt_PT"]').click();
  });

  it("Should Show Portuguese", () => {
    isPortuguese();
  });

  // it("Should Change Language to Spanish", () => {
  //   cy.get('[id="language-selector"]').click();
  //   cy.get('[id="es"]').click();
  // });

  // it("Should Show Spanish", () => {
  //   isSpanish();
  // });

  // it("Should Change Language to French", () => {
  //   cy.get('[id="language-selector"]').click();
  //   cy.get('[id="fr"]').click();
  // });

  // it("Should Show French", () => {
  //   isFrench();
  // });

  it("Should Change Language back to English", () => {
    cy.get("#language-selector").click();
    cy.get("#en").click();
  });

  it("Should Show English again", () => {
    isEnglish();
  });
});
