import { FastifyInstance } from 'fastify';
import { TaskController } from '../controller/task.controller';

export default async function taskRoutes(fastify: FastifyInstance) {
  const controller = new TaskController(fastify.prisma, fastify);

  // Obter todas as tarefas de um projeto
  fastify.get<{
    Params: { id: string };
  }>('/projects/:id/tasks', {
    schema: {
      tags: ['Task'],
      summary: 'Lista todas as tarefas de um projeto',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string', nullable: true },
              status: { type: 'string' },
              dueDate: { type: 'string', format: 'date' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.getByProjectId.bind(controller),
  });

  // Criar nova tarefa em um projeto
  fastify.post<{
    Params: { id: string };
    Body: {
      title: string;
      status: 'todo' | 'in_progress' | 'done';
      dueDate: string;
      imageUrl: string;
      description?: string;
    };
  }>('/projects/:id/tasks', {
    schema: {
      tags: ['Task'],
      summary: 'Cria uma nova tarefa em um projeto',
      description: 'Cria uma nova tarefa vinculada a um projeto existente. Requer autenticação via Bearer Token.',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do projeto' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['title', 'status', 'dueDate', 'imageUrl'],
        properties: {
          title: { type: 'string', minLength: 3, description: 'Título da tarefa' },
          description: { type: 'string', maxLength: 1000, description: 'Descrição detalhada da tarefa' },
          status: { type: 'string', enum: ['todo', 'in_progress', 'done'], description: 'Status da tarefa' },
          dueDate: { type: 'string', format: 'date', description: 'Data de entrega' },
          imageUrl: { type: 'string', description: 'URL da imagem da tarefa' },
        },
      },
      response: {
        201: {
          description: 'Tarefa criada com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            status: { type: 'string' },
            dueDate: { type: 'string' },
            imageUrl: { type: 'string' },
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

  // Atualizar tarefa existente
  fastify.put<{
    Params: { id: string };
    Body: {
      title?: string;
      description?: string;
      status?: 'todo' | 'in_progress' | 'done';
      dueDate?: string;
      imageUrl?: string;
    };
  }>('/:id', {
    schema: {
      tags: ['Task'],
      summary: 'Atualiza uma tarefa existente',
      description: 'Atualiza os dados de uma tarefa. Apenas o criador ou dono do projeto pode editar.',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da tarefa' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 3, description: 'Título da tarefa' },
          description: { type: 'string', maxLength: 1000, description: 'Descrição detalhada da tarefa' },
          status: { type: 'string', enum: ['todo', 'in_progress', 'done'], description: 'Status da tarefa' },
          dueDate: { type: 'string', format: 'date', description: 'Data de entrega' },
          imageUrl: { type: 'string', description: 'URL da imagem da tarefa' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            status: { type: 'string' },
            dueDate: { type: 'string' },
            imageUrl: { type: 'string' },
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

  // Deletar tarefa
  fastify.delete<{
    Params: { id: string };
  }>('/:id', {
    schema: {
      tags: ['Task'],
      summary: 'Remove uma tarefa',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        204: {
          description: 'Tarefa removida com sucesso',
          type: 'null',
        },
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: controller.delete.bind(controller),
  });
}
