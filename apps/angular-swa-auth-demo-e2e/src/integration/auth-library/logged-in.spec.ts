import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser as user } from '../../fixtures/authenticated-user';
import { aliases, assertAuthEventSentByBeacon, stubSendBeacon } from '@christianacca/angular-swa-auth-e2e-util';

describe('logged in state', () => {
  beforeEach(() => {
    cy.loggedInAs(user);
  });

  afterEach(() => {
    // verify that multiple subscriptions to AuthService.currentUser$ only result in one call to the server
    cy.get(aliases.getUserStub).should('have.been.calledOnce');
  });

  it('initial application load', function () {
    // when (visit a page that makes at least one call to AuthService.currentUser$)
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });

    // then...

    // user details returned from server
    cy.findByTestId('user').within(() => {
      cy.findByText(user.identityProvider);
      cy.findByText(user.userDetails);
    });

    cy.get(aliases.sendBeaconStub).should('have.been.calledOnce');
    assertAuthEventSentByBeacon(AuthEvent.login(user));
  });
});
