import mongoose from "mongoose";
import { fractalLogger } from "../config/logger";
import { DatabaseConnectionInterface } from "./database_connection_interface";
import { Environments } from "./../utils/constants";

export class MongoDB implements DatabaseConnectionInterface {

  public database: mongoose.Connection | null = null;

  private database_url: string;

  constructor(database_url: string) {
    this.database_url = database_url;
  }

  async connect(): Promise<void> {
    let mongoConnectionOptions = {
      retryWrites: true,
      ssl: true
    };
    // set database debgu info to log file
    mongoose.set("debug", (coll, method, query, doc, options) => {
      const set = {
        coll,
        method,
        query,
        doc,
        options
      };

      fractalLogger.info({
        dbQuery: set
      });
    });

    // Do not log sensitive information in production
    if (process.env.ENVIRONMENT !== Environments.PRODUCTION) {
      mongoose.set("debug", (coll: any, method: any, query: any, doc: any, opts: any) => {
        fractalLogger.info({
          dbQuery: {
            coll,
            method,
            query,
            doc,
            options: opts
          }
        });
      });
    }

    // Do not use ssl on localhost
    for (const dbHost of ["://localhost", "://127.0.0.1", "://0.0.0.0"]) {
      if (this.database_url.includes(dbHost)) {
        mongoConnectionOptions = { ...mongoConnectionOptions, ssl: false };
        break;
      }
    }

    this.database = mongoose.createConnection(this.database_url, mongoConnectionOptions);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

