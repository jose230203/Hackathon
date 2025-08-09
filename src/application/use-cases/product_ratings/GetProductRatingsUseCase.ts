import { IProductRatingRepository } from "../../../domain/repositories/productRating.repository";
import { ProductRating } from "../../../domain/entities/productRating.entity";

export class GetAllProductRatingsUseCase {
  constructor(private readonly repo: IProductRatingRepository) {}
  async execute(): Promise<ProductRating[]> {
    return this.repo.findAll();
  }
}