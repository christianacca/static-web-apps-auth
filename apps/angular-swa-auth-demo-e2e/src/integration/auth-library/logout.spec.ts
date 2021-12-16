import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser as user } from '../../fixtures/authenticated-user';
import { assertAuthEventSentByBeacon, stubSendBeacon } from '@christianacca/angular-swa-auth-e2e-util';
import * as mainMenuPo from '../../support/pages/main-menu.po';

describe('logout', () => {
  it('should log user out and send log out event', function () {
    // given
    cy.loggedInAs(user);
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });
    mainMenuPo.loginMenuItem().should('not.exist');
    cy.loggedOut();

    //when
    mainMenuPo.logoutMenuItem().click();

    // then...
    mainMenuPo.loginMenuItem().should('exist');
    assertAuthEventSentByBeacon(AuthEvent.logout(user));
  });
});
