/* eslint no-console: 0 */
import { Command } from "commander";
import * as figlet from "figlet";
import { version, description } from "../package.json";
import { Component } from "./component";
import { App } from "./app";
// eslint-disable
console.log(figlet.textSync("Fractal JS"));

// add program
const program = new Command();

program
  .version(version)
  .description(description)
  .option("-a, --app <value>", "Create a fractal js app")
  .option("-c, --c <value>", "Create a component")
  .parse(process.argv);

const options = program.opts();

if (options.c) {
  const component = new Component(options.c);
  component.create();
}
if (options.a) {
  new App(options.a).create();
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

console.log(options.c);
