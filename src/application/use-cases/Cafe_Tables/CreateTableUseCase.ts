import { ITableRepository } from "../../../domain/repositories/table.repository"
import { CafeTable } from "../../../domain/entities/table.entity";

export class CreateTableUseCase {
  constructor(private readonly repo: ITableRepository) {}

  async execute(table: Omit<CafeTable, "id">): Promise<void> {
    await this.repo.create(table);
  }
}