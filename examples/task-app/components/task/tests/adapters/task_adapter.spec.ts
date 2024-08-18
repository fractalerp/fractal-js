import { expect } from "chai";
import { taskOne } from "../factories/tasks/task_data";
import { TaskAdapter } from "./../../../../components/task/adapters/task_adapter";
import { TaskEntity } from "./../../../../components/task/public/entities/task_entity";

describe("Task Adapter", () => {
  const taskEntity: TaskEntity = new TaskEntity(
    taskOne.name,
    taskOne.description
  );
  const taskAdapter: TaskAdapter = new TaskAdapter(taskEntity);

  context("toJson()", async () => {

    describe("should render list of tasks as JSON", async () => {

      const result = await taskAdapter.toJson();

      expect(result).to.deep.equal(JSON.stringify(taskOne));
    });
  });
});
