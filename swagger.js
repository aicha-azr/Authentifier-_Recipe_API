const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // Spécification OpenAPI utilisée
    info: {
      title: 'Recipe_API',
      version: '1.0.0',
      description: 'avoir l\'acces à le livre de recette aprés s\'être authentifié  ',
    },
  },
  apis: ['./Router/*.js'], // Spécifiez ici les chemins de vos fichiers contenant les commentaires JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};