import { Request, Response } from 'express';
import {CreateProductUseCase } from "../../application/use-cases/Products/create-product.usecase";
import { GetAllProductsUseCase } from "../../application/use-cases/Products/GetAllProductsUseCase";
import { UpdateProductUseCase } from "../../application/use-cases/Products/UpdateProductUseCase"
import { DeleteProductUseCase } from "../../application/use-cases/Products/DeleteProductUseCase";
import { ProductRepositorySP } from "../../infrastructure/stored-procedures/product.repository.sp";
import { GetProductsByTypeUseCase } from "../../application/use-cases/Products/GetProductsByTypeUseCase";
import { GetProductsByTypePagedUseCase } from "../../application/use-cases/Products/GetProductsByTypePagedUseCase";

const repo = new ProductRepositorySP();

export const createProduct = async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(repo);
  await useCase.execute(req.body);
  res.status(201).send({ message: 'Product created successfully' });
};


export const getAllProducts = async (req: Request, res: Response) => {
  const useCase = new GetAllProductsUseCase(repo);
  const data = await useCase.execute();
  res.json(data);
};

export const updateProduct = async (req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(repo);
  await useCase.execute(req.body);
  res.send({ message: 'Product updated successfully' });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const useCase = new DeleteProductUseCase(repo);
  await useCase.execute(+req.params.id);
  res.send({ message: 'Product deleted successfully' });
};

export const getProductsByType = async (req: Request, res: Response) => {
  const { product_type } = req.params;
  const useCase = new GetProductsByTypeUseCase(repo);
  const data = await useCase.execute(product_type as 'coffee' | 'pastry');
  res.json(data);
};


export const getProductsByTypePaged = async (req: Request, res: Response) => {
  const { product_type } = req.query;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  const useCase = new GetProductsByTypePagedUseCase(repo);
  const data = await useCase.execute(product_type as 'coffee' | 'pastry', limit, offset);
  res.json(data);
};