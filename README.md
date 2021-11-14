# Static Web Apps Authentication

## Overview

This repo is the home to the npm package [@christianacca/angular-swa-auth](https://www.npmjs.com/package/@christianacca/angular-swa-auth)

The repo includes the following projects:

* the [library](libs/angular-swa-auth/README.md) itself
* a [demo app](apps/angular-swa-auth-demo) for the library
* another [simple demo app](apps/angular-swa-auth-nolib) that does NOT require the <code>angular-swa-auth</code> helper library to implement authentication

The demo apps and documentation sites are available here:

* library documentation: 
  - [reference](https://docs.angular-swa-auth.codingdemo.co.uk)
  - [storybook examples](https://stories.angular-swa-auth.codingdemo.co.uk)
* [library demo app](https://angular-swa-auth.codingdemo.co.uk)
* [alternative "no-library" demo app](https://angular-swa-auth-nolib.codingdemo.co.uk)


## Run demo app locally

1. Install [nodejs](https://nodejs.org/en/) (LTS version)
2. Clone the source code: `git clone https://github.com/christianacca/static-web-apps-auth`
3. Trust the dev HTTPS certificate (see note below on security caveats):
  - windows: double click batch file ./tools/dev-scripts/trust-cert.bat and accept any prompts
  - mac/linux: From powershell, run ./tools/dev-scripts/trust-cert.ps1
4. Install dependencies: `npm install`
5. `npm run start:demo` then browse to <https://localhost:4820/>

### Security caveats when trusting the dev cert

This demo tries to play nicely with best practice of always using TLS even for local development.
To make this as frictionless as possible, this repo contains a [self-signed cert](tools/certs) which needs to be trusted for the browser
to accept the content of the demo site served over https for localhost. Yay for convenience!

However, this might pose a security risk (?). If you are concerned with this, then the advice is to re-generate the certificate
using the following script BEFORE trusting the cert: [generate-dev-certificate.md](docs/generate-dev-certificate.md).

This regenerated cert will only be local to your machine as it will not be committed back to this git repo.

## Deploy

The demo apps and library document site are deployed to Azure static web apps:

* [library reference documentation](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-docs/providers/Microsoft.Web/staticSites/angular-swa-auth-docs/staticsite)
* [library storybook documentation](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourcegroups/angular-swa-auth-stories/providers/Microsoft.Web/staticSites/angular-swa-auth-stories/staticsite)
* [library demo app](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-demo/providers/Microsoft.Web/staticSites/angular-swa-auth-demo/staticsite)
* [alternative "no-library" demo app](https://portal.azure.com/#@christiancrowhurstgmail.onmicrosoft.com/resource/subscriptions/44835aa1-a779-412a-8225-7422ff9a4f33/resourceGroups/angular-swa-auth-nolib/providers/Microsoft.Web/staticSites/angular-swa-auth-nolib/staticsite)

On every PR:

* Documentation and demo app sites will be deployed to a pre-prod staging environment 
  * note: github bot will add a comment to the PR with the url to the new staging environment
* Dry run publish of the library package to npm

On push to master:

* Documentation and demo app sites will be deployed to an prod environment
* Publish of the library package to npm where the version in [package.json](libs/angular-swa-auth/package.json) is different to the versions already published to npm

## Contributing

[CONTRIBUTING.md](docs/CONTRIBUTING.md): developer guide if you intend to make changes in this repo

## Other guides

* Create your own library repo: [create-initial-repo](docs/create-initial-repo.md)
* Generating a new dev HTTPS certificate: [generate-dev-certificate.md](docs/generate-dev-certificate.md)
