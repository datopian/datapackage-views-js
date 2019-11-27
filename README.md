[![Build Status](https://travis-ci.org/datopian/datapackage-views-js.svg?branch=master)](https://travis-ci.org/datopian/datapackage-views-js)
[![Coverage Status](https://coveralls.io/repos/github/datopian/datapackage-views-js/badge.svg?branch=master)](https://coveralls.io/github/datopian/datapackage-views-js?branch=master)
[![npm version](https://badge.fury.io/js/%40datopian%2Fdatapackage-views-js.svg)](https://badge.fury.io/js/%40datopian%2Fdatapackage-views-js)

Welcome to `datapackage-views-js`, a views library for frictionless data and CKAN data resources.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `yarn start` will compile tailwind css, run the app at `localhost:3000`, and watch for changes in your source files (hot reload)
- `yarn dev` will compile tailwind css, run the app at `localhost:3000`, run cosmos at `localhost:8989`, and watch for changes

**To see the app populated with views run `yarn dev` and visit `localhost:8989`**

- `yarn build:package` will use babel to compile the package to /dist for distribution

### Cosmos

We are using [cosmos](https://github.com/react-cosmos/) to mock datasets and test components.

To run cosmos:

- `yarn install`
- `yarn cosmos`

[Add fixtures](https://github.com/react-cosmos/react-cosmos#fixtures) to `./__fixtures`.

### Tailwindcss

We are using tailwindcss for styling. More on [tailwind css here](https://tailwindcss.com/)
