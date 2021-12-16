import { AllowedRole, AuthEvent, flattenAllowedRoles, IdentityProviderInfo } from '@christianacca/angular-swa-auth';
import { aliases } from './auth-api-test-doubles';

export const assertAuthEventSentByBeacon = (evt: AuthEvent) => {
  const payload = AuthEvent.toAuthEventPayload(evt);
  const { match: M } = Cypress.sinon;
  cy.get(aliases.sendBeaconStub).should('have.been.calledWith', M.string, M(JSON.stringify(payload)));
};

export const assertRedirectedToIdp = (idp: IdentityProviderInfo, { redirectUrl }: { redirectUrl: string }) => {
  const idpUrl = `.auth/login/${idp.id}?post_login_redirect_uri=${redirectUrl}`;
  return cy.url().should('have.string', idpUrl);
};

export const assertRoutedToUnauthorized = ({ allowedRoles }: { allowedRoles: AllowedRole[] }) => {
  cy.url().should(rawUrl => {
    const url = new URL(rawUrl);
    expect(url.pathname).to.eq('/unauthorized');
    expect(url.searchParams.getAll('allowedRoles')).to.deep.eq(flattenAllowedRoles(allowedRoles));
  });
};
