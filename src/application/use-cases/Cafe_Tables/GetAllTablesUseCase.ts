import { ITableRepository } from "../../../domain/repositories/table.repository";
import { CafeTable } from "../../../domain/entities/table.entity";

export class GetAllTablesUseCase {
  constructor(private readonly repo: ITableRepository) {}

  async execute(): Promise<CafeTable[]> {
    return this.repo.findAll();
  }
}
