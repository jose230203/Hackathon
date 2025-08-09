import { IOrderItemRepository } from '../../domain/repositories/orderItem.repository';
import { OrderItem } from '../../domain/entities/orderItem.entity';
import { db } from '../../../Backend/db';

export class OrderItemRepositorySP implements IOrderItemRepository {
  async create(item: Omit<OrderItem, 'id'>): Promise<void> {
    await db.query('CALL sp_create_order_item(?, ?, ?)', [
      item.order_id,
      item.product_id,
      item.quantity,
    ]);
  }

  async findAll(): Promise<OrderItem[]> {
    const [rows] = await db.query('CALL sp_read_order_items()');
    return rows[0] as OrderItem[];
  }

  async update(item: OrderItem): Promise<void> {
    await db.query('CALL sp_update_order_item(?, ?, ?, ?)', [
      item.id,
      item.order_id,
      item.product_id,
      item.quantity,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query('CALL sp_delete_order_item(?)', [id]);
  }
}
