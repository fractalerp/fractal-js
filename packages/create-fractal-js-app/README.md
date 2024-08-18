# Create Fractal Js App

The easiest way to get started with Fractal Js is by using `create-fractal-js-app`. This CLI tool enables you to quickly start building a new Fractal Js application, with everything set up for you. You can create a new app using the default Fractal Js template, or by using one of the [official Fractal Js examples](https://github.com/fractalerp/fractal-js/tree/main/examples). To get started, use the following command:

### Interactive

You can create a new project interactively by running:

```bash
npx create-fractal-js-app@latest
# or
yarn create fractal-js-app
# or
pnpm create fractal-js-app
# or
bunx create-fractal-js-app
```

You will be asked for the name of your project

### Non-interactive

You can also pass command line arguments to set up a new project
non-interactively. See `create-fractal-js-app --help`:

```bash
Usage: create-fractal-js-app [project-directory] [options]

Options:
  -V, --version                        output the version number
  --i, --init

    Initialize project. (default)

  --eslint

    Initialize with ESLint config.

  --app-dir

    Initialize inside a `app/` directory.

  --turbo

    Enable Turbopack by default for development.

  --import-alias <alias-to-configure>

    Specify import alias to use (default "@/*").

  --empty

    Initialize an empty project.

  --use-npm

    Explicitly tell the CLI to bootstrap the application using npm

  --use-pnpm

    Explicitly tell the CLI to bootstrap the application using pnpm

  --use-yarn

    Explicitly tell the CLI to bootstrap the application using Yarn

  --use-bun

    Explicitly tell the CLI to bootstrap the application using Bun

  -e, --example [name]|[github-url]

    An example to bootstrap the app with. You can use an example name
    from the official Fractal Js repo or a GitHub URL. The URL can use
    any branch and/or subdirectory

  --example-path <path-to-example>

    In a rare case, your GitHub URL might contain a branch name with
    a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
    In this case, you must specify the path to the example separately:
    --example-path foo/bar

  --reset-preferences

    Explicitly tell the CLI to reset any stored preferences

  --skip-install

    Explicitly tell the CLI to skip installing packages

  --disable-git

    Explicitly tell the CLI to skip initializing a git repository.

  --yes

    Use previous preferences or defaults for all options that were not
    explicitly specified, without prompting.

  -h, --help                           display help for command
```

### Why use Create Fractal Js App?

`create-fractal-js-app` allows you to create a new Fractal Js app within seconds. It is officially maintained by the creators of Fractal Js, and includes a number of benefits:

- **Interactive Experience**: Running `npx create-fractal-js-app@latest` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Fractal Js App has zero dependencies.
- **Offline Support**: Create Fractal Js App will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Support for Examples**: Create Fractal Js App can bootstrap your application using an example from the Fractal Js examples collection (e.g. `npx create-fractal-js-app --example task-app`).
- **Tested**: The package is part of the Fractal js monorepo and tested using the same integration test suite as Fractal Js itself, ensuring it works as expected with every release.
