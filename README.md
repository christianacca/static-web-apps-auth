# Static Web Apps Authentication

## Overview

This repo is the home to the npm package [@christianacca/angular-swa-auth](https://www.npmjs.com/package/@christianacca/angular-swa-auth)

This project was generated using [Nx](https://nx.dev)

The repo includes the following projects:
* the [library](libs/angular-swa-auth/README.md) itself
* a [demo app](apps/angular-swa-auth-demo) for the library
* another [simple demo app](apps/angular-swa-auth-nolib) that does NOT require the <code>angular-swa-auth</code> helper library to implement authentication

## Setup

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
