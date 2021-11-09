import { ByRoleMatcher } from '@testing-library/dom';
import { ByRoleOptions } from '@testing-library/dom/types/queries';

const findByRole = (id: ByRoleMatcher) => (element: Cypress.Chainable<JQuery<Element>>, options: ByRoleOptions) =>
  cy.wrap(element).findByRole(id, options);

export const button = findByRole('button');
export const link = findByRole('link');
