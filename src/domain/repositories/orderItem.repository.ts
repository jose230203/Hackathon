import { OrderItem } from "@/domain/entities/orderItem.entity";

export interface IOrderItemRepository {
  create(item: Omit<OrderItem, 'id'>): Promise<void>;
  findAll(): Promise<OrderItem[]>;
  update(item: OrderItem): Promise<void>;
  delete(id: number): Promise<void>;
}