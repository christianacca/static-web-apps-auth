import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser } from '../../fixtures/authenticated-user';
import { assertAuthEventSentByBeacon, stubSendBeacon } from '../../support/commands/auth-library';
import * as mainMenuPo from '../../support/pages/main-menu.po';

describe('logout', () => {
  it('should log user out and send log out event', function () {
    // given
    cy.loginAs(authenticatedUser);
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });
    mainMenuPo.loginMenuItem().should('not.exist'); // check assumption

    //when
    mainMenuPo.logoutMenuItem().click();

    // then...
    mainMenuPo.loginMenuItem().should('exist');
    assertAuthEventSentByBeacon(AuthEvent.logout(authenticatedUser));
  });
});
