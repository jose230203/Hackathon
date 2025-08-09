import { IOrderRepository } from "../../../domain/repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";

export class CreateOrderUseCase {
  constructor(private readonly repo: IOrderRepository) {}
  async execute(order: Omit<Order, "id" | "order_time">): Promise<void> {
    await this.repo.create(order);
  }
}