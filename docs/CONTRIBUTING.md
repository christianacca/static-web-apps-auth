# Contributing to this repo

1. Make sure to have followed the "Run demo app locally" section of the main repo [README.md](/README.md)
2. Install tooling required by your IDE
  - VSC:
    - [recommended extensions](.vscode/extensions.json)
    - [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools#installing)
  - Rider:
    - [Azure Toolkit for Rider](https://plugins.jetbrains.com/plugin/11220-azure-toolkit-for-rider)
    - Azure Functions Core Tools (goto Preferences then Tools > Azure > Functions)
    - Prettier plugin (enable option to format on save)
3. Use the **Developer workflow** steps below whenever making contributions, and submit a PR for the change

## Understand your workspace

Run `npx nx dep-graph --groupByFolder`, then select the button "Select All" to see a diagram of the dependencies of your projects

## Run demo app

### Using command line

```bash
npm run start:demo
```

Notes:
* Navigate to <https://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files


To run the "no-library" demo app:

```bash
npm run start:api
npm run start:swa angular-swa-auth-demo # <- in another terminal
```

### Using VS Code

1. Press `F5`. This will launch Chrome at <https://localhost:4820/>.
2. You will need to wait 10-20 seconds to refresh the browser page.

Notes:
* The front-end will automatically reload if you change any of it's source files
* Making changes to the api will require re-running
* You can set breakpoints in the IDE in both the front-end and api code

### Using Jetbrains Rider

`Run > Run 'start: demo'` OR `Run > Debug 'start: demo'`

Notes:
* Navigate to <https://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files
* You can set breakpoints in the IDE in the api code only

## Serve compodoc doc site

```bash
# serve
npx nx compodoc public-angular-swa-auth --serve
# serve and reload browser when source code changes
npx nx compodoc public-angular-swa-auth --watch
```

Navigate to <http://localhost:8080/>

## Serve storybook site

```bash
npx nx storybook public-angular-swa-auth
```

## Lint code changes

```bash
npx nx affected:lint --parallel --uncommitted
```

## Build code changes

```bash
npx nx affected:build --uncommitted
```

## Run cypress tests

```bash
# run in watch mode
npx nx e2e angular-swa-auth-demo-e2e --opts='--watch'
npx nx e2e angular-swa-auth-nolib-e2e --opts='--watch'

# run all affected by a change
npx nx affected:e2e --uncomitted --opts="--headless"
```

Note: `--opts='...'` is a non-standard way of supplying options to the e2e command. 
Ordinarily you would supply them like so:  `npx nx affected:e2e --uncomitted --headless`

## Developer workflow

### Changes to public library

1. Make the change
2. Ensure any new method/class/function/etc has adequate jsdocs describing the symbol
   * Serve compodoc doc site to review these jsdoc comments
3. If there is a change to a ui element, serve storybook site to verify functionality. Modify stories as necessary
4. Add/modify existing cypress test to cover the change being made
5. Run linting to ensure code change confirms to project conventions
6. Bump the version of the library in package.json for the library (eg: [package.json](libs/public/angular-swa-auth/package.json)); make sure to follow semver
7. Add details of the changes ('Added', 'Fixes', 'Breaking Changes') to the library CHANGELOG.md (eg: [CHANGELOG.md](libs/public/angular-swa-auth/CHANGELOG.md))
8. Submit a PR to merge to master

### Changes to demo apps

The following process should be used whenever creating a new page or substantially modifying an existing one.
(note: inspiration for this process see <https://blog.hichroma.com/component-driven-development-ce1109d56c8e)>

1. If you are creating a "top level" page (usually a page that is expected to be routed to from a menu), create a new lazy loaded feature library
   - See [add-library.md](add-library.md)
2. Design phase: identify the components of the page (usually this is one container component for the page and 0..many presentation components)
3. Start storybook app: `npx nx storybook {public|shared|app}-{library-name}`
   - e.g. `npx nx storybook public-angular-swa-auth`
4. Create presentation components. Work bottom up from the smallest/nested unit of the page. For each component:
   1. create a new storybook file - this will act as the container for the presentation component whilst developing
   2. create the initial storybook for the component. For this initial storybook follow conventions so that the story appears in the storybook UI:
      - under a group named after the library
      - as a "root" menu item ie cannot be expanded/collapsed
   3. for a shared library component add more stories for each "state" of the component (enumerate the interesting combinations of input property values)
5. Extract reusable angular components, directives, or pipes
   - any time use see a repeating piece of code or - probably because you just copy pasted it ;-) - try and extract this into a component, or pipe or directive.
   - where these units of functionality are not specific to any particular page, add them to the `{app}/common-ui` lib
   - where these units of functionality are not specific to one particular application, but are not universal to MRI, add them to `shared/common-ui` lib
6. Create the container component for the page
   1. assemble the presentation components and bind them to the business and data access logic
   2. extract data access and business logic into suitable abstractions leaving the container component as an orchestrator.
      - Such abstractions include: domain models, view models, services, pure functions, rxjs operators and ngrx selectors, reducers, and effects
      - For guidance on adding a domain model and data access services see [add-domain-model.md](add-domain-model.md)
   3. Create Cypress test for the container and the page interactions to test the various states of the page (see guide below for this)

## Cypress test workflow

The following describes the recommended workflow for adding automated tests.

### Team process (ideal: QA and dev working in parallel)

1. Dev: Initial main success path. Dev iterates between:
   - implementing code
   - adding cypress tests
   - refactor tests to remove duplicate and improve readability
2. Dev: open PR and message QA that main success path is implemented with test cases
3. Dev: dev to walk QA through tests written thus far, pointing out any dev work left remaining (eg alternate success paths and exception paths)
4. QA: review tests for completeness and accuracy; adds more tests as necessary (consider pair programming; commit changes asap):
   - tests missed by dev
   - boundary conditions and edge cases
5. Dev: implement remaining code for alternative and exception paths. Dev iterates between:
   - implementing code
   - adding cypress tests
6. Dev: inform QA that PR is dev done
7. QA: further review tests for completeness and accuracy and duplication. Makes changes necessary to complete test suite

### Team process (QA after dev)

In practice QA resource might not be able to work in parallel on tests whilst dev works on feature
   - QA resource might not be immediately available at steps 3-4 above
   - there is a high level of fluidity in the implementation such that QA working in parallel with dev would cause merge hell

In that case the process changes to:

1. Dev: iterates between:
   - implementing code
   - adding cypress tests
   - refactor tests to remove duplicate and improve readability
2. Dev: open PR and message QA that dev done
3. QA: review tests and makes changes necessary to complete test suite:
   - tests missed by dev
   - boundary conditions and edge cases
   - refactor tests to remove duplicate and improve readability

### Demo of process

The example more for testing an app than a library. Where you are adding tests for a library (the auth library in this case), you will be less focused
on the page under test, but rather the features of the library that page happens to exercise.

1. Add initial test to confirm page loads
   - usually this will be a deep link with the user having already been logged in
   - the test will fail until you've added the page
   - assert that the page loads (eg test that you can find the container component by testid)
2. Add the container along with it's route
   - Confirm that the initial test passes
3. Assemble the presentation components on the page
   - Use the initial test as your _dev environment_ to visually confirm your work
4. Fill in the details of the initial test to assert that the state of the page is what the user would expect. EG:
   - Buttons are disabled/enabled
   - Details of the entity(s) are displayed and used to populate form fields
5. Write the basics of another test for an action the user can perform on the page
   - Ensure this is the only test that is running by adding `.only` to the test
6. Repeat for the next user action on the page
7. De-dup the tests:
   - extract page object functions where you see selectors being repeated
   - use beforeEach to setup the common Arrange/Given part of the test
   - extract repeating assertions into functions
      - include these at the top of spec file if they don't need to be shared by multiple specs
      - include these in a fixture folder where they are shared by multiple specs
8. Iterate on steps 6-7 for the remaining main success paths


## Add a new library

See guide: [add-library.md](add-library.md)

## Further help

- [Nx Documentation](https://nx.dev)
- [Nx Article](https://blog.ng-book.com/getting-started-with-nx-the-nrwl-extensions-for-angular/)
