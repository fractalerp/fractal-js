import { install } from "../helpers/install";
import { copy } from "../helpers/copy";

import { async as glob } from "fast-glob";
import os from "os";
import fs from "fs/promises";
import path from "path";
import { cyan, bold } from "picocolors";
import { Sema } from "async-sema";
// import pkg from "../package.json";

import { GetTemplateFileArgs, InstallTemplateArgs } from "./types";

/**
 * Get the file path for a given file in a template, e.g. "fractal-js.config.js".
 */
export const getTemplateFile = ({
  template,
  file,
}: GetTemplateFileArgs): string => {
  return path.join(__dirname, template, "ts", file);
};

export const SRC_DIR_NAMES = ["app", "pages", "styles"];

/**
 * Install a Fractal Js internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  eslint,
  srcDir,
  importAlias,
  skipInstall,
  turbo,
}: InstallTemplateArgs) => {
  console.log(bold(`Using ${packageManager}.`));

  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, template, "ts");
  const copySource = ["**"];
  if (!eslint) copySource.push("!eslintrc.json");

  await copy(copySource, root, {
    parents: true,
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return `.${name}`;
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  const tsconfigFile = path.join(
    root,
    "tsconfig.json",
  );
  await fs.writeFile(
    tsconfigFile,
    (await fs.readFile(tsconfigFile, "utf8"))
      .replace(
        `"@/*": ["./*"]`,
        srcDir ? `"@/*": ["./src/*"]` : `"@/*": ["./*"]`,
      )
      .replace(`"@/*":`, `"${importAlias}":`),
  );

  // update import alias in any files if not using the default
  if (importAlias !== "@/*") {
    const files = await glob("**/*", {
      cwd: root,
      dot: true,
      stats: false,
      // We don't want to modify compiler options in [ts/js]config.json
      // and none of the files in the .git folder
      ignore: ["tsconfig.json", ".git/**/*"],
    });
    const writeSema = new Sema(8, { capacity: files.length });
    await Promise.all(
      files.map(async (file) => {
        await writeSema.acquire();
        const filePath = path.join(root, file);
        if ((await fs.stat(filePath)).isFile()) {
          await fs.writeFile(
            filePath,
            (await fs.readFile(filePath, "utf8")).replace(
              `@/`,
              `${importAlias.replace(/\*/g, "")}`,
            ),
          );
        }
        writeSema.release();
      }),
    );
  }

  if (srcDir) {
    await fs.mkdir(path.join(root, "src"), { recursive: true });
    await Promise.all(
      SRC_DIR_NAMES.map(async (file) => {
        await fs
          .rename(path.join(root, file), path.join(root, "src", file))
          .catch((err) => {
            if (err.code !== "ENOENT") {
              throw err;
            }
          });
      }),
    );

    // Change the `Get started by editing pages/index` / `app/page` to include `src`
    const indexPageFile = path.join(
      "src",
      "app",
      `index.ts`,
    );

    await fs.writeFile(
      indexPageFile,
      (await fs.readFile(indexPageFile, "utf8")).replace(
        "app/index",
        "src/app/index",
      ),
    );
  }

  /** Copy the version from package.json or override for tests. */
  // const version = process.env.FRACTAL_JS_PRIVATE_TEST_VERSION ?? pkg.version;

  /** Create a package.json for the new project and write it to disk. */
  const packageJson: any = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: `fractal-js dev${turbo ? " --turbo" : ""}`,
      build: "fractal-js build",
      start: "fractal-js start",
      lint: "fractal-js lint",
    },
    /**
     * Default dependencies.
     */
    dependencies: {
      "@fractalerp/active-record-js": "^1.0.14",
      "@types/body-parser": "^1.19.5",
      "@types/cors": "^2.8.17",
      "@types/express-session": "^1.18.0",
      "@types/http-status-codes": "^1.2.0",
      "@types/morgan": "^1.9.9",
      "@types/passport": "^1.0.16",
      "@types/passport-jwt": "^4.0.1",
      "@types/redis": "^4.0.11",
      "@types/useragent": "^2.3.4",
      "@types/winston": "^2.4.4",
      "body-parser": "^1.19.0",
      "commander": "^12.1.0",
      "connect-redis": "^7.1.1",
      "cookie-session": "^2.1.0",
      "cors": "^2.8.5",
      "dotenv": "^16.4.5",
      "express": "^4.17.1",
      "express-session": "^1.18.0",
      "figlet": "^1.7.0",
      "helmet": "^7.1.0",
      "http-status-codes": "^2.3.0",
      "mongoose": "^8.2.1",
      "morgan": "^1.10.0",
      "mysql2": "^3.11.0",
      "passport": "^0.7.0",
      "passport-jwt": "^4.0.0",
      "redis": "^4.6.13",
      "sequelize": "^6.37.3",
      "useragent": "^2.3.0",
      "winston": "^3.12.0"
    },
    devDependencies: {},
  };

  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "@types/chai": "^4.3.12",
    "@types/core-js": "^2.5.8",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.21",
    "@types/express-serve-static-core": "^4.17.43",
    "@types/figlet": "^1.5.8",
    "@types/mocha": "^10.0.7",
    "@types/node": "^20.11.27",
    "@types/sinon": "^17.0.3",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/eslint-plugin-tslint": "^7.0.2",
    "@typescript-eslint/parser": "^7.2.0",
    "chai": "^4.3.6",
    "check-dependencies": "^2.0.0",
    "copy-webpack-plugin": "^12.0.2",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsdoc": "^50.2.2",
    "eslint-plugin-prefer-arrow": "^1.2.3",
    "grunt": "^1.3.0",
    "grunt-check-dependencies": "^1.0.0",
    "grunt-contrib-clean": "^2.0.1",
    "grunt-contrib-compress": "^2.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-watch": "^1.0.1",
    "grunt-file-append": "0.0.7",
    "grunt-newer": "^1.3.0",
    "grunt-webpack": "^6.0.0",
    "html-loader": "^5.0.0",
    "istanbul": "^0.4.5",
    "mocha": "^10.3.0",
    "mocha-lcov-reporter": "^1.3.0",
    "nodemon": "^3.1.4",
    "npm-check": "^6.0.1",
    "nyc": "^15.1.0",
    "pre-commit": "^1.2.2",
    "remap-istanbul": "^0.13.0",
    "sinon": "^18.0.0",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.2",
    "webpack": "^5.90.3",
    "webpack-dev-server": "^5.0.3",
    "webpack-merge": "^5.10.0",
    "webpack-node-externals": "^3.0.0"
  };

  // /* Default ESLint dependencies. */
  // if (eslint) {
  //   packageJson.devDependencies = {
  //     ...packageJson.devDependencies,
  //     eslint: "^8",
  //     "eslint-config-next": version,
  //   };
  // }

  const devDeps = Object.keys(packageJson.devDependencies).length;
  if (!devDeps) delete packageJson.devDependencies;

  await fs.writeFile(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  if (skipInstall) return;

  console.log("\nInstalling dependencies:");
  for (const dependency in packageJson.dependencies)
    console.log(`- ${cyan(dependency)}`);

  if (devDeps) {
    console.log("\nInstalling devDependencies:");
    for (const dependency in packageJson.devDependencies)
      console.log(`- ${cyan(dependency)}`);
  }

  console.log();

  await install(packageManager, isOnline);
};

export * from "./types";
