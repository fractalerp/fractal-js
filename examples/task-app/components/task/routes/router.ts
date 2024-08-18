import { NextFunction } from "express-serve-static-core";

import { TasksHomeRoute } from "../routes/tasks_home_route";
import { TasksRoute } from "../routes/tasks_route";
import { FractalJs } from "../../../app";

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
      `${process.env.API_BASE}tasks/*`, async (_req: any, _res: any, next: NextFunction) => {
        // Add public routes not to authenticate
        // await this.authenticateApi(this.fractalJs, req, res, next);

        next();
      });
  }
}
