import { NextFunction } from "express-serve-static-core";

import { FractalJs } from "../app";
import { FractalHome } from "./fractal_home_route";

export class FractalRouter {
  public fractalJs!: FractalJs;

  constructor(fractalJs: FractalJs) {
    this.fractalJs = fractalJs;
    // Add API routes
    new FractalHome(fractalJs.express);

    this.fractalJs.express.all(
      "/*", async (_req: any, _res: any, next: NextFunction) => {
        next();
      });
  }
}
