import { IProductRepository } from '../../../domain/repositories/product.repository'
import { Product } from  "../../../domain/entities/product.entity"

// src/application/use-cases/product/getAllProducts.usecase.ts
export class GetAllProductsUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repo.findAll();
  }
}