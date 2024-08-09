import { NextFunction } from "express-serve-static-core";
import { FractalRouter } from "../../../config/fractal_router";

import home from "../app/routes/home";
import { FractalApp } from "../../../index";

export class TaskRouter extends FractalRouter {
  public fractalApp!: FractalApp;

  constructor(app: FractalApp) {
    super(app);

    this.fractalApp = app;
    // white list public routes
    this.allowPublicRoutes();
    // Add routes
    home.routes(app);
  }

  private allowPublicRoutes() {
    this.fractalApp.express.all(
      `${process.env.API_BASE}tasks/*`, async (req: any, res: any, next: NextFunction) => {
        // Add public routes not to authenticate
        await this.authenticateApi(this.fractalApp, req, res, next);
      });
  }
}
