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
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("not.exist");
    cy.get('[id="header.tabs.more-dropdown-button"]').click();
    cy.get('[id="header.tabs.more-dropdown-options"]').should("be.visible");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("exist");
    cy.get('[id="header.tabs.more-dropdown-docs-option"]').contains("docs");
    cy.get('[id="header.tabs.more-dropdown-blog-option"]').contains("blog");
    cy.get('[id="header.tabs.more-dropdown-newsletter-option"]').contains("newsletter");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').click();
    cy.get('[id="header.tabs.more-dropdown-options"]').should("not.be.visible");
    cy.get('[id="header.tabs.more-dropdown-exit-event"]').should("not.exist");
  });
});

describe("Benefits", () => {
  it("Should have Avoid Liquidation Benefit", () => {
    cy.get('[id="benefits.reactiveLiquidity.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/actions");
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefits.earnYield.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/pools");
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefits.feeShare.header"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/tokenomics");
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
      .should("have.attr", "href", "https://twitter.com/backdfund");
  });

  it("Should have Telegram Link", () => {
    cy.get('[id="joinCommunity.socials.github"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/backdfund");
  });
});

describe("Statistics", () => {
  it("Should show TVL", () => {
    cy.get("#hero-statistics-tvl", { timeout: WEB3_TIMEOUT }).should("exist");
    cy.get("#hero-statistics-tvl").contains("$");
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
      .should("have.attr", "href", "https://twitter.com/backdfund");
  });

  it("Should have GitHub Link", () => {
    cy.get('[id="footer.community.links.github"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/backdfund");
  });

  it("Should have Telegram Chat Link", () => {
    cy.get('[id="footer.community.links.telegram"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/backdchat");
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
      .should("have.attr", "href", "https://docs.backd.fund/");
  });

  it("Should have Blog Link", () => {
    cy.get('[id="footer.resources.links.blog"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backdfund.medium.com/");
  });

  it("Should have Newsletter Link", () => {
    cy.get('[id="footer.updates.links.newsletter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backd.substack.com/welcome");
  });

  it("Should have Telegram Announcements Link", () => {
    cy.get('[id="footer.updates.links.telegram"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/backdfund");
  });
});

describe("Percy", () => {
  it("Should Screenshot Landing Page", () => {
    percySnapshot();
  });
});
