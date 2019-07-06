[![Build Status](https://travis-ci.org/datopian/datapackage-views-js.svg?branch=master)](https://travis-ci.org/datopian/datapackage-views-js)  [![Coverage Status](https://coveralls.io/repos/github/datopian/datapackage-views-js/badge.svg?branch=master)](https://coveralls.io/github/datopian/datapackage-views-js?branch=master)

# datapackage-views-js
Welcome to datapackage-views-js, a views library for frictionless data and ckan data resources.

## Development
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
More [below](https://github.com/datopian/datapackage-views-js/blob/master/README.md#cra)

- `yarn start` will compile tailwind css, run the app at `localhost:3000`, and watch for changes in your source files (hot reload)
- `yarn dev` will compile tailwind css, run the app at `localhost:3000`, run cosmos at `localhost:8989`, and watch for changes

**To see the app populated with views run `yarn dev` and visit `localhost:8989`**

## cosmos
We are using [cosmos](https://github.com/react-cosmos/) to mock datasets and test components.

To run cosmos:
- `yarn install`
- `yarn cosmos`

[Add fixtures](https://github.com/react-cosmos/react-cosmos#fixtures) to `./__fixtures`

To generate fixtures run `yarn fixtures`.
This will run [makedatasets.js](https://github.com/datopian/datapackage-views-js/blob/master/makedatasets.js) which uses [data.js](#) to generate `datapackage.json` files used as App fixtures by cosmos.

## tailwindcss
We are using tailwindcss for styling. More on [tailwind css here](https://tailwindcss.com/)

## cra

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
