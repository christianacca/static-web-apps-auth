import { ClientPrincipal } from '@christianacca/angular-swa-auth';

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
  user?: ClientPrincipal;
  delay?: number;
};
export const stubGetUser = ({ user, delay }: GetUserOptions = {}) => {
  const stub = cy
    .stub()
    .as(aliasKeys.getUserStub)
    .callsFake(req =>
      req.reply({
        body: { clientPrincipal: user === undefined ? null : user },
        delay
      })
    );
  return cy.intercept(getUserUrl, stub).as(aliasKeys.getUserRequest);
};

interface SendBeaconStubOptions {
  returns?: boolean;
}
export const stubSendBeacon = (win: Cypress.AUTWindow, { returns }: SendBeaconStubOptions = {}) =>
  cy
    .stub(win.navigator, 'sendBeacon')
    .as(aliasKeys.sendBeaconStub)
    .returns(returns ?? true);
