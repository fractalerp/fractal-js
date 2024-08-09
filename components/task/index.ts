import { fractalLogger } from "../../config/logger";
import { FractalApp } from "../../index";
import { TaskRouter } from "./config/router";

export class TaskComponent {
  public taskRouter!: TaskRouter;
  public fractalApp!: FractalApp;

  constructor(fractalApp: FractalApp) {
    try {
      this.fractalApp = fractalApp;
      this.taskRouter = new TaskRouter(fractalApp);
    } catch (error) {
      fractalLogger.error(`Task Component: Failed to create component :( ", ${error}`);
    }
  }
}
