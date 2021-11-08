export const spyOnGetUser = () => cy.intercept('.auth/me', cy.spy().as('getUserSpy'));

interface SendBeaconStubOptions {
  returns?: boolean;
}
export const stubSendBeacon = (win: Cypress.AUTWindow, { returns }: SendBeaconStubOptions = {}) =>
  cy
    .stub(win.navigator, 'sendBeacon')
    .as('sendBeaconStub')
    .returns(returns ?? true);
