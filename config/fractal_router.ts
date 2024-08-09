import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as passport from "passport";
import * as appRoot from "app-root-path";
import { StatusCodes } from "http-status-codes";

import home from "../app/routes/fractal_home";
import { FractalApp } from "./../index";

export class FractalRouter {
  public app!: FractalApp;

  constructor(app: FractalApp) {
    this.app = app;
    // Add API routes
    home.routes(app.express);

    this.app.express.all(
      "/*", async (req: any, res: any, next: NextFunction) => {
        // Add react-router rotures here so that express does not logout

        // TODO: this should be automated so that the public routes are read
        // from react routes
        if (
          req.path.startsWith("/signin") ||
          req.path.startsWith("/signup") ||
          req.path.startsWith("/dashboard") ||
          req.path.startsWith("/permissions") ||
          req.path.startsWith("/roles") ||
          req.path.startsWith("/users") ||
          req.path.startsWith("/profile")
        ) {
          // Else redirect from express to the react public app
          return res.sendFile(`${appRoot}/public/index.html`);
        }
        // Most likely just handle the 404 here
        next();
      });
  }

  public authenticateApi(app: FractalApp, req: Request | any, res: Response, next: NextFunction) {
    return this.authenticate((err: any, userDetail: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!userDetail) {
        if (info.name === "TokenExpiredError") {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Your token has expired. Please generate a new one" });
        } else {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: info.message });
        }
      }
      // set user on express
      app.express.set("user", userDetail);
      // set user on session
      if (req && req.session) {
        req.session.user = userDetail;
      }

      next();
    })(req, res, next);
  }

  private authenticate = (callback: (err: any, user: any, info: any) => void) => passport.authenticate("bearer", { session: false, failWithError: true }, callback);
}
