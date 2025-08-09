import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller';

const routeOrder = express.Router();

routeOrder.post('/orders', createOrder);
/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table_id
 *               - customer_name
 *             properties:
 *               table_id:
 *                 type: integer
 *               customer_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 */
routeOrder.get('/orders', getAllOrders);
/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
routeOrder.put('/orders', updateOrder);
/**
 * @swagger
 * /api/v1/orders:
 *   put:
 *     summary: Actualizar un pedido existente
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - table_id
 *               - customer_name
 *             properties:
 *               id:
 *                 type: integer
 *               table_id:
 *                 type: integer
 *               customer_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 */
routeOrder.delete('/orders/:id', deleteOrder);
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Eliminar un pedido existente
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido a eliminar
 *     responses:
 *       204:
 *         description: Pedido eliminado exitosamente
 */

export default routeOrder;
