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
import { loggedIn, loggedInAs, loggedOut } from '@christianacca/angular-swa-auth-e2e-util';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
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
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
