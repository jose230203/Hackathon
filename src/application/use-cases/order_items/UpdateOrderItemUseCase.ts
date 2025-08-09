import { IOrderItemRepository } from "../../../domain/repositories/orderItem.repository";
import { OrderItem } from "../../../domain/entities/orderItem.entity";

export class UpdateOrderItemUseCase {
  constructor(private readonly repo: IOrderItemRepository) {}
  async execute(item: OrderItem): Promise<void> {
    await this.repo.update(item);
  }
}