/* eslint no-console: 0 */
import fs from "fs";
import path from "path";

export class Component {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public create = () => {
    console.log("Creating component...");

    const basComponentPath = path.resolve(`components/${this.name}`);
    // create component directories
    if (!fs.existsSync(basComponentPath)) {
      this.createDirs(basComponentPath);
      // create component source files

    } else {
      console.log("The component already exists");
    }
  };

  private createDirs = async (basComponentPath: string) => {
    await fs.mkdirSync(`${basComponentPath}`);
    await fs.mkdirSync(`${basComponentPath}/controllers`);
    await fs.mkdirSync(`${basComponentPath}/adapters`);
    await fs.mkdirSync(`${basComponentPath}/jobs`);
    await fs.mkdirSync(`${basComponentPath}/logic`);
    await fs.mkdirSync(`${basComponentPath}/middleware`);
    await fs.mkdirSync(`${basComponentPath}/models`);
    await fs.mkdirSync(`${basComponentPath}/notifications`);
    await fs.mkdirSync(`${basComponentPath}/policies`);
    await fs.mkdirSync(`${basComponentPath}/public`);
    await fs.mkdirSync(`${basComponentPath}/public/dtos`);
    await fs.mkdirSync(`${basComponentPath}/public/entities`);
    await fs.mkdirSync(`${basComponentPath}/public/mappers`);
    await fs.mkdirSync(`${basComponentPath}/public/repositories`);
    await fs.mkdirSync(`${basComponentPath}/routes`);
    await fs.mkdirSync(`${basComponentPath}/tests`);
    await fs.mkdirSync(`${basComponentPath}/views`);
  };
}
