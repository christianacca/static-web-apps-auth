# Static Web Apps Authentication

This repo is the home to the npm package [@christianacca/angular-swa-auth](https://www.npmjs.com/package/@christianacca/angular-swa-auth)

The repo includes the following projects:

* the [library](libs/angular-swa-auth/README.md) itself
* a [demo app](apps/angular-swa-auth-demo) for the library
* another [simple demo app](apps/angular-swa-auth-nolib) that does NOT require the <code>angular-swa-auth</code> helper library to implement authentication

The demo apps and a documentation site for the library are all deployed as Azure static web apps:

* library documentation: <https://docs.angular-swa-auth.codingdemo.co.uk>
* library demo app: <https://angular-swa-auth.codingdemo.co.uk>
* alternative "no-library" demo app: <https://angular-swa-auth-nolib.codingdemo.co.uk>

---

# Development guide

## Dev machine setup

1. Install [nodejs](https://nodejs.org/en/) (LTS version)
2. Clone the source code: `git clone https://github.com/christianacca/static-web-apps-auth`
3. Install dependencies - run `npm install`
4. Install tooling required by your IDE:
   - VSC: 
      - [recommended extensions](.vscode/extensions.json)
      - [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools#installing)
   - Rider:
      - [Azure Toolkit for Rider](https://plugins.jetbrains.com/plugin/11220-azure-toolkit-for-rider)
      - Azure Functions Core Tools (goto Preferences then Tools > Azure > Functions)

## Run demo app

### Command line

Run backend api (terminal 1):
```bash
cd ./api
npm start
```

Run front-end (terminal 2):
```bash
npm run start:swa
```

Notes:
* Navigate to <http://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files

### VS Code

1. Press `F5`. This will launch Chrome at <http://localhost:4820/>.
2. You will need to wait 10-20 seconds to refresh the browser page.

Notes:
* The front-end will automatically reload if you change any of it's source files 
* Making changes to the api will require re-running
* You can set breakpoints in the IDE in both the front-end and api code

### Jetbrains Rider

`Run > Run > "start: demo"` OR `Run > Debug > "start: demo"`

Notes:
* Navigate to <http://localhost:4820/>
* The front-end or api will automatically reload if you change any of their source files
* You can set breakpoints in the IDE in the api code only

## Serve doc site

```bash
npm run doc:serve
```

## Deploy

The demo apps and library document site are deployed as Azure static web apps:

* library documentation: 
  * [Github workflow](.github/workflows/azure-static-web-apps-polite-flower-0685e8810.yml)
  * [Azure portal](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-docs/providers/Microsoft.Web/staticSites/angular-swa-auth-docs/staticsite)
* library demo app:
  * [Github workflow](.github/workflows/azure-static-web-apps-witty-mushroom-090fbbe10.yml)
  * [Azure portal](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-demo/providers/Microsoft.Web/staticSites/angular-swa-auth-demo/staticsite)
* alternative "no-library" demo app:
  * [Github workflow](.github/workflows/azure-static-web-apps-proud-water-05af79a10.yml)
  * [Azure portal](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-nolib/providers/Microsoft.Web/staticSites/angular-swa-auth-nolib/staticsite)

On every PR:

* Document and demo app sites will be deployed to a pre-prod staging environment 
  * note: github bot will add a comment to the PR with the url to the new staging environment
* Dry run publish of the library package to npm

On push to master:

* Document and demo app sites will be deployed to an prod environment
* Publish of the library package to npm where the version in [package.json](libs/angular-swa-auth/package.json) is different to the versions already published to npm

## Releasing a new version

1. Bump the version of the library in the [package.json](libs/angular-swa-auth/package.json) file (follow semver)
2. Add details of the changes ('Added', 'Fixes', 'Breaking Changes') to the library [CHANGELOG.md](libs/angular-swa-auth/CHANGELOG.md)
3. Push changes as a commit directly to master of submit a PR to merge to master
