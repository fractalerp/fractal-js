[![Node.js CI](https://github.com/fractalerp/fractal-js/actions/workflows/ci.yml/badge.svg)](https://github.com/fractalerp/fractal-js/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/486b143d9023a951f36d/maintainability)](https://codeclimate.com/github/fractalerp/fractal-js/maintainability)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@fractalerp/fractal-js)](https://libraries.io/npm/@fractalerp%2Ffractal-js)
[![Vulnerabilities](https://snyk.io/test/github/fractalerp/fractal-js/badge.svg)](https://snyk.io/test/github/fractalerp/fractal-js)
![Node 11](https://img.shields.io/badge/node-11.5.x-green.svg)
![Npm 6](https://img.shields.io/badge/npm-6.4.x-green.svg)
![Webpack 5](https://img.shields.io/badge/webpack-5.20.2-green.svg)
[![codecov](https://codecov.io/gh/fractalerp/fractal-js/branch/main/graph/badge.svg)](https://codecov.io/gh/fractalerp/fractal-js)
[![Coverage Status](https://coveralls.io/repos/github/fractalerp/fractal-js/badge.svg?branch=main)](https://coveralls.io/github/fractalerp/fractal-js?branch=main)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/fractalerp/fractal-js/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Eslint](https://img.shields.io/badge/eslint_rules-%5E9.9.0-ff69b4.svg?style=flat-square)](https://eslint.org)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffractalerp%2Ffractal-js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffractalerp%2Ffractal-js?ref=badge_shield)
[![MIT](https://img.shields.io/badge/mit-blue.svg)](http://opensource.org/licenses/mit)

# FRACTAL JS
A component based framework for NodeJs Applications

## 🧩 Architecture
<img src="./architecture.png" width="500" >

We are creating a structure for developing large scalable, maitanable Nodejs applications. We mash up ideas from component based architecture, MVC, Entity Framework and Repository Pattern. We want different teams to focus on creating their domain apps in the components with ease. 

## ⚙️ How to run the project
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI. This framework also uses fractalerp [Active Record Js](https://github.com/fractalerp/active-record-js) for defining models.

1. Create the following environment variables in your node project.
```env
RDBMS_DATABASE_URI="mysql://DATBASE_USER:DATABASE_PASSWORD@DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_URI="mongodb://DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_ADAPTER="mongodb"
```

2. Then you can create your `nodejs` apps in the `components` folder. The projects in that folder are autoloaded at run time. See the sample `Task` project in the same folder. A proper documentation will be provided in the future. Also tools will be provided to create this structure. Refer to the github project management dashboard to see what is coming up.

## 🫶 Projects using this framework
See the projects using this framework in action.
- [Fractalerp core](https://github.com/fractalerp/fractal-core)

## 🪲 Issues, suggestions and feature requests
We are actively maintaining this boilerplate, please report any issues or suggestion for improvement at https://github.com/fractalerp/fractal-js/issues

## 👨‍💻 Development

To contribute, fork and clone.

    > git clone https://github.com/fractalerp/fractal-js.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

To automatically compile, bundle and push code changes to the running test project, run:

    > npm start

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm run test:unit

Run the unit test continuously during development:

    > npm run test:dev

## Scripts
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Build the project and monitor source and config for changes and rebuild. Start the dev server|
|`watch`|Build the project and monitor source and config for changes and rebuild.|
|`prod:server:start`|starts the application in production as daemon and restart it in case of crashes|
|`prod:server:stop`|stop an instance of the application running|
|`emit`|Output javascript code|
|`test`|Runs lint, build, unit tests with mocha and generates a coverage report|
|`test:dev`|Runs mocha and watches for changes to re-run tests; does not generate coverage reports.|
|`test:unit`|Runs unit tests with mocha and generates a coverage report.|
|`build:release`|Build app optimized for production|
|`build:development`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

