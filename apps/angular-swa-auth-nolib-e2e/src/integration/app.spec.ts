import { getGreeting } from '../support/app.po';

describe('angular-swa-auth-nolib', () => {
  beforeEach(() => cy.visit('/'));

  it('should display login page', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // todo: use new cy.session api to perform login once per fixture file

    cy.url().should('include', '/login');
  });
});
