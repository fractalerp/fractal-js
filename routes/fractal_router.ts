import { NextFunction } from "express-serve-static-core";

import { FractalJs } from "../app";
import { FractalHome } from "./fractal_home_route";
import { Request, Response } from "express";

export class FractalRouter {
  public fractalJs!: FractalJs;

  constructor(fractalJs: FractalJs) {
    this.fractalJs = fractalJs;
    // Add API routes
    new FractalHome(fractalJs.express);

    this.fractalJs.express.all(
      "/*", async (_req: Request, _res: Response, next: NextFunction) => {
        next();
      });
  }
}
