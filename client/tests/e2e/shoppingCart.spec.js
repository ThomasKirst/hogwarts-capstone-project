/// <reference types="Cypress" />

const CLIENT_URL = 'http://localhost:3000';
const SERVER_URL = 'http://localhost:4000';

describe('<ShoppingCart />', () => {
  beforeEach(() => {
    cy.request(SERVER_URL + '/api/prune-database');

    cy.fixture('productOne').then((json) => {
      cy.request('POST', SERVER_URL + '/api/products', json);
    });

    cy.fixture('productTwo').then((json) => {
      cy.request('POST', SERVER_URL + '/api/products', json);
    });

    cy.visit(CLIENT_URL + '/');
  });

  it('creates a new shopping cart for a customer', () => {
    cy.visit('/products/all');

    cy.get('[data-testid="category_1"').click();
    cy.contains('Add to cart').click();

    cy.get('[href="/cart"]').click();
    cy.get('[data-testid="orderItem"]').should('contain', 'Feuerblitz');
  });
});
