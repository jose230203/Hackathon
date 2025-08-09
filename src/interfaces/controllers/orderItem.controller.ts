import { Request, Response } from 'express';
import { OrderItemRepositorySP } from '../../infrastructure/stored-procedures/OrderItemRepositorySP';
import { CreateOrderItemUseCase } from '../../application/use-cases/order_items/AddOrderItemUseCase';
import { GetAllOrderItemsUseCase } from '../../application/use-cases/order_items/GetOrderItemsUseCase';
import { UpdateOrderItemUseCase } from '../../application/use-cases/order_items/UpdateOrderItemUseCase';
import { DeleteOrderItemUseCase } from '../../application/use-cases/order_items/DeleteOrderItemUseCase';

const repo = new OrderItemRepositorySP();

export const createOrderItem = async (req: Request, res: Response) => {
  const useCase = new CreateOrderItemUseCase(repo);
  await useCase.execute(req.body);
  res.status(201).send({ message: 'Order item created successfully' });
};

export const getAllOrderItems = async (_: Request, res: Response) => {
  const useCase = new GetAllOrderItemsUseCase(repo);
  const items = await useCase.execute();
  res.json(items);
};

export const updateOrderItem = async (req: Request, res: Response) => {
  const useCase = new UpdateOrderItemUseCase(repo);
  await useCase.execute(req.body);
  res.send({ message: 'Order item updated successfully' });
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  const useCase = new DeleteOrderItemUseCase(repo);
  await useCase.execute(+req.params.id);
  res.send({ message: 'Order item deleted successfully' });
};
