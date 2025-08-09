import { IProductRatingRepository } from "../../../domain/repositories/productRating.repository";
import { ProductRating } from "../../../domain/entities/productRating.entity";

export class CreateProductRatingUseCase {
  constructor(private readonly repo: IProductRatingRepository) {}
  async execute(rating: Omit<ProductRating, "id">): Promise<void> {
    await this.repo.create(rating);
  }
}