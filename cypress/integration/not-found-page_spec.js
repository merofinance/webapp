import { percySnapshot, WEB3_TIMEOUT } from "../support";

describe("Innitial Load", () => {
  it("Should Load Not Found Page", () => {
    cy.visit("/askkasklaslkaskjl");
  });
});

describe("Page Content", () => {
  it("Should have number", () => {
    cy.get("#not-found-number").contains("404");
  });

  it("Should have header", () => {
    cy.get("h1").contains("Page could not be found.");
  });
});

describe("Internal Links", () => {
  it("Should Navigate to Home Page", () => {
    cy.get("#not-found-home").click();
    cy.location().should(
      (loc) => {
        if (loc.pathname) expect(loc.pathname).to.eq("/");
      },

      { timeout: WEB3_TIMEOUT }
    );
    cy.visit("/askkasklaslkaskjl");
  });

  // We can uncomment these when the protocol is live

  // it("Should Navigate to Pools Page", () => {
  //   cy.get("#not-found-pools").click();
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq("/pools");
  //   });
  //   cy.visit("/askkasklaslkaskjl");
  // });

  // it("Should Navigate to Claim Page", () => {
  //   cy.get("#not-found-claim").click();
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq("/claim");
  //   });
  //   cy.visit("/askkasklaslkaskjl");
  // });
});

describe("External Links", () => {
  it("Should Have Support Link", () => {
    cy.get("#not-found-support")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://discord.gg/jpGvaFV3Rv");
  });

  it("Should Have Docs Link", () => {
    cy.get("#not-found-docs")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/");
  });
});

describe("Percy", () => {
  it("Should Screenshot Not Found Page", () => {
    percySnapshot();
  });
});
