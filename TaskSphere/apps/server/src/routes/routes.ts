import { FastifyInstance } from 'fastify';
import authRoutes from '../entities/auth/routes/auth.routes';
import userRoutes from '../entities/user/routes/user.routes';
import projectRoutes from '../entities/project/routes/project.routes';
import taskRoutes from '../entities/tasks/routes/task.routes';


export async function registerRoutes(app: FastifyInstance) {
  // Registering routes
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(userRoutes, { prefix: '/api/user' });
  await app.register(projectRoutes, { prefix: '/api/projects' });
  await app.register(taskRoutes, { prefix: '/api/tasks' });

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