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
import { button, link, loggedIn, loggedInAs } from './commands';
import Chainable = Cypress.Chainable;

type FindByRoleType = (options: ByRoleOptions) => Chainable<JQuery<Element>>;

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      button: FindByRoleType;
      link: FindByRoleType;
      login: typeof loggedIn;
      loginAs: typeof loggedInAs;
    }
  }
}

//
// -- This is a parent command --
Cypress.Commands.add('login', loggedIn);
Cypress.Commands.add('loginAs', loggedInAs);
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
Cypress.Commands.add('button', { prevSubject: 'optional' }, button);
Cypress.Commands.add('link', { prevSubject: 'optional' }, link);
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
