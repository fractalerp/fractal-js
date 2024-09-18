import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const csrfHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  _request: Request,
  _response: Response,
  next: NextFunction) => {

  if (error?.code === "EBADCSRFTOKEN") {
    // handle CSRF token errors here
    return next({ code: StatusCodes.FORBIDDEN, message: "Invalid CSRF", error: "Forbidden" });
  } else {
    return next(error);
  }
};
