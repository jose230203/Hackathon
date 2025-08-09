import { Order } from "@/domain/entities/order.entity";

export interface IOrderRepository {
  create(order: Omit<Order, 'id' | 'order_time'>): Promise<void>;
  findAll(): Promise<Order[]>;
  update(order: Order): Promise<void>;
  delete(id: number): Promise<void>;
}