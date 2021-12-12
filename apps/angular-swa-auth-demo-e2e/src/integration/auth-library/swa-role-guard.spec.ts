import { AllowedRole, flattenAllowedRoles } from '@christianacca/angular-swa-auth';
import { RoutePermissions } from '@christianacca/angular-swa-auth-demo/core';
import { AuthRoutingSpecParameters, AuthSpecSuitFactory } from '../../fixtures/auth-spec-factory';
import { assertRoutedToUnauthorized } from '../../support/commands/auth-library';
import * as aboutPo from '../../support/pages/about.po';
import * as adminAreaLandingPo from '../../support/pages/admin-area-landing.po';
import * as mainMenuPo from '../../support/pages/main-menu.po';
import * as offersPo from '../../support/pages/offers.po';

interface AuthzRoutingSpecParameters extends Omit<AuthRoutingSpecParameters, 'targetPageAssert'> {
  allowedRoles: AllowedRole[];
}

describe('SwaRoleGuard', () => {
  // SwaRoleGuard also triggers sign-in if not already authenticated...
  const authSpecParams: AuthRoutingSpecParameters[] = [
    {
      menuLink: mainMenuPo.offersMenuItem,
      targetUrl: offersPo.url,
      contextLabel: 'lazy loaded route',
      loginWith: {
        userRoles: [flattenAllowedRoles(RoutePermissions.offers)[0]]
      },
      // make sure to wait for expected http calls to be finished before allowing test to complete...
      targetPageAssert: () => cy.findByText('Strawberry(s)').should('exist')
    },
    {
      menuLink: mainMenuPo.adminAreaMenuItem,
      targetUrl: adminAreaLandingPo.url,
      contextLabel: 'non-lazy loaded route',
      loginWith: {
        userRoles: [flattenAllowedRoles(RoutePermissions.adminArea)[0]]
      },
      targetPageAssert: () => cy.heading('Product admin').should('exist')
    }
  ];

  authSpecParams.forEach(AuthSpecSuitFactory);

  const unauthorizedSpecParams: AuthzRoutingSpecParameters[] = [
    {
      menuLink: mainMenuPo.offersMenuItem,
      targetUrl: offersPo.url,
      contextLabel: 'lazy loaded route',
      allowedRoles: RoutePermissions.offers
    },
    {
      menuLink: mainMenuPo.adminAreaMenuItem,
      targetUrl: adminAreaLandingPo.url,
      contextLabel: 'non-lazy loaded route',
      allowedRoles: RoutePermissions.adminArea
    }
  ];

  unauthorizedSpecParams.forEach(({ menuLink, targetUrl, contextLabel, allowedRoles }: AuthzRoutingSpecParameters) => {
    context(contextLabel, () => {
      // given
      beforeEach(cy.loggedIn);

      context('logged in with insufficient permissions, routing to a guarded route', () => {
        it('should route to unauthorized page', () => {
          // given
          aboutPo.visit();

          // when
          menuLink().click();

          // then
          assertRoutedToUnauthorized({ allowedRoles });
        });
      });

      context('logged in with insufficient permissions, deep linking to a guarded route', () => {
        it('should route to unauthorized page', () => {
          // when
          cy.visit(targetUrl);

          // then
          assertRoutedToUnauthorized({ allowedRoles });
        });
      });
    });
  });
});
