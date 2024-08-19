import * as sinon from "sinon";
import * as mongoose from "mongoose";
import { Sequelize } from "sequelize";
import { SchemaProperty } from "@fractalerp/active-record-js/dist/lib/schema_property";


export class DataBaseMock {
  private sequelize!: Sequelize;
  private sinonStub!: sinon.SinonStub<any[], any>;

  constructor(sinonStub: sinon.SinonStub<any[], any>) {
    this.sequelize = new Sequelize("mysql://");
    this.sinonStub = sinonStub;
  }

  public setRdmsMock(modelName: string, schema: SchemaProperty) {
    // @ts-ignore
    const model = this.sequelize.define(modelName, schema);
    model.findOne = this.sinonStub;
    model.findAll = this.sinonStub;
    model.create = this.sinonStub;
    model.update = this.sinonStub;
    model.destroy = this.sinonStub;
    // @ts-ignore
    // this.model.sequelize?.query = this.sinonStub;
  }

  public setNosqlMock() {
    // const mongoSchema = schema as mongoose.ObtainDocumentType<SchemaProperty, T, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>>;

    // mongoose.model<SchemaProperty>(modelName, new mongoose.Schema(schema as any));

    // moongoose
    mongoose.Model.findOne = this.sinonStub;
    mongoose.Model.find = this.sinonStub;
    mongoose.Model.findByIdAndUpdate = this.sinonStub;
    mongoose.Model.findByIdAndDelete = this.sinonStub;
    mongoose.Model.aggregate = this.sinonStub;
    mongoose.model.prototype.save = this.sinonStub;
    // mongoose.Model.schema.index = this.sinonStub;
  }
}
