[![Build Status](https://travis-ci.org/fractalerp/fractal-js.svg?branch=master)](https://travis-ci.org/fractalerp/fractal-js)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/fractalerp/fractal-js.svg?style=flat-square)](https://codeclimate.com/github/fractalerp/fractal-js)
[![Dependency Status](https://david-dm.org/fractalerp/fractal-js.svg)](https://david-dm.org/fractalerp/fractal-js)
[![Dev Dependency Status](https://david-dm.org/fractalerp/fractal-js.svg#info=devDependencies)](https://david-dm.org/fractalerp/fractal-js#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/fractalerp/fractal-js.svg)](https://snyk.io/test/github/fractalerp/fractal-js)
![Node 11](https://img.shields.io/badge/node-11.5.x-green.svg)
![Npm 6](https://img.shields.io/badge/npm-6.4.x-green.svg)
![Webpack 5](https://img.shields.io/badge/webpack-5.20.2-green.svg)
[![codecov](https://codecov.io/gh/fractalerp/fractal-js/branch/master/graph/badge.svg)](https://codecov.io/gh/fractalerp/fractal-js)
[![Coverage Status](https://coveralls.io/repos/github/fractalerp/fractal-js/badge.svg?branch=master)](https://coveralls.io/github/fractalerp/fractal-js?branch=master)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/fractalerp/fractal-js/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Tslint Latest](https://img.shields.io/badge/tslint_rules-latest-ff69b4.svg?style=flat-square)](https://github.com/buzinas/tslint-eslint-rules)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmistaguy%2Fment.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmistaguy%2Fment?ref=badge_shield)
[![Apache License, Version 2.0](https://img.shields.io/badge/License-mit-blue.svg)](http://opensource.org/licenses/MIT)

# FRACTAL JS
A component based framework for NodeJs Applications

## Architecture
<img src="./architecture.png" width="500" >

We are creating a structure for developing large scalable, maitanable Nodejs applications. We mash up ideas from component based architecture, MVC, Entity Framework and Repository Pattern. We want different teams to focus on creating their domain apps in the components with ease. Fractal Js comes with authentication out of the box based on JWT

## Issues, suggestions and feature requests
We are actively maintaining this boilerplate, please report any issues or suggestion for improvement at https://github.com/fractalerp/fractal-js/issues

## Development and contribution
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI

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

Run the end to end test during development:

    > npm run test:e2e:dev

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
|`build:prod`|Build app optimized for production|
|`build:dev`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

