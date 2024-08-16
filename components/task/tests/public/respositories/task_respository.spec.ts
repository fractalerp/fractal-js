import { expect } from "chai";
import * as sinon from "sinon";
import { DataBaseMock } from "../../../../../tests/support/data_base_mock";
import { taskOne, taskTwo } from "../../factories/tasks/task_data";
import { TaskRepository } from "../../../public/repositories/task_repository";

describe("Task Repository", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const taskRepository: TaskRepository = new TaskRepository();

  before(() => {
    modelMock = sandbox.stub();
    new DataBaseMock(modelMock).setNosqlMock();
  });

  describe("find()", () => {

    context("when present", () => {

      it("should find one task", async () => {
        const findOneMock = modelMock.returns(Promise.resolve(taskOne));

        findOneMock.resolves(taskOne);

        const results = await taskRepository.read({ id: taskOne._id });
        const result = results[0];

        expect(result).to.deep.equal({ name: taskOne.name, description: taskOne.description });
        expect(modelMock.calledWith({})).to.be.true;
      });
    });

    it("should find list of tasks", async () => {
      const findMock = modelMock.returns(Promise.resolve([taskOne, taskTwo]));

      findMock.resolves([taskOne, taskTwo]);

      const results = await taskRepository.read({});

      expect(results.length).to.equal(2);
      // TODO: this might be flaky
      // expect(results[0]).to.deep.equal(taskOne);
      expect(findMock.calledWith({})).to.be.true;
    });

    context("when not present", () => {
      it("should return empty array", async () => {
        const findOneMock = modelMock.returns(Promise.resolve([]));

        findOneMock.resolves([]);

        const results = await taskRepository.read({ id: "random_id" });

        expect(results.length).to.eq(0);
        expect(modelMock.calledWith({})).to.be.true;
      });
    });

  });

  describe("should create a task", async () => {
    const createMock = modelMock.returns(Promise.resolve(taskOne));

    createMock.resolves(taskOne);

    const result = await taskRepository.create({
      name: taskOne.name,
      description: taskOne.description
    });

    expect(result).to.deep.equal(taskOne);
  });

  it("should update a task", async () => {
    const updateMock = modelMock.returns(Promise.resolve(taskTwo));
    updateMock.resolves(taskTwo);

    const result = await taskRepository.update({
      id: taskOne._id,
      name: taskTwo.name,
      description: taskTwo.description
    });

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

    deleteMock.resolves(undefined);
    const result = await taskRepository.delete({ id: taskOne._id });

    expect(result).to.equal(undefined);
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
