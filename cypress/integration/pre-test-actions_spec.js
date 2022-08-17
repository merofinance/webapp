import { initWeb3, WEB3_TIMEOUT } from "../support";

describe("Pre test actions", () => {
  it("Should setup wallet and sent crypto", () => {
    cy.writeFile("data.json", { privateKey: null });
    initWeb3("/");
  });
  it("Should wait for crypto to send", () => {
    cy.wait(WEB3_TIMEOUT * 2);
  });
});
