import { Request, Response } from "express";
import { FractalJs } from "../../../app";

export class TasksHomeRoute {
  public constructor(fractalJs: FractalJs) {
    const authEndpoint = `${process.env.API_BASE}tasks/home`;
    // GET endpoint
    fractalJs.express.route(authEndpoint)
      // GET endpoint
      .get((_req: Request, res: Response) => {
        res.status(200).send({
          message: "Welcome to Fractal Task API.",
          version: "1.0.0"
        });
      });
  };
}
