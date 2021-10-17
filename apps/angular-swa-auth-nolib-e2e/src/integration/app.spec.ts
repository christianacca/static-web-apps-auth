describe('angular-swa-auth-nolib', () => {
  // todo: use cy.session api to perform login once per fixture file(s)

  beforeEach(() => cy.visit('/'));

  it('should display login page', () => {
    cy.url().should('include', '/login');
  });
});
