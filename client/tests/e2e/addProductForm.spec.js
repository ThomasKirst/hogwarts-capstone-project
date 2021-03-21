/// <reference types="Cypress" />

describe('<ProductForm />', () => {
  beforeEach(() => {
    cy.request('http://localhost:4000/api/prune-database');

    cy.viewport('ipad-2');
    cy.visit('/');
    cy.get('[href="/products"]').first().click();
    cy.get('[href="/products/add-product"').click();
  });
  it('should render', () => {
    cy.get('[data-testid="add-product-form"]').should('be.visible');
  });
  it('should fill in the form properly', () => {
    const product = {
      name: 'ElderWand',
      price: 200,
      currency: 'Sickle',
      category: 'Magical artifacts',
      packageSize: 'M',
      tags: ['Wand', 'Magic', 'Core of gold'],
      supportContact: 'olivander-wands@mail.wiz',
      onSale: false,
    };

    cy.get('[name="name"]').type(product.name);

    cy.get('[name="price"]').type(product.price);

    cy.get('[name="currency"]').select(product.currency);

    cy.get('[name=category]').select(product.category);

    cy.get('[name=packageSize').check(product.packageSize);

    cy.get('[name=supportContact]').type(product.supportContact);

    product.tags.forEach((tag) =>
      cy.get('[name="tags"]').type(tag).type('{enter}')
    );

    product.onSale && cy.get('[name="onSale"]').check();

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="form-error-display"]').should('not.exist');

    cy.get('[href="/products/all"]').click();

    cy.get('[data-testid="product-card"]').contains(product.name);
  });

  it('should display an error field when the form entry is not valid', () => {
    cy.get('[name="name"]').type('Dummy product');

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="form-error-display"]').should('be.visible');
  });
});
