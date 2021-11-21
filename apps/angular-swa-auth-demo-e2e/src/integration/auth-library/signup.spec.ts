import { managedIdentityProviders } from '@christianacca/angular-swa-auth';
import { signupMarkerKey } from '../../fixtures/sut-constants';
import { stubSendBeacon } from '../../support/commands/auth-library';
import * as identityProviderSelectorPo from '../../support/pages/identity-provider-selector.po';
import * as mainMenuPo from '../../support/pages/main-menu.po';

describe('signup', () => {
  beforeEach(() => {
    // given
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });
  });

  afterEach(() => {
    // signup event is sent only after a successful authentication; in this way we only send the auth event to the api
    // as an authenticated request that can be trusted by the server
    cy.get('@sendBeaconStub').should('not.have.been.called');
  });

  it('should set signing up marker', function () {
    // when
    mainMenuPo.signupMenuItem().click();
    identityProviderSelectorPo.option(managedIdentityProviders.github).click();

    // then
    cy.window().should(win => {
      const marker = win.sessionStorage.getItem(signupMarkerKey);
      expect(marker).not.to.be.null.and.not.undefined;
    });
  });
});
