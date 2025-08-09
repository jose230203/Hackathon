import { IProductRepository } from '../../../domain/repositories/product.repository'
import { Product } from  "../../../domain/entities/product.entity"

export class CreateProductUseCase {
  constructor(private repo: IProductRepository) {}

  async execute(input: Omit<Product, 'id'>): Promise<void> {
    await this.repo.create(input);
  }
}
