import { percySnapshot, WEB3_TIMEOUT } from "../support";

describe("Innitial Load", () => {
  it("Should Load Home Page", () => {
    cy.visit("/");
  });
});

describe("Nav Items", () => {
  it("Should have pools tab", () => {
    cy.get('[id="header.tabs.pools"]').contains("pools");
    cy.get('[id="header.tabs.pools"]').click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/pools");
    });
    cy.visit("/");
  });
  it("Should have actions tab", () => {
    cy.get('[id="header.tabs.actions"]').contains("actions");
  });
  it("Should have claim tab", () => {
    cy.get('[id="header.tabs.claim"]').contains("claim");
  });
  it("Should have more tab", () => {
    cy.get('[id="header.tabs.more-dropdown-label"]').contains("more");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("not.be.visible");
    cy.get('[id="header.tabs.more-dropdown-button"]').click();
    cy.get('[id="header.tabs.more-dropdown-options"]').should("be.visible");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("be.visible");
    cy.get('[id="header.tabs.more-dropdown-docs-option"]').contains("docs");
    cy.get('[id="header.tabs.more-dropdown-blog-option"]').contains("blog");
    cy.get('[id="header.tabs.more-dropdown-newsletter-option"]').contains("newsletter");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').click();
    cy.get('[id="header.tabs.more-dropdown-options"]').should("not.be.visible");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("not.be.visible");
  });
});

describe("Benefits", () => {
  it("Should have Avoid Liquidation Benefit", () => {
    cy.get('[id="benefits.reactiveLiquidity.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.mero.finance/protocol-architecture/actions");
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefits.earnYield.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.mero.finance/protocol-architecture/pools");
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefits.feeShare.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.mero.finance/protocol-architecture/tokenomics");
  });
});

describe("How it Works", () => {
  it("Should Show Earn & Protect Options", () => {
    cy.get("#how-it-works-0").contains("Deposit Liquidity");
    cy.get("#how-it-works-1").contains("Register Loan on-Chain");
    cy.get("#how-it-works-2").contains("Protect & Earn");
    cy.get("#how-it-works-3").contains("Unstake Any Time");
  });

  it("Should Change to Earn Yield Tab", () => {
    cy.get("#radio-option-earn").click();
  });

  it("Should Change to Earn & Protect Tab", () => {
    cy.get("#radio-option-protect").click();
  });
});

describe("Supported By", () => {
  it("Should have Curve Link", () => {
    cy.get("#supported-by-curve")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://curve.fi/");
  });

  it("Should have Aave Link", () => {
    cy.get("#supported-by-aave")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "http://aave.com/");
  });
});

describe("Join The Community", () => {
  it("Should have Discord Link", () => {
    cy.get('[id="joinCommunity.socials.discord"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://discord.gg/jpGvaFV3Rv");
  });

  it("Should have Twitter Link", () => {
    cy.get('[id="joinCommunity.socials.twitter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://twitter.com/merofinance");
  });

  it("Should have Telegram Link", () => {
    cy.get('[id="joinCommunity.socials.github"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/merofinance");
  });
});

describe("Statistics", () => {
  it("Should show TVL", () => {
    cy.get("#hero-statistics-tvl", { timeout: WEB3_TIMEOUT }).should("exist");
    cy.get("#hero-statistics-tvl").contains("$");
  });
});

describe("Pool Preview", () => {
  // it("Should load dai Pool", () => {
  //   cy.get("#pool-row-merodai", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-merodai-apy", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-merodai-apy", { timeout: WEB3_TIMEOUT }).contains("%");
  //   cy.get("#pool-row-merodai-tvl", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-merodai-tvl").contains("$", { timeout: WEB3_TIMEOUT });
  // });
  it("Should load usdc Pool", () => {
    cy.get("#pool-row-merousdc", { timeout: WEB3_TIMEOUT }).should("be.visible");
    cy.get("#pool-row-merousdc-apy", { timeout: WEB3_TIMEOUT }).should("be.visible");
    cy.get("#pool-row-merousdc-apy", { timeout: WEB3_TIMEOUT }).contains("%");
    cy.get("#pool-row-merousdc-tvl", { timeout: WEB3_TIMEOUT }).should("be.visible");
    cy.get("#pool-row-merousdc-tvl").contains("$", { timeout: WEB3_TIMEOUT });
  });
  // it("Should load eth Pool", () => {
  //   cy.get("#pool-row-meroeth", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-meroeth-apy", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-meroeth-apy", { timeout: WEB3_TIMEOUT }).contains("%");
  //   cy.get("#pool-row-meroeth-tvl", { timeout: WEB3_TIMEOUT }).should("be.visible");
  //   cy.get("#pool-row-meroeth-tvl").contains("$", { timeout: WEB3_TIMEOUT });
  // });
});

describe("Percy", () => {
  it("Should Screenshot Landing Page", () => {
    percySnapshot();
  });
});

describe("Footer", () => {
  it("Should have Discord Link", () => {
    cy.get('[id="footer.community.links.discord"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://discord.gg/jpGvaFV3Rv");
  });

  it("Should have Twitter Link", () => {
    cy.get('[id="footer.community.links.twitter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://twitter.com/merofinance");
  });

  it("Should have GitHub Link", () => {
    cy.get('[id="footer.community.links.github"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/merofinance");
  });

  it("Should have Telegram Chat Link", () => {
    cy.get('[id="footer.community.links.telegram"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/merofinance");
  });

  it("Should have Litepaper Link", () => {
    cy.get('[id="footer.resources.links.litepaper"]').click();
    cy.location().should((loc) => {
      if (loc.pathname) expect(loc.pathname).to.eq("/litepaper");
    });
    cy.visit("/");
  });

  it("Should have Docs Link", () => {
    cy.get('[id="footer.resources.links.docs"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.mero.finance/");
  });

  it("Should have Blog Link", () => {
    cy.get('[id="footer.resources.links.blog"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://merofinance.medium.com/");
  });

  it("Should have Newsletter Link", () => {
    cy.get('[id="footer.updates.links.newsletter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://merofinance.substack.com/welcome");
  });

  it("Should have Telegram Announcements Link", () => {
    cy.get('[id="footer.updates.links.telegram"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/meroannouncements");
  });
});
