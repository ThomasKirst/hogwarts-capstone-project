/// <reference types="Cypress" />

const CLIENT_URL = 'http://localhost:3000';
const SERVER_URL = 'http://localhost:4000';

describe('<Wishlist /> Page', () => {
  beforeEach(() => {
    cy.request(SERVER_URL + '/api/prune-database');

    cy.viewport(800, 1200);

    cy.fixture('productOne').then((json) => {
      cy.request('POST', SERVER_URL + '/api/products', json);
    });

    cy.fixture('productTwo').then((json) => {
      cy.request('POST', SERVER_URL + '/api/products', json);
    });

    cy.visit(CLIENT_URL + '/');
  });

  it('creates a new wishlist for a customer', () => {
    cy.get('[href="/products').last().click();
    cy.get('[href="/products/all"]').click();

    cy.url().should('include', 'products/all');

    cy.get('[data-testid="product-card"]')
      .first()
      .find('[data-testid="favorite-button"]')
      .click()
      .should('have.attr', 'data-isfavorite', 'isFavorite');

    cy.get('[href="/wishlist"]').click();
    cy.get('[data-testid="product-card"]').should('have.length', 1);
  });

  it('adds an additional product to the wishlist', () => {
    cy.visit('/products/all');

    cy.get('[data-testid="product-card"]')
      .first()
      .find('[data-testid="favorite-button"]')
      .click()
      .should('have.attr', 'data-isfavorite', 'isFavorite');

    cy.get('[data-testid="product-card"]')
      .last()
      .find('[data-testid="favorite-button"]')
      .click()
      .should('have.attr', 'data-isfavorite', 'isFavorite');

    cy.get('[href="/wishlist"]').click();
    cy.get('[data-testid="product-card"]').should('have.length', 2);
  });

  it('should remove a favorite item from the wishlist when the user tries to add it a second time', () => {
    cy.visit('/products/all');

    cy.get('[data-testid="product-card"]')
      .first()
      .find('[data-testid="favorite-button"]')
      .click()
      .should('have.attr', 'data-isfavorite', 'isFavorite')
      .click()
      .should('have.attr', 'data-isfavorite', '');

    cy.get('[href="/wishlist"]').click();
    cy.get('[data-testid="product-card"]').should('have.length', 0);
  });
});
