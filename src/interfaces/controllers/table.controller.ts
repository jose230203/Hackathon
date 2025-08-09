import { Request, Response } from 'express';
import { CreateTableUseCase } from '../../application/use-cases/Cafe_Tables/CreateTableUseCase';
import { GetAllTablesUseCase } from '../../application/use-cases/Cafe_Tables/GetAllTablesUseCase';
import { UpdateTableUseCase } from '../../application/use-cases/Cafe_Tables/UpdateTableUseCase';
import { DeleteTableUseCase } from '../../application/use-cases/Cafe_Tables/DeleteTableUseCase';
import { TableRepositorySP } from '../../infrastructure/stored-procedures/TableRepositorySP';

const repo = new TableRepositorySP();

export const createTable = async (req: Request, res: Response) => {
  const useCase = new CreateTableUseCase(repo);
  await useCase.execute(req.body);
  res.status(201).send({ message: 'Table created successfully' });
};

export const getAllTables = async (_: Request, res: Response) => {
  const useCase = new GetAllTablesUseCase(repo);
  const tables = await useCase.execute();
  res.json(tables);
};

export const updateTable = async (req: Request, res: Response) => {
  const useCase = new UpdateTableUseCase(repo);
  await useCase.execute(req.body);
  res.send({ message: 'Table updated successfully' });
};

export const deleteTable = async (req: Request, res: Response) => {
  const useCase = new DeleteTableUseCase(repo);
  await useCase.execute(+req.params.id);
  res.send({ message: 'Table deleted successfully' });
};
