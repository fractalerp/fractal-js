
import { ITaskModelDocument } from "../../models/task_model";
import { TaskEntity } from "../entities/task_entity";


export class TaskMapper {
  fromModel(task: ITaskModelDocument): TaskEntity {
    return new TaskEntity(
      task.name,
      task.description
    );
  }
}
