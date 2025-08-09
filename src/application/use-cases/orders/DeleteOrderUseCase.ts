import { IOrderRepository } from "../../../domain/repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";


export class DeleteOrderUseCase {
  constructor(private readonly repo: IOrderRepository) {}
  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}