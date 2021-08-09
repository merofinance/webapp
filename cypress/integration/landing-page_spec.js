describe("Innitial Load", () => {
  it("Should Load Home Page", () => {
    cy.visit("/");
  });
});

describe("Nav Items", () => {
  it("Should only have one nav item", () => {
    cy.get('[id="nav-items"]').children().should("have.length", 1);
  });
});

describe("Benefits", () => {
  it("Should have Avoid Liquidation Benefit", () => {
    cy.get('[id="benefits.avoidLiquidation.header"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/collateral-top-ups-through-backd-781bfd0edf4c"
      );
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefits.earnYield.header"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/yield-farming-on-backd-c80141cef836"
      );
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefits.feeShare.header"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/becoming-a-backd-keeper-2d81133e0a9d"
      );
  });
});

describe("How it Works", () => {
  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 0"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 1"]').contains("Earn Yield");
    cy.get('[id="How It Works - 2"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 3"]').contains("Unstake Any Time");
  });

  it("Should Chang to Earn & Protect Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn & Protect Options", () => {
    cy.get('[id="How It Works - 0"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 1"]').contains("Register Loan on-Chain");
    cy.get('[id="How It Works - 2"]').contains("Protect & Earn");
    cy.get('[id="How It Works - 3"]').contains("Unstake Any Time");
  });

  it("Should Change to Earn Yield Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 0"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 1"]').contains("Earn Yield");
    cy.get('[id="How It Works - 2"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 3"]').contains("Unstake Any Time");
  });
});

describe("Supported By", () => {
  it("Should have Divergence Link", () => {
    cy.get('[id="Supported By - Divergence"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://www.div.vc/");
  });

  it("Should have Curve Link", () => {
    cy.get('[id="Supported By - Curve"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://curve.fi/");
  });

  it("Should have Aave Link", () => {
    cy.get('[id="Supported By - Aave"]')
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
    cy.get('[id="footer.resources.links.litepaper"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "/litepaper");
  });

  it("Should have Blog Link", () => {
    cy.get('[id="footer.resources.links.blog"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backdfund.medium.com/");
  });

  it("Should have Blog Fact Sheet", () => {
    cy.get('[id="footer.resources.links.factSheet"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "/fact-sheet.pdf");
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
