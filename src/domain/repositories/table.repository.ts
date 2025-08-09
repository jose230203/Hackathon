import { CafeTable } from "@/domain/entities/table.entity";

export interface ITableRepository {
  create(table: Omit<CafeTable, 'id'>): Promise<void>;
  findAll(): Promise<CafeTable[]>;
  update(table: CafeTable): Promise<void>;
  delete(id: number): Promise<void>;
}