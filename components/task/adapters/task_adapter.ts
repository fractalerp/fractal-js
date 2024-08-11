import { TaskEntity } from "../public/entities/task_entity";

export class TaskAdapter {
  taskEntity: TaskEntity;

  constructor(taskEntity: TaskEntity) {
    this.taskEntity = taskEntity;
  }

  toJson = () => JSON.stringify(this.taskEntity);
}
