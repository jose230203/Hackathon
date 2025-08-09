import { IProductRepository } from '../../../domain/repositories/product.repository'
import { Product } from  "../../../domain/entities/product.entity"

export class DeleteProductUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}