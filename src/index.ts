
import express from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger.setup'; // o .ts si usas TypeScript
import routeProduct from './interfaces/routes/product.routes';
import routeTable from './interfaces/routes/table.routes';
import routeOrder from './interfaces/routes/order.routes';
import routeOrderItem from './interfaces/routes/orderItem.routes';
import routeRating from './interfaces/routes/productRating.routes';

const server = express();
const baseUrl = '/api/v1'

server.use(cors());
server.use(express.json());

server.use(baseUrl, routeProduct);
server.use(baseUrl, routeTable);
server.use(baseUrl, routeOrder);
server.use(baseUrl, routeOrderItem);
server.use(baseUrl, routeRating);

setupSwagger(server);

server.listen(5000, () => {
  console.log('Servidor backend activo en http://localhost:5000/api-docs');
});
