import { IOrderItemRepository } from "../../../domain/repositories/orderItem.repository";
import { OrderItem } from "../../../domain/entities/orderItem.entity";

export class GetAllOrderItemsUseCase {
  constructor(private readonly repo: IOrderItemRepository) {}
  async execute(): Promise<OrderItem[]> {
    return this.repo.findAll();
  }
}