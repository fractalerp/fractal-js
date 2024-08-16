import { expect } from "chai";
import * as sinon from "sinon";
import { TaskRepository } from "../../../public/repositories/task_repository";
import { taskOne, taskTwo } from "../../factories/tasks/task_data";

describe("Task Repository", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const taskRepository: TaskRepository = new TaskRepository();

  before(() => {
    modelMock = sandbox.stub();
    taskRepository.create = modelMock;
    taskRepository.read = modelMock;
    taskRepository.update = modelMock;
    taskRepository.delete = modelMock;
  });

  describe("find()", () => {

    context("when present", () => {

      it("should find one task", async () => {
        const findOneMock = modelMock.returns(Promise.resolve(taskOne));

        findOneMock.resolves(taskOne);

        const result = await taskRepository.read({ id: taskOne._id });

        expect(result).to.deep.equal(taskOne);
        expect(modelMock.calledWith({})).to.be.true;
      });
    });

    it("should find list of tasks", async () => {
      const findMock = modelMock.returns(Promise.resolve([taskOne, taskTwo]));

      findMock.resolves([taskOne, taskTwo]);

      const result = await taskRepository.read({});

      expect(result.length).to.equal(2);
      // TODO: this might be flaky
      expect(result[0]).to.deep.equal(taskOne);
      expect(findMock.calledWith({})).to.be.true;
    });

    context("when not present", () => {
      it("should return empty array", async () => {
        const findOneMock = modelMock.returns(Promise.resolve([]));

        findOneMock.resolves([]);

        const result = await taskRepository.read({ id: taskOne._id });

        expect(result).to.be.empty;
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
