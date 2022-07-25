import { percySnapshot } from "../support";

describe("Innitial Load", () => {
  it("Should Load Litepaper Page", () => {
    cy.visit("/litepaper");
  });
});

describe("Page Content", () => {
  it("Should have header", () => {
    cy.get("h1").contains("Mero Litepaper");
  });
});

describe("Percy", () => {
  it("Should Screenshot Litepaper Page", () => {
    percySnapshot();
  });
});
