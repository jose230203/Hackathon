import express from 'express';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByType,
  getProductsByTypePaged

} from '../controllers/product.controller';

const routeProduct = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - product_type
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               product_type:
 *                 type: string
 *                 enum: [coffee, pastry]
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
routeProduct.post('/products', createProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
routeProduct.get('/products', getAllProducts);

/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - price
 *               - product_type
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               product_type:
 *                 type: string
 *                 enum: [coffee, pastry]
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
routeProduct.put('/products', updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */

routeProduct.delete('/products/:id', deleteProduct);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */


routeProduct.get('/products', getAllProducts);
/**
 * @swagger
 * /api/v1/products/type/{product_type}:
 *   get:
 *     summary: Obtener productos por tipo
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: product_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [coffee, pastry]
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por tipo
 */

routeProduct.get('/products/type/:product_type', getProductsByType);
/**
 * @swagger
 * /api/v1/products/paginated:
 *   get:
 *     summary: Obtener productos por tipo con paginación
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: product_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [coffee, pastry]
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por tipo con paginación
 */
routeProduct.get('/products/paginated', getProductsByTypePaged);
/** 
 * @swagger
 * /api/v1/products/type/{product_type}:
 *   get:
 *     summary: Obtener productos por tipo
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: product_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [coffee, pastry]
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por tipo
 */


export default routeProduct;
