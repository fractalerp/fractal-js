import { fractalLogger } from "../../config/logger";
import { FractalJs } from "../../app";
import { TaskRouter } from "./routes/router";

export class TaskComponent {
  public taskRouter!: TaskRouter;
  public fractalJs!: FractalJs;

  constructor(fractalJs: FractalJs) {
    try {
      this.fractalJs = fractalJs;
      this.taskRouter = new TaskRouter(fractalJs);
    } catch (error) {
      fractalLogger.error(`Task Component: Failed to create component :( ", ${error}`);
    }
  }
}
