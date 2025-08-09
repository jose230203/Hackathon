import { IProductRepository } from "../../domain/repositories/product.repository"
import { Product } from "../../domain/entities/product.entity"
import { db} from '../../../Backend/db';

export class ProductRepositorySP implements IProductRepository {
  async create(product: Omit<Product, 'id'>): Promise<void> {
    await db.query('CALL sp_create_product(?, ?, ?, ?, ?)', [
      product.name,
      product.description,
      product.price,
      product.product_type,
      product.image,
    ]);
  }

  async findAll(): Promise<Product[]> {
    const [rows] = await db.query('CALL sp_read_products()');
    return rows[0] as Product[];
  }

  async update(product: Product): Promise<void> {
    await db.query('CALL sp_update_product(?, ?, ?, ?, ?)', [
      product.id,
      product.name,
      product.description,
      product.price,
      product.product_type,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query('CALL sp_delete_product(?)', [id]);
  }

  async findByType(type: string): Promise<Product[]> {
  const [rows] = await db.query('CALL sp_read_products_by_type(?)', [type]);
  return rows[0] as Product[];
}

async findByTypePaged(type: string, limit: number, offset: number): Promise<Product[]> {
  const [rows] = await db.query('CALL sp_read_products_by_type_paged(?, ?, ?)', [
    type,
    limit,
    offset,
  ]);
  return rows[0] as Product[];
}
}
