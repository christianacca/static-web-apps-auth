describe('angular-swa-auth-demo', () => {
  // todo: use cy.session api to perform login once per fixture file(s)

  beforeEach(() => cy.visit('/'));

  it('should display about page', () => {
    cy.url().should('include', '/about');
  });
});
