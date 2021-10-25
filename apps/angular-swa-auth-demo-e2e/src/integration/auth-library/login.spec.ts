import { managedIdentityProviders } from '@christianacca/angular-swa-auth';
import { assertRedirectedToIdp, spyOnGetUser, stubSendBeacon } from '../../support/commands/auth-library';
import * as identityProviderSelectorPo from '../../support/pages/identity-provider-selector.po';
import * as mainMenuPo from '../../support/pages/main-menu.po';

declare global {
  namespace Mocha {
    // noinspection JSUnusedGlobalSymbols
    export interface Context {
      currentUrl: string;
    }
  }
}

describe('login', () => {
  beforeEach(() => {
    // given
    spyOnGetUser();
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        stubSendBeacon(win);
      }
    });
    cy.url().as('currentUrl');
  });

  afterEach(() => {
    // verify that multiple subscriptions to AuthService.currentUser$ only result in one call to the server
    cy.get('@getUserSpy').should('have.been.calledOnce');
    // verify that before a successful login no auth events will be sent to api
    cy.get('@sendBeaconStub').should('not.have.been.called');
  });

  context('identity provider not pre-selected', () => {
    it('should prompt user to select identity provider', function () {
      // when
      mainMenuPo.loginMenuItem().click();

      // then
      identityProviderSelectorPo.component();
    });

    context('identity provider prompt open', () => {
      // given
      beforeEach(() => {
        mainMenuPo.loginMenuItem().click();
      });

      it('user selects identity provider, should redirect browser to identity provider', function () {
        const idp = managedIdentityProviders.github;

        // when
        identityProviderSelectorPo.option(idp).click();

        // then
        assertRedirectedToIdp(idp, { redirectUrl: this.currentUrl });
      });

      it('user dismisses the prompt without selection, should leave user on current page', function () {
        // when
        identityProviderSelectorPo.closeButton().click();

        // then
        cy.url().should('have.string', this.currentUrl);
      });
    });
  });

  context('identity provider pre-selected', () => {
    it('should redirect browser to identity provider', function () {
      // when
      mainMenuPo.loginWithGitHubMenuItem().click();

      // then
      assertRedirectedToIdp(managedIdentityProviders.github, { redirectUrl: this.currentUrl });
    });
  });
});
