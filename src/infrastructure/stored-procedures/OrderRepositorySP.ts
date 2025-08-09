import { IOrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { db } from '../../../Backend/db';

export class OrderRepositorySP implements IOrderRepository {
  async create(order: Omit<Order, 'id' | 'order_time'>): Promise<void> {
    await db.query('CALL sp_create_order(?, ?)', [
      order.table_id,
      order.customer_name,
    ]);
  }

  async findAll(): Promise<Order[]> {
    const [rows] = await db.query('CALL sp_read_orders()');
    return rows[0] as Order[];
  }

  async update(order: Order): Promise<void> {
    await db.query('CALL sp_update_order(?, ?, ?, ?, ?)', [
      order.id,
      order.table_id,
      order.customer_name,
      order.order_time,
      order.status,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query('CALL sp_delete_order(?)', [id]);
  }
}
