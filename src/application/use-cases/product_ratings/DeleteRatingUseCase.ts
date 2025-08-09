import { IProductRatingRepository } from "../../../domain/repositories/productRating.repository";

export class DeleteProductRatingUseCase {
  constructor(private readonly repo: IProductRatingRepository) {}
  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}