describe("Innitial Load", () => {
  it("Should Load Home Page", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Benefits", () => {
  it("Should have Avoid Liquidation Benefit", () => {
    cy.get('[id="benefit - Avoid Liquidation"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefit - Earn Yield"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefit - Fee Share"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });
});
