import { ITableRepository } from '../../domain/repositories/table.repository';
import { CafeTable } from '../../domain/entities/table.entity';
import { db } from '../../../Backend/db';

export class TableRepositorySP implements ITableRepository {
  async create(table: Omit<CafeTable, 'id'>): Promise<void> {
    await db.query('CALL sp_create_cafe_table (?, ?)', [
      table.qr_code,
      table.location_description,
    ]);
  }

  async findAll(): Promise<CafeTable[]> {
    const [rows] = await db.query('CALL sp_read_cafe_tables()');
    return rows[0] as CafeTable[];
  }

  async update(table: CafeTable): Promise<void> {
    await db.query('CALL sp_update_cafe_table(?, ?, ?)', [
      table.id,
      table.qr_code,
      table.location_description,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query('CALL sp_delete_cafe_table(?)', [id]);
  }
}
