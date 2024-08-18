
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as passport from "passport";
import { StatusCodes } from "http-status-codes";

import { FractalJs } from "../app";
import { Environments } from "./constants";

const authenticate = (callback: (err: any, user: any, info: any) => void) => passport.authenticate("bearer", { session: false, failWithError: true }, callback);

export const authenticateApi = (app: FractalJs, req: Request | any, res: Response, next: NextFunction) =>
  authenticate((err: any, userDetail: any, info: any) => {
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

export const getJWT = () => {
  let JWT_SECRET = "";

  switch (process.env.ENVIRONMENT) {
    case Environments.TEST:
      JWT_SECRET = process.env.TEST_JWT_SECRET as string;
      break;
    case Environments.PRODUCTION:
      JWT_SECRET = process.env.JWT_SECRET as string;
      break;
    case Environments.DEVELOPMENT:
      JWT_SECRET = process.env.DEVELOPMENT_JWT_SECRET as string;
      break;
    default:
      JWT_SECRET = "fractal-localhost";
  }

  return JWT_SECRET;
};

export const getRSA_PASSPHRASE = () => {
  let RSA_PASSPHRASE = "";

  switch (process.env.ENVIRONMENT) {
    case Environments.PRODUCTION:
      RSA_PASSPHRASE = process.env.RSA_PASSPHRASE as string;
      break;
    case Environments.DEVELOPMENT:
      RSA_PASSPHRASE = process.env.DEVELOPMENT_RSA_PASSPHRASE as string;
      break;
    case Environments.TEST:
      RSA_PASSPHRASE = process.env.TEST_RSA_PASSPHRASE as string;
      break;
    default:
      RSA_PASSPHRASE = process.env.LOCALHOST_RSA_PASSPHRASE as string;
  }

  return RSA_PASSPHRASE;
};
