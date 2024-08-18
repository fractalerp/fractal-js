import { SchemaProperty } from "@fractalerp/active-record-js/dist/lib/schema_property";

export interface ITaskSchema {
  type?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  _id?: string;
}

export const taskSchema: Record<string, SchemaProperty> = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    unique: false
  },
  phoneNumber: {
    type: Number
  }
};
