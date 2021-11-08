import { ClientPrincipal } from '@christianacca/angular-swa-auth';
import { authenticatedUser } from '../../../fixtures/authenticated-user';

const SWA_AUTH_COOKIE_NAME = 'StaticWebAppsAuthCookie';

export const loggedIn = () => cy.setCookie(SWA_AUTH_COOKIE_NAME, window.btoa(JSON.stringify(authenticatedUser)));

export const loggedInAs = (userInfo: Partial<ClientPrincipal>) =>
  cy.setCookie(SWA_AUTH_COOKIE_NAME, window.btoa(JSON.stringify({ ...authenticatedUser, ...userInfo })));
