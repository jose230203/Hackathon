import { ITableRepository } from "../../../domain/repositories/table.repository";
import { CafeTable } from "../../../domain/entities/table.entity";

export class UpdateTableUseCase {
  constructor(private readonly repo: ITableRepository) {}

  async execute(table: CafeTable): Promise<void> {
    await this.repo.update(table);
  }
}