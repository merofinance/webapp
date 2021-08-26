import "@percy/cypress";

export const percySnapshot = () => {
  cy.wait(500);
  cy.percySnapshot();
};
