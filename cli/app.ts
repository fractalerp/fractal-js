/* eslint no-console: 0 */
import fs from "fs";
import path from "path";

export class App {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public create = () => {
    console.log("Creating fractal-js application...");

    const basComponentPath = path.resolve(`${this.name}`);
    // create component directories
    if (!fs.existsSync(basComponentPath)) {
      this.createDirs(basComponentPath);
      // create component source files

    } else {
      console.log("The folder already exists");
    }
  };

  private createDirs = async (basComponentPath: string) => {
    await fs.mkdirSync(`${basComponentPath}`);
  };
}
