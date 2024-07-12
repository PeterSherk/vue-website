# Vue Website Information
## Background
My personal website is a place where I can play around with new and exciting technologies. I chose [Vue](https://vuejs.org/) as a frontend stack due to receiving exposure to mostly Angular at work, and a reluctance to pick up React as the only exposure I've had to it has been mostly negative. Vue blends the flexibility of React with what I believe to be a better organizational structure and layout that I am used to with Angular.

## Prerequisites
This project relies on having NPM installed on your machine. It's recommended to download NVM first and then install npm through that. If you are on Mac, you can install NVM easily through [Homebrew](https://formulae.brew.sh/formula/nvm).

This project has been tested using Node version `v20.12.2`. You can install it with NVM using `nvm install v20.12.2`. Once downloaded, you can activate it using `nvm use`, as the [.nvmrc](.nvmrc) file denotes which version to use.

## Setup
- Run `npm ci` to download dependencies to `node_modules`.

## Running
To run the development server, run `npm run dev`. This will run the Vue service on `http://localhost:8080/`

## Linting
You can automatically lint the files using `eslint` by running `npm run lint`

## Building
To build the serve into a deployment bundle, run `npm run build`. This will generate a `dist` folder containing a production bundle.

## Caveats
If deploying on a 32-bit OS like Raspbian OS, keep in mind that Cypress, which is used for e2e testing, will not be able to download as [it supports only 64-bit systems](https://docs.cypress.io/guides/getting-started/installing-cypress#Operating-System). Attempting an `npm ci` or `npm install` will fail in this case. To navigate around this issue, prepend your npm commands with `CYPRESS_INSTALL_BINARY=0`. For instance, the following command will do a full `npm install` avoiding downloading the Cypress binaries.

```shell
CYPRESS_INSTALL_BINARY=0 npm install
```
