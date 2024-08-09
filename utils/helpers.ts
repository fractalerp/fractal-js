/* eslint-disable eqeqeq */

import { Environments } from "./constants";

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
