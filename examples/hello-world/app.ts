import http from "http";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import appRoot from "app-root-path";
import helmet from "helmet";
import useragent from "useragent";
import { StatusCodes } from "http-status-codes";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import fractaLog, { fractalLogger } from "./config/logger";
import { csrfHandler } from "./middleware/csrf.middleware";
import { Environments } from "./utils/constants";
import { getJWT } from "./utils/auth";
import { FractalRouter } from "./routes/fractal_router";

export class FractalJs {
  public express!: express.Application;
  public session!: express.RequestHandler;
  public server!: http.Server;
  public redisClient!: any;
  public redisStore!: any;
  public environment!: string;

  constructor() {
    try {
      this.environment = process.env.ENVIRONMENT as string || "-none-";
      this.express = express();
      this.config();

      if (process.env.ENVIRONMENT !== Environments.TEST) {
        this.setUpRedis();
        this.setUpSessionStore(this.express);
      }
      // Try to catch CSRF errors. Invalid CSRF token is thrown as 403 error from the library.
      // Take care of it and if not the case, send to the next error handler

      this.express.use(csrfHandler);
      //
      this.express.use(this.initPassport());
      // Main app router
      new FractalRouter(this);

      this.loadComponents();

    } catch (error) {
      fractalLogger.log("error", `Fractal Core: Some weirdo error happened :( ", ${error}`);
    }
  }

  private config(): void {
    // make sure that the environment is set
    dotenv.config();
    this.express.use("/", express.static(`${appRoot}/public`));
    // // Set up helment
    this.setUpHelment();
    // support application/json type post data
    this.express.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors({ methods: ["GET", "POST"] }));
    // this.express.use(compression());
    // so we can get the client's IP address
    this.express.enable("trust proxy");
    // set up logging
    this.express.use(morgan("combined", { stream: fractaLog.stream } as any));

    this.server = http.createServer(this.express);

    useragent(true);

    this.handleUncaughtExceptions();
  }

  // @ts-ignore
  private setUpHelment() {
    this.express.use(helmet({
      referrerPolicy: { policy: "same-origin" },
      frameguard: false,
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"],
          "connect-src": ["'self'", "https:"],
          "frame-src": ["'self'", "https:"],
          "frame-ancestors": ["'self'", "https:"],
          "img-src": ["'self'", "https:"]
        }
      }
    }));
  }

  private initPassport = () => {
    passport.use("jwt", this.getPassportStrategy());
    return passport.initialize();
  };

  private getPassportStrategy = (): Strategy => {
    const params: StrategyOptionsWithRequest = {
      secretOrKey: getJWT(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      passReqToCallback: true
    };

    return new Strategy(params, async (req: Request | any, payload: any, done: any) => {
      const requestMeta = {
        ...(req.requestMeta || {}),
        token: req.header("Authorization") as string
      };
      req.requestMeta = requestMeta;
      if (payload.api_key !== null && payload.api_secret !== null) {
        requestMeta.api_key = payload.api_key;
        requestMeta.api_secret = payload.api_secret;
        requestMeta.role = payload.role;
        requestMeta.user_id = payload.id;
        // Authenticate the user
        req.requestMeta = requestMeta;
        return done(null, payload);
      } else {
        done(null, false, StatusCodes.INTERNAL_SERVER_ERROR, "Failed to verify user");
      }
    });
  };

  private setUpRedis() {
    let REDIS_URL: string;

    switch (process.env.ENVIRONMENT) {
      case Environments.TEST:
        REDIS_URL = process.env.TEST_REDIS_URL as string;
        break;
      case Environments.PRODUCTION:
        REDIS_URL = process.env.REDIS_URL as string;
        break;
      case Environments.DEVELOPMENT:
        REDIS_URL = process.env.DEVELOPMENT_REDIS_URL as string;
        break;
      default:
        REDIS_URL = process.env.TEST_REDIS_URL as string;
    }
    const redisUrl = REDIS_URL;
    this.redisClient = createClient({
      url: redisUrl
    });
    this.redisClient
      .connect()
      .then(() => {
        fractalLogger.log("info", "Redis connected");
      })
      .catch(() => {
        fractalLogger.error("Failed to connect to redis client");
      });
    this.redisStore = new RedisStore({
      client: this.redisClient,
      prefix: "fractal"
    });

  }

  private setUpSessionStore(app: express.Application) {
    // Here we tell Express to use Redis as session store.
    // We pass Redis store.
    // And express does the rest !
    app.use(
      session({
        name: "jsessionid",
        store: this.redisStore,
        secret: getJWT(),
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false // recommended: only save session when data exists
      })
    );
  }

  /**
   * Auto loads component apps
   */

  private loadComponents = async () => {
    // Define the directory containing classes
    const excludeDirs = [".DS_Store"];
    const classesDir = `${appRoot}/components`;

    // Read all files in the classes directory
    for (const componentName of fs.readdirSync(classesDir)) {
      if (!excludeDirs.includes(componentName)) {
        import(`./components/${componentName}`).then(module => {
          // Assuming each file exports a single class
          const className = Object.keys(module)[0];
          const importedClass = module[className];
          new importedClass(this);
        }).catch((err: Error) => {
          fractalLogger.error(`Error importing component ${componentName}: ${err.message}`);
        });
      }
    }
  };

  private handleUncaughtExceptions = () => {
    this.express.use((error: any, _req: express.Request, res: express.Response, next: (error: any) => void) => {
      if (process.env.NODE_ENV === "production") {
        return res
          .status(500)
          .json({ error: "Unexpected error: " + error });
      }
      next(error);
    });
  };
}

export default new FractalJs();
