import { initWeb3 } from "../support";

describe("Pre test actions", () => {
  it("Should setup wallet and sent crypto", () => {
    cy.writeFile("data.json", { privateKey: null });
    initWeb3("/");
  });
  it("Should wait for crypto to send", () => {
    cy.wait(60_000);
  });
});
