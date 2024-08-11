import { Application, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class FractalHome {
  public constructor(app: Application) {
    app.route(process.env.API_BASE as string)
      // GET endpoint
      .get((_req: Request | any, res: Response) => res.status(StatusCodes.OK).json({
        message: "Fractal API",
        version: "1.0.0" // TODO: Read version from package.json
      }));
    // check health of the app
    app.route(`${process.env.API_BASE}_health`)
      // GET endpoint
      .get((_req, res) => {
        res.status(200).send("ok");
      });
  };
}

