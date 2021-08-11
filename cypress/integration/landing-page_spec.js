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
    cy.get('[id="benefit - Avoid Liquidation"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/top-ups");
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefit - Earn Yield"] > a')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/protocol-architecture/pools");
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefit - Fee Share"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://docs.backd.fund/protocol-architecture/top-ups/backd-keepers"
      );
  });
});

describe("How it Works", () => {
  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Earn Yield");
    cy.get('[id="How It Works - 03"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
  });

  it("Should Chang to Earn & Protect Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn & Protect Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Register Loan on-Chain");
    cy.get('[id="How It Works - 03"]').contains("Protect & Earn");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
  });

  it("Should Chang to Earn Yield Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Earn Yield");
    cy.get('[id="How It Works - 03"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
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
    cy.get('[id="Join Community - Discord →"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://discord.gg/jpGvaFV3Rv");
  });

  it("Should have Twitter Link", () => {
    cy.get('[id="Join Community - Twitter →"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://twitter.com/backdfund");
  });

  it("Should have Telegram Link", () => {
    cy.get('[id="Join Community - GitHub →"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/backdfund");
  });
});

describe("Footer", () => {
  it("Should have Discord Link", () => {
    cy.get('[id="Footer - Discord"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://discord.gg/jpGvaFV3Rv");
  });

  it("Should have Twitter Link", () => {
    cy.get('[id="Footer - Twitter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://twitter.com/backdfund");
  });

  it("Should have GitHub Link", () => {
    cy.get('[id="Footer - GitHub"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://github.com/backdfund");
  });

  it("Should have Telegram Chat Link", () => {
    cy.get('[id="Footer - Telegram Chat"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/backdchat");
  });

  it("Should have Litepaper Link", () => {
    cy.get('[id="Footer - Litepaper"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "/litepaper");
  });

  it("Should have Docs Link", () => {
    cy.get('[id="Footer - Docs"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/");
  });

  it("Should have Blog Link", () => {
    cy.get('[id="Footer - Blog"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backdfund.medium.com/");
  });

  it("Should have Blog Fact Sheet", () => {
    cy.get('[id="Footer - Fact Sheet"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "/fact-sheet.pdf");
  });

  it("Should have Newsletter Link", () => {
    cy.get('[id="Footer - Newsletter"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backd.substack.com/welcome");
  });

  it("Should have Telegram Announcements Link", () => {
    cy.get('[id="Footer - Telegram Ann."]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://t.me/backdfund");
  });
});
