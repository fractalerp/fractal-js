import { IRequestMeta } from "../../utils/interfaces";

declare global {
  namespace Express {
    interface Request {
      requestMeta: IRequestMeta;
    }
  }
}
