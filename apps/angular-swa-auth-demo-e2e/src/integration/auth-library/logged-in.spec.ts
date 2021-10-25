import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser } from '../../fixtures/authenticated-user';
import { assertAuthEventSentByBeacon, spyOnGetUser, stubSendBeacon } from '../../support/commands/auth-library';

describe('logged in state', () => {
  beforeEach(() => {
    spyOnGetUser();

    cy.loginAs(authenticatedUser);
  });

  afterEach(() => {
    // verify that multiple subscriptions to AuthService.currentUser$ only result in one call to the server
    cy.get('@getUserSpy').should('have.been.calledOnce');
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
      cy.findByText(authenticatedUser.identityProvider);
      cy.findByText(authenticatedUser.userDetails);
    });

    cy.get('@sendBeaconStub').should('have.been.calledOnce');
    assertAuthEventSentByBeacon(AuthEvent.login(authenticatedUser));
  });
});
