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
* Navigate to <http://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files


To run the "no-library" demo app:

```bash
npm run start:api
npm run start:swa angular-swa-auth-demo # <- in another terminal
```

### Using VS Code

1. Press `F5`. This will launch Chrome at <http://localhost:4820/>.
2. You will need to wait 10-20 seconds to refresh the browser page.

Notes:
* The front-end will automatically reload if you change any of it's source files
* Making changes to the api will require re-running
* You can set breakpoints in the IDE in both the front-end and api code

### Using Jetbrains Rider

`Run > Run 'start: demo'` OR `Run > Debug 'start: demo'`

Notes:
* Navigate to <http://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files
* You can set breakpoints in the IDE in the api code only

## Serve compodoc doc site

```bash
# serve
npx nx serve-compodoc angular-swa-auth
# serve and reload browser when source code changes
npx nx watch-compodoc angular-swa-auth
```

Navigate to <http://localhost:8080/>

## Serve storybook site

```bash
npx nx storybook angular-swa-auth
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
npx nx e2e angular-swa-auth-demo-e2e --opts='--watch' # <- `opts=...` is a non-standard way of supplying
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
6. Bump the version of the library in package.json for the library (eg: [package.json](libs/angular-swa-auth/package.json)); make sure to follow semver
7. Add details of the changes ('Added', 'Fixes', 'Breaking Changes') to the library CHANGELOG.md (eg: [CHANGELOG.md](libs/angular-swa-auth/CHANGELOG.md))
8. Submit a PR to merge to master

### Changes to demo apps

The following process should be used whenever creating a new page or substantially modifying an existing one.
(note: inspiration for this process see <https://blog.hichroma.com/component-driven-development-ce1109d56c8e)>

1. If you are creating a "top level" page (usually a page that is expected to be routed to from a menu), create a new lazy loaded feature library
  - See [add-library.md](add-library.md)
2. Design phase: identify the components of the page (usually this is one container component for the page and 0..many presentation components)
3. Start storybook app: `npx nx storybook {public|shared|app}-{library-name}`
  - e.g. `npx nx storybook angular-swa-auth`
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
  3. Create Cypress test for the container and the page interactions to test the various states of the page.

## Add a new library

See guide: [add-library.md](add-library.md)

## Further help

- [Nx Documentation](https://nx.dev)
- [Nx Article](https://blog.ng-book.com/getting-started-with-nx-the-nrwl-extensions-for-angular/)
