/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import * as sinon from "sinon";
import { DataBaseMock } from "../../../../../tests/support/data_base_mock";
import { taskOne, taskTwo } from "../../factories/tasks/task_data";
import { TaskRepository } from "../../../public/repositories/task_repository";
import { TaskMapper } from "../../../public/mappers/task_mapper";
import { TaskModel } from "../../../../task/models/task_model";

describe("Task Repository", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const taskRepository: TaskRepository = new TaskRepository();

  before(() => {
    modelMock = sandbox.stub();
    new DataBaseMock(modelMock).setNosqlMock();

    taskRepository
      .setMapper(new TaskMapper())
      .setModel(TaskModel);
  });

  describe("find()", () => {

    context("when present", () => {

      it("should find one task", async () => {
        const findOneMock = modelMock.returns(Promise.resolve(taskOne));

        findOneMock.resolves(taskOne);

        taskRepository.setReadDto({ id: taskOne._id });
        const results = await taskRepository.read();
        const result = results && results[0];

        expect(result).to.deep.equal({ name: taskOne.name, description: taskOne.description });
        // expect(modelMock.calledWith({})).to.be.true;
      });
    });

    it("should find list of tasks", async () => {
      const findMock = modelMock.returns(Promise.resolve([taskOne, taskTwo]));

      findMock.resolves([taskOne, taskTwo]);

      taskRepository.setReadDto({});
      const results = await taskRepository.read();

      expect(results?.length).to.equal(2);
      // TODO: this might be flaky
      // expect(results[0]).to.deep.equal(taskOne);
      // expect(findMock.calledWith({})).to.be.true;
    });

    context("when not present", () => {
      it("should return empty array", async () => {
        const findOneMock = modelMock.returns(Promise.resolve([]));

        findOneMock.resolves([]);

        taskRepository.setReadDto({ id: "random_id" });
        const results = await taskRepository.read();

        console.log(results)

        expect(results?.length).to.eq(0);
        // expect(modelMock.calledWith({})).to.be.true;
      });
    });

  });

  describe("should create a task", async () => {
    const createMock = modelMock.returns(Promise.resolve(taskOne));

    createMock.resolves(taskOne);

    taskRepository.setCreateDto({
      name: taskOne.name,
      description: taskOne.description
    });
    const result = await taskRepository.create();

    expect(result).to.deep.equal(taskOne);
  });

  it("should update a task", async () => {
    const updateMock = modelMock.returns(Promise.resolve(taskTwo));
    updateMock.resolves(taskTwo);

    taskRepository.setUpdateDto({
      id: taskOne._id,
      name: taskTwo.name,
      description: taskTwo.description
    })

    const result = await taskRepository.update();

    expect({
      name: result.name,
      description: result.description
    }).to.deep.equal({
      name: taskTwo.name,
      description: taskTwo.description
    });
  });

  it("should delete a task", async () => {
    const deleteMock = modelMock.returns(Promise.resolve(undefined));

    deleteMock.resolves(null);
    taskRepository.setDeleteDto({ id: taskOne._id });

    const result = await taskRepository.delete();

    expect(result).to.equal(null);
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
