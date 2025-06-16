import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { TaskService } from '../services/task.service';
import { CreateTaskInput, UpdateTaskInput } from '../types';

export class TaskController {
  private taskService: TaskService;

  constructor(prisma: PrismaClient, fastify: FastifyInstance) {
    this.taskService = new TaskService(prisma, fastify);
  }

  async getByProjectId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const projectId = request.params.id;
    const userId = (request.user as any).sub?.userId;

    const isAllowed = await this.taskService.isUserInProject(projectId, userId);
    if (!isAllowed) {
      return reply.status(403).send({ message: 'Acesso negado' });
    }

    const tasks = await this.taskService.getTasksByProjectId(projectId);
    return reply.send(tasks);
  }

  async create(request: FastifyRequest<{ Params: { id: string }; Body: CreateTaskInput }>, reply: FastifyReply) {
    const projectId = request.params.id;
    const userId = (request.user as any).sub?.userId;

    const isAllowed = await this.taskService.isUserInProject(projectId, userId);
    if (!isAllowed) {
      return reply.status(403).send({ message: 'Apenas colaboradores podem criar tarefas' });
    }

    const task = await this.taskService.createTask(projectId, userId, request.body);
    reply.status(201).send(task);
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: UpdateTaskInput }>, reply: FastifyReply) {
    const task = await this.taskService.getTaskById(request.params.id);
    if (!task) return reply.status(404).send({ message: 'Tarefa não encontrada' });

    const userId = (request.user as any).sub?.userId;
    const isOwner = task.creatorId === userId || task.project.creatorId === userId;

    if (!isOwner) {
      return reply.status(403).send({ message: 'Apenas o criador ou dono do projeto pode editar' });
    }

    const updated = await this.taskService.updateTask(task.id, request.body);
    reply.send(updated);
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const task = await this.taskService.getTaskById(request.params.id);
    if (!task) return reply.status(404).send({ message: 'Tarefa não encontrada' });

    const userId = (request.user as any).sub?.userId;
    const isOwner = task.creatorId === userId || task.project.creatorId === userId;

    if (!isOwner) {
      return reply.status(403).send({ message: 'Apenas o criador ou dono do projeto pode excluir' });
    }

    await this.taskService.deleteTask(task.id);
    reply.status(204).send();
  }

  async assign(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const taskId = request.params.id;
    const userId = (request.user as any).sub?.userId;

    const task = await this.taskService.getTaskById(taskId);
    if (!task) return reply.status(404).send({ message: 'Tarefa não encontrada' });

    const isAllowed = await this.taskService.isUserInProject(task.projectId, userId);
    if (!isAllowed) return reply.status(403).send({ message: 'Apenas colaboradores podem assumir tarefas' });

    if (task.assigneeId === userId) {
      return reply.status(400).send({ message: 'Você já assumiu essa tarefa' });
    }

    await this.taskService.assignTask(taskId, userId);
    reply.send({ message: 'Tarefa assumida com sucesso' });
}
}
