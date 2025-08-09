import { Request, Response } from 'express';
import { ProductRatingRepositorySP } from '../../infrastructure/stored-procedures/ProductRatingRepositorySP';
import { CreateProductRatingUseCase } from '../../application/use-cases/product_ratings/RateProductUseCase';
import { GetAllProductRatingsUseCase } from '../../application/use-cases/product_ratings/GetProductRatingsUseCase';
import { UpdateProductRatingUseCase } from '../../application/use-cases/product_ratings/UpdateRatingUseCase';
import { DeleteProductRatingUseCase } from '../../application/use-cases/product_ratings/DeleteRatingUseCase';

const repo = new ProductRatingRepositorySP();

export const createProductRating = async (req: Request, res: Response) => {
  const useCase = new CreateProductRatingUseCase(repo);
  await useCase.execute(req.body);
  res.status(201).send({ message: 'Product rating created successfully' });
};

export const getAllProductRatings = async (_: Request, res: Response) => {
  const useCase = new GetAllProductRatingsUseCase(repo);
  const ratings = await useCase.execute();
  res.json(ratings);
};

export const updateProductRating = async (req: Request, res: Response) => {
  const useCase = new UpdateProductRatingUseCase(repo);
  await useCase.execute(req.body);
  res.send({ message: 'Product rating updated successfully' });
};

export const deleteProductRating = async (req: Request, res: Response) => {
  const useCase = new DeleteProductRatingUseCase(repo);
  await useCase.execute(+req.params.id);
  res.send({ message: 'Product rating deleted successfully' });
};
