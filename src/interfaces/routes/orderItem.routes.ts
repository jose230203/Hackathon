import express from 'express';
import {
  createOrderItem,
  getAllOrderItems,
  updateOrderItem,
  deleteOrderItem
} from '../controllers/orderItem.controller';

const routeOrderItem = express.Router();

routeOrderItem.post('/order-items', createOrderItem);
/**
 * @swagger
 * /api/v1/order-items:
 *   post:
 *     summary: Crear un nuevo item de pedido
 *     tags: [Items de Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - product_id
 *               - quantity
 *             properties:
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item de pedido creado exitosamente
 */
routeOrderItem.get('/order-items', getAllOrderItems);
/**
 * @swagger
 * /api/v1/order-items:
 *   get:
 *     summary: Obtener todos los items de pedido
 *     tags: [Items de Pedido]
 *     responses:
 *       200:
 *         description: Lista de items de pedido
 */
routeOrderItem.put('/order-items', updateOrderItem);
/**
 * @swagger
 * /api/v1/order-items:
 *   put:
 *     summary: Actualizar un item de pedido existente
 *     tags: [Items de Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - order_id
 *               - product_id
 *               - quantity
 *             properties:
 *               id:
 *                 type: integer
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 */
routeOrderItem.delete('/order-items/:id', deleteOrderItem);
/**
 * @swagger
 * /api/v1/order-items/{id}:
 *   delete:
 *     summary: Eliminar un item de pedido
 *     tags: [Items de Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item de pedido a eliminar
 *     responses:
 *       204:
 *         description: Item de pedido eliminado exitosamente
 */

export default routeOrderItem;
