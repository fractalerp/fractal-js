import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as passport from "passport";
import * as appRoot from "app-root-path";

import { FractalApp } from "../index";

export class Router {
  public fractalApp!: FractalApp;

  constructor(fractalApp: FractalApp) {
    this.fractalApp = fractalApp;

    this.fractalApp.express.all(
      "/*", async (req: any, res: any, next: NextFunction) => {
        // This code handles routing issue between react-router and express
        if (
          req.path.startsWith("/signin") ||
          req.path.startsWith("/signup")
        ) {
          return res.sendFile(`${appRoot}/public/index.html`);
        }

        // Most likely just handle the 404 here
        next();
      });
  }

  public authenticateApi(fractalApp: FractalApp, req: Request | any, res: Response, next: NextFunction) {
    return this.authenticate((err: any, userDetail: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!userDetail) {
        if (info.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Your token has expired. Please generate a new one" });
        } else {
          return res
            .status(401)
            .json({ message: info.message });
        }
      }
      // set user on express
      fractalApp.express.set("user", userDetail);
      // set user on session
      if (req && req.session) {
        req.session.user = userDetail;
      }
      // check for permissions
      next();
    })(req, res, next);
  }


  private authenticate = (callback: (err: any, user: any, info: any) => void) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);
}
