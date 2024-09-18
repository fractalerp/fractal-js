import { TasksController } from "../controllers/tasks_controller";
import { FractalJs } from "../../../app";

export class TasksRoute {
  public tasksController!: TasksController;

  public constructor(fractalJs: FractalJs) {
    this.tasksController = new TasksController();
    const tasksEndpoint = `${process.env.API_BASE}tasks`;
    /* Get, Add tasks */
    fractalJs.express.route(`${tasksEndpoint}`)
      .get(this.tasksController.getTasks)
      .post(this.tasksController.addNewTask);

    /* Task details, update and delete */
    fractalJs.express.route(`${tasksEndpoint}/:id`)
      .get(this.tasksController.getTaskWithID)
      .put(this.tasksController.updateTask)
      .delete(this.tasksController.deleteTask);
  }
}
