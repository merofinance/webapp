import "@percy/cypress";

export const percySnapshot = () => {
  cy.wait(200);
  cy.percySnapshot();
};
