import { IProductRatingRepository } from '../../domain/repositories/productRating.repository';
import { ProductRating } from '../../domain/entities/productRating.entity';
import { db } from '../../../Backend/db';

export class ProductRatingRepositorySP implements IProductRatingRepository {
  async create(rating: Omit<ProductRating, 'id'>): Promise<void> {
    await db.query('CALL sp_create_rating (?, ?, ?)', [
      rating.product_id,
      rating.rating,
      rating.review,
    ]);
  }

  async findAll(): Promise<ProductRating[]> {
    const [rows] = await db.query('CALL sp_read_product_ratings ()');
    return rows[0] as ProductRating[];
  }

  async update(rating: ProductRating): Promise<void> {
    await db.query('CALL sp_update_rating(?, ?, ?, ?)', [
      rating.id,
      rating.product_id,
      rating.rating,
      rating.review,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query('CALL sp_delete_rating(?)', [id]);
  }
}
