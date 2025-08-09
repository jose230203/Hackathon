import { ITableRepository } from "../../../domain/repositories/table.repository";

export class DeleteTableUseCase {
  constructor(private readonly repo: ITableRepository) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}