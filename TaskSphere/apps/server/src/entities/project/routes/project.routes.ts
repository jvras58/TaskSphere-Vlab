import { FastifyInstance } from 'fastify';
import { ProjectController } from '../controller/project.controller';

export default async function projectRoutes(fastify: FastifyInstance) {
  const controller = new ProjectController(fastify.prisma, fastify);

  // Criar Projeto
  fastify.post<{
    Body: { name: string; description?: string; startDate: string; endDate: string };
  }>('', {
    schema: {
      tags: ['Project'],
      summary: 'Cria um novo projeto',
      body: {
        type: 'object',
        required: ['name', 'startDate', 'endDate'],
        properties: {
          name: { type: 'string', minLength: 3 },
          description: { type: 'string', maxLength: 500 },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            startDate: { type: 'string' },
            endDate: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.create.bind(controller),
  });

  // Atualizar Projeto
  fastify.put<{
    Params: { id: string };
    Body: { name?: string; description?: string; startDate?: string; endDate?: string };
  }>('/:id', {
    schema: {
      tags: ['Project'],
      summary: 'Atualiza projeto existente',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 3 },
          description: { type: 'string', maxLength: 500 },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            startDate: { type: 'string' },
            endDate: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.update.bind(controller),
  });

  // Deletar Projeto
  fastify.delete<{
    Params: { id: string };
  }>('/:id', {
    schema: {
      tags: ['Project'],
      summary: 'Remove um projeto',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        204: { type: 'null' },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.delete.bind(controller),
  });

  // Adicionar Colaborador
  fastify.post<{
    Params: { id: string };
    Body: { collaboratorId: string };
  }>('/:id/collaborators', {
    schema: {
      tags: ['Project'],
      summary: 'Adiciona colaborador ao projeto',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        required: ['collaboratorId'],
        properties: {
          collaboratorId: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.addCollaborator.bind(controller),
  });

  // Remover Colaborador
  fastify.delete<{
    Params: { id: string };
    Body: { collaboratorId: string };
  }>('/:id/collaborators', {
    schema: {
      tags: ['Project'],
      summary: 'Remove colaborador do projeto',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        required: ['collaboratorId'],
        properties: {
          collaboratorId: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.removeCollaborator.bind(controller),
  });

  // Obter todos os projetos do usuário autenticado
  fastify.get('', {
    schema: {
      tags: ['Project'],
      summary: 'Lista todos os projetos do usuário',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string', nullable: true },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.getAll.bind(controller),
  });

  // Obter projeto por ID
  fastify.get<{
    Params: { id: string };
  }>('/:id', {
    schema: {
      tags: ['Project'],
      summary: 'Obtém um projeto pelo ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            startDate: { type: 'string' },
            endDate: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.getById.bind(controller),
});
}