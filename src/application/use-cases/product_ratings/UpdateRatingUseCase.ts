import { IProductRatingRepository } from "../../../domain/repositories/productRating.repository";
import { ProductRating } from "../../../domain/entities/productRating.entity";

export class UpdateProductRatingUseCase {
  constructor(private readonly repo: IProductRatingRepository) {}
  async execute(rating: ProductRating): Promise<void> {
    await this.repo.update(rating);
  }
}