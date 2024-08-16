import { TaskEntity } from "../entities/task_entity";
import { CreateDto } from "../dtos/tasks/create_dto";
import { ReadDto } from "../dtos/tasks/read_dto";
import { UpdateDto } from "../dtos/tasks/update_dto";
import { DeleteDto } from "../dtos/tasks/delete_dto";
import { ITaskModelDocument, TaskModel } from "../../models/task_model";
import { TaskMapper } from "../mappers/task_mapper";

export class TaskRepository {
  async create(dto: CreateDto): Promise<TaskEntity> {
    const task = await TaskModel.create({
      name: dto.name,
      description: dto.description
    });

    return new TaskMapper().fromModel(task);
  }

  async read(dto: ReadDto): Promise<TaskEntity[]> {
    if (dto.id) {
      const task = await TaskModel.findOne({ id: dto.id });

      if (task !== undefined && task !== null && task.name) {
        return [new TaskEntity(task.name, task.description)];
      }

      return [];
    }
    // Let us read and map to entity but in future this should be memoized
    const tasks = await TaskModel.find({});
    const taskEntities = tasks.map((task: ITaskModelDocument) => new TaskMapper().fromModel(task));

    return Promise.resolve(taskEntities);
  }

  async update(dto: UpdateDto): Promise<TaskEntity> {
    const updatedTask = await TaskModel.update(dto.id as string, {
      name: dto.name,
      description: dto.description
    });

    return new TaskMapper().fromModel(updatedTask);
  }

  delete(dto: DeleteDto): void {
    TaskModel.delete(dto.id as string);
  };
}
