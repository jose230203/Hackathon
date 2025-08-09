import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API hackathon',
      version: '0.0.1',
      description: 'Documentación de la API hackathon',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: [
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, './interfaces/routes/*.js')
      : path.join(__dirname, '../src/interfaces/routes/*.ts'),
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
