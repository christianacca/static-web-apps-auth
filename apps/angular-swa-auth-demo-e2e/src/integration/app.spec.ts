import * as po from '../support/pages/index.po';

describe('angular-swa-auth-demo', () => {
  // todo: use cy.session api to perform login once per fixture file(s)

  beforeEach(po.visit);

  it('should display about page', () => {
    cy.url().should('include', '/about');
    cy.findByRole('heading', { name: 'Overview' }).should('exist');
    cy.findByRole('heading', { name: 'Resources' }).should('exist');
  });
});
