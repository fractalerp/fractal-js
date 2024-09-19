import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { TaskRepository } from "../public/repositories/task_repository";
import { TaskAdapter } from "../adapters/task_adapter";
import { TaskEntity } from "../public/entities/task_entity";
import { TaskModel } from "../models/task_model";
import { TaskMapper } from "../public/mappers/task_mapper";

export class TasksController {
  taskRepository = new TaskRepository();

  constructor() {
    this.taskRepository
      .setMapper(new TaskMapper())
      .setModel(TaskModel);
  }

  public addNewTask = async (req: Request, res: Response) => {
    this.taskRepository.setCreateDto({
      name: req.body.name,
      description: req.body.description
    });

    const taskEntity = await this.taskRepository.create();

    const json = new TaskAdapter(taskEntity).toJson();

    return res.status(StatusCodes.CREATED).json(json);
  };

  public getTasks = async (_req: Request, res: Response) => {
    this.taskRepository.setReadDto({});

    const taskEntities = await this.taskRepository.read();
    const taskListJson = taskEntities && taskEntities.map((taskEntity: TaskEntity) => new TaskAdapter(taskEntity).toJson());

    return res.status(StatusCodes.OK).json(taskListJson);
  };

  public getTaskWithID = async (req: Request, res: Response) => {
    this.taskRepository.setReadDto({ id: req.params.id });

    const taskEntities = await this.taskRepository.read();
    let json = {};

    if (taskEntities && taskEntities.length > 0) {
      json = new TaskAdapter(taskEntities[0]).toJson();
    }

    return res.status(StatusCodes.OK).json(json);
  };

  public updateTask = async (req: Request, res: Response) => {
    this.taskRepository.setUpdateDto({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description
    });

    const taskEntity = await this.taskRepository.update();
    const json = new TaskAdapter(taskEntity).toJson();

    return res.status(StatusCodes.OK).json(json);
  };

  public deleteTask = async (req: Request, res: Response) => {
    this.taskRepository.setDeleteDto({
      id: req.body.id
    });

    await this.taskRepository.delete();

    return res.status(StatusCodes.OK).json({});
  };
}
