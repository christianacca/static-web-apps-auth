export const mockWebpackSocket = () => {
  const webpackSocketResponse = {
    websocket: true,
    origins: ['*:*'],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cookie_needed: false,
    entropy: 2559964930
  };
  cy.intercept(/\/sockjs-node\/info\?t=\S+/, webpackSocketResponse);
};
