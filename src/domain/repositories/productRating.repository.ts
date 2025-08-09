import { ProductRating } from "@/domain/entities/productRating.entity";

export interface IProductRatingRepository {
  create(rating: Omit<ProductRating, 'id'>): Promise<void>;
  findAll(): Promise<ProductRating[]>;
  update(rating: ProductRating): Promise<void>;
  delete(id: number): Promise<void>;
}