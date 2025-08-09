import express from 'express';
import {
  createProductRating,
  getAllProductRatings,
  updateProductRating,
  deleteProductRating
} from '../controllers/productRating.controller';

const routeRating = express.Router();

routeRating.post('/product-ratings', createProductRating);
/**
 * @swagger
 * /api/v1/product-ratings:
 *   post:
 *     summary: Crear una nueva valoración de producto
 *     tags: [Valoraciones de Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - rating
 *               - comment
 *             properties:
 *               product_id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Valoración de producto creada exitosamente
 */
routeRating.get('/product-ratings', getAllProductRatings);
/**
 * @swagger
 * /api/v1/product-ratings:
 *   get:
 *     summary: Obtener todas las valoraciones de productos
 *     tags: [Valoraciones de Productos]
 *     responses:
 *       200:
 *         description: Lista de valoraciones de productos
 */
routeRating.put('/product-ratings', updateProductRating);
/**
 * @swagger
 * /api/v1/product-ratings/{id}:
 *   delete:
 *     summary: Eliminar una valoración de producto
 *     tags: [Valoraciones de Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la valoración de producto a eliminar
 *     responses:
 *       204:
 *         description: Valoración de producto eliminada exitosamente
 */
routeRating.delete('/product-ratings/:id', deleteProductRating);
/**
 * @swagger
 * /api/v1/product-ratings/{id}:
 *   delete:
 *     summary: Eliminar una valoración de producto
 *     tags: [Valoraciones de Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la valoración de producto a eliminar
 *     responses:
 *       204:
 *         description: Valoración de producto eliminada exitosamente
 */

export default routeRating;
