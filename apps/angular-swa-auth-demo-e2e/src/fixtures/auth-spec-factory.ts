import { ClientPrincipal, managedIdentityProviders } from '@christianacca/angular-swa-auth';
import { assertRedirectedToIdp } from '../support/commands/auth-library';
import * as aboutPo from '../support/pages/about.po';
import * as identityProviderSelectorPo from '../support/pages/identity-provider-selector.po';
import { authenticatedUser } from './authenticated-user';

export interface AuthRoutingSpecParameters {
  menuLink: () => Cypress.Chainable<JQuery<Element>>;
  targetUrl: string;
  contextLabel: string;
  loginWith?: Partial<ClientPrincipal>;
}

export function AuthSpecSuitFactory({ menuLink, targetUrl, contextLabel, loginWith }: AuthRoutingSpecParameters) {
  context(contextLabel, () => {
    context('not logged in, routing to a guarded route', () => {
      // given
      beforeEach(aboutPo.visit);

      it('should prompt user to select identity provider', () => {
        // when
        menuLink().click();

        // then
        identityProviderSelectorPo.component();
      });

      context('identity provider prompt open', () => {
        beforeEach(() => {
          // given
          menuLink().click();
        });

        it('once user logs in, should redirect to guarded route', () => {
          const idp = managedIdentityProviders.github;

          // when
          identityProviderSelectorPo.option(idp).click();

          // then
          assertRedirectedToIdp(idp, { redirectUrl: `${Cypress.config().baseUrl}${targetUrl}` });
        });

        it('user dismisses the prompt without selection, should leave user on current page', function () {
          // when
          identityProviderSelectorPo.closeButton().click();

          // then
          cy.url().should('have.string', aboutPo.url);
        });
      });
    });

    context('not logged in, deep linking to a guarded route', () => {
      it('should prompt user to select identity provider', () => {
        // when
        cy.visit(targetUrl);

        // then
        identityProviderSelectorPo.component();
      });

      context('identity provider prompt open', () => {
        // given
        beforeEach(() => {
          cy.visit(targetUrl);
        });

        it('once user logs in, should redirect to guarded route', () => {
          const idp = managedIdentityProviders.github;

          // when
          identityProviderSelectorPo.option(idp).click();

          // then
          assertRedirectedToIdp(idp, { redirectUrl: `${Cypress.config().baseUrl}${targetUrl}` });
        });

        it('user dismisses the prompt without selection, should leave user on app shell', function () {
          // when
          identityProviderSelectorPo.closeButton().click();

          // then
          cy.url().should('equal', `${Cypress.config().baseUrl}/`);
        });
      });
    });

    context('logged in', () => {
      // given
      beforeEach(() => {
        cy.loginAs(loginWith ?? authenticatedUser);
      });

      it('routing to a guarded route, should allow navigation without prompting to login', () => {
        // given
        aboutPo.visit();

        // when
        menuLink().click();

        // then
        cy.url().should('have.string', targetUrl);
      });

      it('deep linking to a guarded route, should allow navigation without prompting to login', () => {
        // when
        cy.visit(targetUrl);

        // then
        cy.url().should('have.string', targetUrl);
      });
    });
  });
}
