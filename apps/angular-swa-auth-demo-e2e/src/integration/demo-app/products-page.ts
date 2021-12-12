import * as po from '../../support/pages/products.po';

describe('Products', () => {
  beforeEach(() => {
    cy.loggedIn();
    po.visit();
  });

  it('should display product list', function () {
    cy.heading('Product(s)').should('exist');
    cy.findByText('Strawberry(s)');
  });
});
