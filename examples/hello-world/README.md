# FRACTAL JS HELLO WORLD
This is the most minimal starter for your [Fractal Js](https://github.com/fractalerp/fractal-js) project.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fractalerp/fractal-js/tree/main/examples/hello-world&project-name=hello-world&repository-name=hello-world)

## ⚙️ How to use

1. Execute [`create-fractal-js-app`](https://github.com/fractalerp/fractal-js/tree/main/packages/create-fractal-js-app) with [npm](https://docs.npmjs.com/cli/init)

```bash
npx create-fractal-js-app --example hello-world hello-world-app
```

```bash
yarn create fractal-js-app --example hello-world hello-world-app
```

```bash
pnpm create fractal-js-app --example hello-world hello-world-app
```

Modify the environment variables so that your project works


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

