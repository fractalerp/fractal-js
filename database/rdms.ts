import { Sequelize } from "sequelize";
import { DatabaseConnectionInterface } from "./database_connection_interface";

export class Rdms implements DatabaseConnectionInterface {

  public database: Sequelize | null = null;

  private database_uri: string;

  constructor(database_uri: string) {
    this.database_uri = database_uri;
    this.database = new Sequelize(this.database_uri);
  }

  async connect(): Promise<void> {

    this.database?.authenticate();
  }

  async disconnect(): Promise<void> {
    await this.database?.close();
  }
}

