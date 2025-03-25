import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { TasksLogic } from "../logic/tasks_logic";

export class TasksController {
  tasksLogic = new TasksLogic();

  public addNewTask = async (req: Request, res: Response) => {
    const json = this.tasksLogic.addNewTask({
      name: req.body.name,
      description: req.body.description
    });

    return res.status(StatusCodes.CREATED).json(json);
  };

  public getTasks = async (_req: Request, res: Response) => {
    const taskListJson = await this.tasksLogic.getTasks({});

    return res.status(StatusCodes.OK).json(taskListJson);
  };

  public getTaskWithID = async (req: Request, res: Response) => {
    const json = await this.tasksLogic.getTaskWithID({ id: req.params.id });

    return res.status(StatusCodes.OK).json(json);
  };

  public updateTask = async (req: Request, res: Response) => {
    const json = await this.tasksLogic.updateTask({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description
    });

    return res.status(StatusCodes.OK).json(json);
  };

  public deleteTask = async (req: Request, res: Response) => {
    await this.tasksLogic.deleteTask({
      id: req.body.id
    });

    return res.status(StatusCodes.OK).json({});
  };
}
