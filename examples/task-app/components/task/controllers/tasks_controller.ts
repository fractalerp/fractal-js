import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { TaskRepository } from "../public/repositories/task_repository";
import { TaskAdapter } from "../adapters/task_adapter";
import { TaskEntity } from "../public/entities/task_entity";

export class TasksController {
  taskRepository = new TaskRepository();

  public addNewTask = async (req: Request, res: Response) => {
    const taskEntity = await this.taskRepository.create({
      name: req.body.name,
      description: req.body.description
    });

    const json = new TaskAdapter(taskEntity).toJson();

    return res.status(StatusCodes.CREATED).json(json);
  };

  public getTasks = async (_req: Request, res: Response) => {
    const taskEntities = await this.taskRepository.read({});
    const taskListJson = taskEntities.map((taskEntity: TaskEntity) => new TaskAdapter(taskEntity).toJson());

    return res.status(StatusCodes.OK).json(taskListJson);
  };

  public getTaskWithID = async (req: Request, res: Response) => {
    const taskEntities = await this.taskRepository.read({ id: req.params.id });
    let json = {};

    if (taskEntities.length > 0) {
      json = new TaskAdapter(taskEntities[0]).toJson();
    }

    return res.status(StatusCodes.OK).json(json);
  };

  public updateTask = async (req: Request, res: Response) => {
    const taskEntity = await this.taskRepository.update({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description
    });

    const json = new TaskAdapter(taskEntity).toJson();

    return res.status(StatusCodes.OK).json(json);
  };

  public deleteTask = async (req: Request, res: Response) => {
    await this.taskRepository.delete({
      id: req.body.id
    });

    return res.status(StatusCodes.OK).json({});
  };
}
