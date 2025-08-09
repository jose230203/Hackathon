import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Café',
      version: '0.0.1',
      description: 'Documentación de la API del sistema de gestión de café',
    },
  },
  apis: ['./src/interfaces/routes/*.ts'], // Asegúrate de apuntar aquí correctamente
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
