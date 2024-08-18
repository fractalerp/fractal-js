import { expect } from "chai";
import { taskOne } from "../factories/tasks/task_data";
import { TaskMapper } from "./../../../../components/task/public/mappers/task_mapper";
import { TaskEntity } from "./../../../../components/task/public/entities/task_entity";

describe("Task Mapper", () => {
  const taskEntity: TaskEntity = new TaskEntity(
    taskOne.name,
    taskOne.description
  );
  const taskMapper: TaskMapper = new TaskMapper();

  context("fromModel()", async () => {

    describe("should convert model to entity", async () => {

      const result = await taskMapper.fromModel(taskOne);

      expect(result).to.deep.equal(taskEntity);
    });
  });
});
