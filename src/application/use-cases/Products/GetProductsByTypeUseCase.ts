import { IProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

export class GetProductsByTypeUseCase {
  constructor(private readonly repo: IProductRepository) {}
  async execute(type: "coffee" | "pastry"): Promise<Product[]> {
    return this.repo.findByType(type);
  }
}