import { TaskRepository } from "../public/repositories/task_repository";
import { TaskAdapter } from "../adapters/task_adapter";
import { TaskEntity } from "../public/entities/task_entity";
import { TaskModel } from "../models/task_model";
import { TaskMapper } from "../public/mappers/task_mapper";
import { CreateTaskDto } from "../public/dtos/tasks/create_task_dto";
import { ReadTaskDto } from "../public/dtos/tasks/read_task_dto";
import { UpdateTaskDto } from "../public/dtos/tasks/update_task_dto";
import { DeleteTaskDto } from "../public/dtos/tasks/delete_task_dto";

export class TasksLogic {
  taskRepository = new TaskRepository();

  constructor() {
    this.taskRepository
      .setMapper(new TaskMapper())
      .setModel(TaskModel);
  }

  public addNewTask = async (createTaskDto: CreateTaskDto) => {
    this.taskRepository.setCreateDto(createTaskDto);

    const taskEntity = await this.taskRepository.create();

    const json = new TaskAdapter(taskEntity).toJson();

    return json;
  };

  public getTasks = async (readTaskDto: ReadTaskDto) => {
    this.taskRepository.setReadDto(readTaskDto);

    const taskEntities = await this.taskRepository.read();
    const taskListJson = taskEntities && taskEntities.map((taskEntity: TaskEntity) => new TaskAdapter(taskEntity).toJson());

    return taskListJson;
  };

  public getTaskWithID = async (readTaskDto: ReadTaskDto) => {
    this.taskRepository.setReadDto({ id: readTaskDto.id });

    const taskEntities = await this.taskRepository.read();
    let json = {};

    if (taskEntities && taskEntities.length > 0) {
      json = new TaskAdapter(taskEntities[0]).toJson();
    }

    return json;
  };

  public updateTask = async (updateTaskDto: UpdateTaskDto) => {
    this.taskRepository.setUpdateDto({
      id: updateTaskDto.id,
      name: updateTaskDto.name,
      description: updateTaskDto.description
    });

    const taskEntity = await this.taskRepository.update();
    const json = new TaskAdapter(taskEntity).toJson();

    return json;
  };

  public deleteTask = async (deleteTaskDto: DeleteTaskDto) => {
    this.taskRepository.setDeleteDto({
      id: deleteTaskDto.id
    });

    await this.taskRepository.delete();

    return {};
  };
}
