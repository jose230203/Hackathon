import  { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: Omit<Product, 'id'>): Promise<void>;
  findAll(): Promise<Product[]>;
  findByType(type: 'coffee' | 'pastry'): Promise<Product[]>;
  findByTypePaged(type: 'coffee' | 'pastry', limit: number, offset: number): Promise<Product[]>;
  update(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
  