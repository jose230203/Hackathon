import { IProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

export class GetProductsByTypePagedUseCase {
  constructor(private readonly repo: IProductRepository) {}
  async execute(type: 'coffee' | 'pastry', limit: number, offset: number): Promise<Product[]> {
    return this.repo.findByTypePaged(type, limit, offset);
  }
}