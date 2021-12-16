# public-angular-swa-auth-e2e-util

Helper library for faking Azure Static Web App authentication endpoints in a cypress test project

## Usage

### 1. Install library

```bash
npm install @christianacca/angular-swa-auth-e2e-util -D
```

### 2. Wire-up to support files

In your cypress test project include the following code in the support files:

```ts
// support/add-commands.ts

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
```

```ts
// support/global-before-each.ts

import { fakeStaticWebAppAuth } from '@christianacca/angular-swa-auth-e2e-util';

beforeEach(fakeStaticWebAppAuth);
```

```ts
// support/index.ts

import './add-commands';
import './global-before-each';
```

### 3. Fake login in your tests

```ts
describe('app', () => {
  context('user logged in', () => {
    beforeEach(() => {
      cy.loggedIn();
    });

    it('...', () => {
      cy.visit('/');

      // snip
    });
  });
});

```
