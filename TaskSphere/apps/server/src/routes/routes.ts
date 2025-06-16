import { FastifyInstance } from 'fastify';
import authRoutes from '../entities/auth/routes/auth.routes';
import userRoutes from '../entities/user/routes/user.routes';


export async function registerRoutes(app: FastifyInstance) {
  // Registering routes
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(userRoutes, { prefix: '/api/user' });

  // health check route
  app.get('/', {
    schema: {
      description: 'Root Health Check',
      tags: ['General'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (_request, reply) => {
      reply.send({ message: 'API ONLINE!' });
    },
  });
}