describe("Innitial Load", () => {
  it("Should Load Litepaper Page", () => {
    cy.visit("/litepaper");
  });
});

describe("Page Content", () => {
  it("Should have header", () => {
    cy.get("h1").contains("Backd Litepaper");
  });
});

describe("Percy", () => {
  it("Should Screenshot Litepaper Page", () => {
    cy.percySnapshot();
  });
});
