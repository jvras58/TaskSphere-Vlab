import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { CreateTaskInput, UpdateTaskInput } from '../types';

export class TaskService {
  private prisma: PrismaClient;
  private fastify: FastifyInstance;

  constructor(prisma: PrismaClient, fastify: FastifyInstance) {
    this.prisma = prisma;
    this.fastify = fastify;
  }

  async getTasksByProjectId(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
      include: { creator: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  async isUserInProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true },
    });

    if (!project) return false;

    const isCreator = project.creatorId === userId;
    const isCollaborator = project.collaborators.some((u) => u.id === userId);

    return isCreator || isCollaborator;
  }

  async getTaskById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        creator: true,
        project: true,
      },
    });
  }

  async createTask(projectId: string, userId: string, data: CreateTaskInput) {
    return this.prisma.task.create({
      data: {
        ...data,
        projectId,
        dueDate: new Date(data.dueDate),
        creatorId: userId,
      },
    });
  }

  async updateTask(id: string, data: UpdateTaskInput) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
    });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
  
  async assignTask(taskId: string, userId: string) {
  return this.prisma.task.update({
    where: { id: taskId },
    data: { assigneeId: userId },
  });
}

}
