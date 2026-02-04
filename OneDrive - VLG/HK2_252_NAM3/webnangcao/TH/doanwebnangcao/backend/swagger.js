const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Netflix Clone API',
      version: '1.0.0',
      description: 'API documentation for Netflix Clone application',
      contact: {
        name: 'Developer',
        email: 'dev@netflix-clone.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Next.js Development Server'
      },
      {
        url: 'http://localhost:4000',
        description: 'Backend Development Server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'string' },
            favoriteIds: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Movie: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            videoUrl: { type: 'string' },
            thumbnailUrl: { type: 'string' },
            genre: { type: 'string' },
            duration: { type: 'number' },
            releaseDate: { type: 'string', format: 'date' },
            rating: { type: 'number' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'next-auth.session-token'
        }
      }
    }
  },
  apis: ['./server.js', './routes/*.js', '../web/pages/api/**/*.ts', '../web/pages/api/**/*.js']
};

module.exports = swaggerJsdoc(options);
