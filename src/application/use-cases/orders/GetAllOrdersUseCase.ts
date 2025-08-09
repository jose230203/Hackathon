import { IOrderRepository } from "../../../domain/repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";

export class GetAllOrdersUseCase {
  constructor(private readonly repo: IOrderRepository) {}
  async execute(): Promise<Order[]> {
    return this.repo.findAll();
  }
}