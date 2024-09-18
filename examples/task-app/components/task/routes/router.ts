import { NextFunction } from "express-serve-static-core";

import { TasksHomeRoute } from "../routes/tasks_home_route";
import { TasksRoute } from "../routes/tasks_route";
import { FractalJs } from "../../../app";
import { Request, Response } from "express";

export class TaskRouter {
  public fractalJs!: FractalJs;

  constructor(fractalJs: FractalJs) {
    this.fractalJs = fractalJs;
    // white list public routes
    this.allowPublicRoutes();
    // Add routes
    new TasksHomeRoute(fractalJs);
    new TasksRoute(fractalJs);
  }

  private allowPublicRoutes() {
    this.fractalJs.express.all(
      `${process.env.API_BASE}tasks/*`, async (_req: Request, _res: Response, next: NextFunction) => {
        // Add public routes not to authenticate
        // await this.authenticateApi(this.fractalJs, req, res, next);

        next();
      });
  }
}
