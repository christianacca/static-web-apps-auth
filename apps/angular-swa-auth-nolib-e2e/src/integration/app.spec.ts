describe('angular-swa-auth-nolib', () => {
  beforeEach(() => {
    cy.loggedIn();
  });

  it('should be logged in', () => {
    cy.visit('/');

    cy.contains('Welcome');
  });
});
