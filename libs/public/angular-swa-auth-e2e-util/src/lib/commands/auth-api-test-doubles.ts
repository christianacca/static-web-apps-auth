import { ClientPrincipal } from '@christianacca/angular-swa-auth';
import { authenticatedUser } from '../fixtures/authenticated-user';

const aliasKeys = {
  getUserSpy: 'getUserSpy',
  getUserStub: 'getUserStub',
  getUserRequest: 'getUserRequest',
  sendBeaconStub: 'sendBeaconStub'
};
type Aliases = Record<keyof typeof aliasKeys, string>;
export const aliases: Aliases = Object.keys(aliasKeys).reduce(
  (acc, key) => ({ ...acc, [key]: `@${key}` }),
  {} as Aliases
);

const getUserUrl = '.auth/me';
export const spyOnGetUser = () => cy.intercept(getUserUrl, cy.spy().as(aliasKeys.getUserSpy));

type GetUserOptions = {
  user?: ClientPrincipal | null;
  delay?: number;
};
export const stubGetUser = ({ user, delay }: GetUserOptions = {}) => {
  const stub = cy
    .stub()
    .as(aliasKeys.getUserStub)
    .callsFake(req =>
      req.reply({
        body: { clientPrincipal: user === undefined ? authenticatedUser : user },
        delay
      })
    );
  return cy.intercept(getUserUrl, stub).as(aliasKeys.getUserRequest);
};

export const loggedIn = stubGetUser;
export const loggedOut = () => stubGetUser({ user: null });

export const loggedInAs = (userInfo: Partial<ClientPrincipal>) =>
  stubGetUser({ user: { ...authenticatedUser, ...userInfo } });

const fakeLogoutRedirect = () =>
  cy.intercept(/.auth\/logout/, req => {
    const clientSidePath = req.query.post_logout_redirect_uri;
    const url = clientSidePath ? `${Cypress.config().baseUrl}${clientSidePath}` : `${Cypress.config().baseUrl}`;
    req.redirect(url);
  });

const fakePurgeRedirect = () =>
  cy.intercept('.auth/purge/*', req => {
    req.redirect(`${Cypress.config().baseUrl}`);
  });

const fakeLoginHtmlPage = () =>
  cy.intercept(`.auth/login/**`, {
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fake Page</title>
</head>
<body>
  <h1>Fake login page!</h1>
</body>
</html>
`
  });

export const fakeStaticWebAppAuth = () => {
  stubGetUser({ user: null });
  fakeLoginHtmlPage();
  fakeLogoutRedirect();
  fakePurgeRedirect();
};

interface SendBeaconStubOptions {
  returns?: boolean;
}
export const stubSendBeacon = (win: Cypress.AUTWindow, { returns }: SendBeaconStubOptions = {}) =>
  cy
    .stub(win.navigator, 'sendBeacon')
    .as(aliasKeys.sendBeaconStub)
    .returns(returns ?? true);
