import { getGreeting } from '../support/app.po';

describe('angular-swa-auth-nolib', () => {
  beforeEach(() => cy.visit('/'));

  it('should display login page', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    cy.url().should('include', '/login');
  });
});
