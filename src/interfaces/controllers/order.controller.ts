import { Request, Response } from 'express';
import { OrderRepositorySP } from '../../infrastructure/stored-procedures/OrderRepositorySP';
import { CreateOrderUseCase } from '../../application/use-cases/orders/CreateOrderUseCase';
import { GetAllOrdersUseCase } from '../../application/use-cases/orders/GetAllOrdersUseCase';
import { UpdateOrderUseCase } from '../../application/use-cases/orders/UpdateOrderStatusUseCase';
import { DeleteOrderUseCase } from '../../application/use-cases/orders/DeleteOrderUseCase';

const repo = new OrderRepositorySP();

export const createOrder = async (req: Request, res: Response) => {
  const useCase = new CreateOrderUseCase(repo);
  await useCase.execute(req.body);
  res.status(201).send({ message: 'Order created successfully' });
};

export const getAllOrders = async (_: Request, res: Response) => {
  const useCase = new GetAllOrdersUseCase(repo);
  const orders = await useCase.execute();
  res.json(orders);
};

export const updateOrder = async (req: Request, res: Response) => {
  const useCase = new UpdateOrderUseCase(repo);
  await useCase.execute(req.body);
  res.send({ message: 'Order updated successfully' });
};

export const deleteOrder = async (req: Request, res: Response) => {
  const useCase = new DeleteOrderUseCase(repo);
  await useCase.execute(+req.params.id);
  res.send({ message: 'Order deleted successfully' });
};
