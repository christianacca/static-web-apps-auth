import { AuthEvent } from '@christianacca/angular-swa-auth';
import { authenticatedUser as user } from '../../fixtures/authenticated-user';
import { assertAuthEventSentByBeacon, stubSendBeacon } from '../../support/commands/auth-library';
import * as mainMenuPo from '../../support/pages/main-menu.po';

describe('purge', () => {
  it('should log user out and send purge event', function () {
    // given...
    cy.loggedInAs(user);
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });
    mainMenuPo.loginMenuItem().should('not.exist');
    cy.loggedOut();

    //when
    mainMenuPo.purgeMenuItem().click();

    // then...
    mainMenuPo.loginMenuItem().should('exist');
    assertAuthEventSentByBeacon(AuthEvent.purge(user));
  });
});
