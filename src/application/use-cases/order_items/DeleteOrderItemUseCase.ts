import { IOrderItemRepository } from "../../../domain/repositories/orderItem.repository";

export class DeleteOrderItemUseCase {
  constructor(private readonly repo: IOrderItemRepository) {}
  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}