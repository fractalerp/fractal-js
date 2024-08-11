import { fractalLogger } from "./config/logger";
import app from "./app";

const port = process.env.PORT || 3000;

fractalLogger.info("Starting server...");

app.server.listen(port, () => {

  fractalLogger.info(`Fractal Js server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);

}).on("error", (err: any) => {

  fractalLogger.error(err);

}).on("close", () => {

  fractalLogger.info("Server closed");

});
