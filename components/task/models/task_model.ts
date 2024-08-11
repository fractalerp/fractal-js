import { ActiveRecord } from "@fractalerp/active-record-js"

export interface ITaskModelDocument {
  name: string;
  description: string;
}

const TaskModelSchema = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: null
  }
};

export const TaskModel = new ActiveRecord<ITaskModelDocument>("Task", TaskModelSchema);
