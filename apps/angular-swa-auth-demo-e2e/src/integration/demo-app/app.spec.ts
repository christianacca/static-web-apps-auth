import * as po from '../../support/pages/index.po';

describe('landing', () => {
  beforeEach(po.visit);

  it('should display about page', function () {
    cy.url().should('include', '/about');
    cy.heading('Overview').should('exist');
    cy.heading('Resources').should('exist');
  });
});
