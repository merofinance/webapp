import "@percy/cypress";

export const percySnapshot = () => {
  // This delay is to give time for animations to finish before taking screenshots
  // We had some flakiness before from animations still being in progress
  cy.wait(2000);
  cy.percySnapshot();
};
