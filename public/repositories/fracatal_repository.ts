/* eslint-disable @typescript-eslint/no-explicit-any */
export class FractalRepository {
  private createDto: any;
  private readDto: any;
  private updateDto: any;
  private deleteDto: any;
  private mapper: any;
  private model: any;

  constructor() {
    this.createDto = {};
    this.readDto = {};
    this.updateDto = {};
    this.deleteDto = {};
    this.mapper = {};
    this.model = {};
  }

  setCreateDto(createDto: any): FractalRepository {
    this.createDto = createDto;
    return this;
  }

  setReadDto(readDto: any): FractalRepository {
    this.readDto = readDto;
    return this;
  }

  setUpdateDto(updateDto: any): FractalRepository {
    this.updateDto = updateDto;
    return this;
  }

  setDeleteDto(deleteDto: any): FractalRepository {
    this.deleteDto = deleteDto;
    return this;
  }

  setMapper(mapper: any): FractalRepository {
    this.mapper = mapper;
    return this;
  }

  setModel(model: any): FractalRepository {
    this.model = model;
    return this;
  }

  create = async (): Promise<any> => {
    const record = await this.model.create({ ...this.createDto });

    return this.mapper.fromModel(record);
  }

  read = async (): Promise<object[] | never[] | undefined | any[]> => {
    if (this.readDto.id !== undefined) {
      const record = await this.model.findOne({ id: this.readDto.id });

      return record._id || record.id ? [this.mapper.fromModel(record)] : [];
    }

    const records = await this.model
      .find({ ...this.readDto });

    const entities = records && records.map(
      (record: any) => this.mapper
        .fromModel(record)
    );

    return entities ?? []
  };

  update = async (): Promise<object | null | any> => {

    const updatedRecord = await this.model
      .update(this.updateDto.id as string, {
        ...this.updateDto
      });

    return updatedRecord
      ? this.mapper.fromModel(updatedRecord)
      : null;
  }

  delete = async (): Promise<object | null | any> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* eslint @typescript-eslint/no-unused-vars: 0 */
    const deletedRecord = await this.model.delete(this.deleteDto.id as string);

    return deletedRecord
      ? this.mapper.fromModel(deletedRecord)
      : null;
  }
}
