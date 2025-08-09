import { IOrderRepository } from "../../../domain/repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";

export class UpdateOrderUseCase {
  constructor(private readonly repo: IOrderRepository) {}
  async execute(order: Order): Promise<void> {
    await this.repo.update(order);
  }
}