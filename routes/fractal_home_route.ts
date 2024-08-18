import { Application, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { version, description } from "../package.json";
export class FractalHome {
  public constructor(app: Application) {
    app.route("/*")
      // GET endpoint
      .get((_req: Request | any, res: Response) => res.status(StatusCodes.OK).json({
        message: "Welcome to Fractal Js!",
        description,
        version
      }));
    // check health of the app
    app.route(`${process.env.API_BASE}_health`)
      // GET endpoint
      .get((_req, res) => {
        res.status(200).send("ok");
      });
  };
}

