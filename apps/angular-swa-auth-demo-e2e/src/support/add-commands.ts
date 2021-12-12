// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@testing-library/cypress/add-commands';
import { ByRoleOptions } from '@testing-library/dom/types/queries';
import { findByRole } from './commands';
import { loggedIn, loggedInAs, loggedOut } from './commands/auth-library';
import Chainable = Cypress.Chainable;

type FindByRoleType = (options: ByRoleOptions | string) => Chainable<JQuery<Element>>;

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      button: FindByRoleType;
      heading: FindByRoleType;
      link: FindByRoleType;
      loggedIn: typeof loggedIn;
      loggedInAs: typeof loggedInAs;
      loggedOut: typeof loggedOut;
    }
  }
}

//
// -- This is a parent command --
Cypress.Commands.add('loggedIn', loggedIn);
Cypress.Commands.add('loggedInAs', loggedInAs);
Cypress.Commands.add('loggedOut', loggedOut);
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
Cypress.Commands.add('button', { prevSubject: 'optional' }, findByRole('button'));
Cypress.Commands.add('heading', { prevSubject: 'optional' }, findByRole('heading'));
Cypress.Commands.add('link', { prevSubject: 'optional' }, findByRole('link'));
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
