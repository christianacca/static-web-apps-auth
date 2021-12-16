import { ByRoleMatcher } from '@testing-library/dom';
import { ByRoleOptions } from '@testing-library/dom/types/queries';

export const findByRole =
  (id: ByRoleMatcher) => (element: Cypress.Chainable<JQuery<Element>>, optionsOrName: ByRoleOptions | string) => {
    const options = typeof optionsOrName === 'string' ? { name: optionsOrName } : optionsOrName;
    return cy.wrap(element).findByRole(id, options);
  };
