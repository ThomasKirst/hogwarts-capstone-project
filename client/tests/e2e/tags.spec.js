/// <reference types="Cypress" />

describe('<Tags /> component', () => {
  it('should render', () => {
    cy.visit('/products/add-product');
    cy.get('input[name=tags]').should('exist');
  });
});
