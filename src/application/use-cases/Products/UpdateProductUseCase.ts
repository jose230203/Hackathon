import { IProductRepository } from '../../../domain/repositories/product.repository'
import { Product } from  "../../../domain/entities/product.entity"

// src/application/use-cases/product/updateProduct.usecase.ts
export class UpdateProductUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(product: Product): Promise<void> {
    await this.repo.update(product);
  }
}