export const fakeProducts = () =>
  cy.intercept('GET', '/api/products', {
    fixture: 'products.json'
  });

export const fakeAuthEvents = () =>
  cy.intercept('POST', '/api/authevents', {
    statusCode: 201
  });

export const fakeServer = () => {
  fakeProducts();
  fakeAuthEvents();
};
