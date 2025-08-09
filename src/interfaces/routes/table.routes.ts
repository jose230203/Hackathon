import express from 'express';
import {
  createTable,
  getAllTables,
  updateTable,
  deleteTable
} from '../controllers/table.controller';

const routeTable = express.Router();

routeTable.post('/tables', createTable);
/**
 * @swagger
 * /api/v1/tables:
 *   post:
 *     summary: Crear una nueva mesa
 *     tags: [Mesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - qr_code
 *             properties:
 *               qr_code:
 *                 type: string
 *               location_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mesa creada exitosamente
 */
routeTable.get('/tables', getAllTables);
/**
 * @swagger
 * /api/v1/tables:
 *   get:
 *     summary: Obtener todas las mesas
 *     tags: [Mesas]
 *     responses:
 *       200:
 *         description: Lista de mesas
 */
routeTable.put('/tables', updateTable);
/**
 * @swagger
 * /api/v1/tables:
 *   put:
 *     summary: Actualizar una mesa existente
 *     tags: [Mesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - qr_code
 *             properties:
 *               id:
 *                 type: integer
 *               qr_code:
 *                 type: string
 *               location_description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mesa actualizada exitosamente
 */
routeTable.delete('/tables/:id', deleteTable);
/**
 * @swagger
 * /api/v1/tables/{id}:
 *   delete:
 *     summary: Eliminar una mesa
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la mesa a eliminar
 *     responses:
 *       200:
 *         description: Mesa eliminada exitosamente
 */

export default routeTable;
