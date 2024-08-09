import { FractalActiveModel } from "./../../../../app/models/fractal_active_model";

export interface IProjectDocument {
  name: string;
  description: string;
}

const ProjectSchema = {
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

export const Project = new FractalActiveModel<IProjectDocument>("Project", ProjectSchema);

export default Project;
