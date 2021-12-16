import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser } from '../../fixtures/authenticated-user';
import { signupMarkerKey } from '../../fixtures/sut-constants';
import { aliases, assertAuthEventSentByBeacon, stubSendBeacon } from '@christianacca/angular-swa-auth-e2e-util';

describe('signed up state', () => {
  beforeEach(() => {
    // given
    cy.loggedInAs(authenticatedUser);
    cy.window().then(win => {
      win.sessionStorage.setItem(signupMarkerKey, '1');
    });
  });

  it('should send signed-up and login auth events', function () {
    // when
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });

    // then...
    cy.get(aliases.sendBeaconStub).should('have.been.calledTwice');
    assertAuthEventSentByBeacon(AuthEvent.login(authenticatedUser));
    assertAuthEventSentByBeacon(AuthEvent.signUp(authenticatedUser));
    cy.window().should(win => {
      const marker = win.sessionStorage.getItem(signupMarkerKey);
      expect(marker).be.null;
    });
  });
});
