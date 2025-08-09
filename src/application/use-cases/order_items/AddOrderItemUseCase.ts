import { IOrderItemRepository } from "../../../domain/repositories/orderItem.repository";
import { OrderItem } from "../../../domain/entities/orderItem.entity";

export class CreateOrderItemUseCase {
  constructor(private readonly repo: IOrderItemRepository) {}
  async execute(item: Omit<OrderItem, "id">): Promise<void> {
    await this.repo.create(item);
  }
}