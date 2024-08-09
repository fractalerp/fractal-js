import * as fs from "fs";
import * as appRoot from "app-root-path";

import { fractalLogger } from "../config/logger";
import { DatabaseAdapter } from "./database_adapter";
import { MongoDB } from "./mongodb";
import { Rdms } from "./rdms";

export default class Database {
  private datbaseConfigFile = `${appRoot}/config/database.json`;

  constructor() {
    if (!fs.existsSync(this.datbaseConfigFile)) {
      // Set database engine by parsing the json file
      const rawData = fs.readFileSync(this.datbaseConfigFile, "utf8");
      const databaseOption = JSON.parse(rawData as any);
      const noSqLAdapter = databaseOption.nosql.adapter;
      const databaseUri = databaseOption.url;

      switch (noSqLAdapter) {
        case DatabaseAdapter.MONGODB:
          const mongodb = new MongoDB(process.env[`${databaseUri}`] as string);
          mongodb.connect();

          break;
      }

      const rdms = new Rdms(process.env[`${databaseUri}`] as string);
      rdms.connect();

    } else {
      fractalLogger.error("Could not find database config file");
    }
  }
}
