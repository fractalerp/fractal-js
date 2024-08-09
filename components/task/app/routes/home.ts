import { Request, Response } from "express";
import { FractalApp } from "../../../../index";

export class TaskHome {
  public routes = (app: FractalApp) => {
    const authEndpoint = `${process.env.API_BASE}tasks`;
    // GET endpoint
    app.express.route(authEndpoint)
      // GET endpoint
      .get((_req: Request, res: Response) => {
        // Get all contacts
        res.status(200).send({
          message: "Welcome to Fractal Task API.",
          version: "1.0.0"
        });
      });
  };
}

export default new TaskHome();
