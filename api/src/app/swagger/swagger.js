// const swaggerJSDoc = require('swagger-jsdoc');
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Peter Sherk\'s REST API',
    version: '1.0.0',
    description: 'An API to give content to my personal website.',
    license: {
      name: 'GNU General Public License v3',
      url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
    },
    contact: {
      name: 'Peter Sherk',
      url: 'https://petersherk.com',
      email: 'peter@petersherk.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:8000/api/v1',
      description: 'Development server'
    },
    {
      url: 'https://api.petersherk.com/api/v1',
      description: 'Production server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['**/models/*.js', '**/responses/*.js', '**/router.js']
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;