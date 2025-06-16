import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { CreateProjectInput, UpdateProjectInput } from '../types';

export class ProjectService {
  private prisma: PrismaClient;
  private fastify: FastifyInstance;

  constructor(prisma: PrismaClient, fastify: FastifyInstance) {
    this.prisma = prisma;
    this.fastify = fastify;
  }

  async createProject(data: CreateProjectInput) {
    return this.prisma.project.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async updateProject(id: string, data: UpdateProjectInput) {
    return this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        startDate: data.start_date ? new Date(data.start_date) : undefined,
        endDate: data.end_date ? new Date(data.end_date) : undefined,
      },
    });
  }

  async deleteProject(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async getProjectById(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        collaborators: true,
        creator: true,
      },
    });
  }

  async getAllProjects() {
    return this.prisma.project.findMany({
      include: {
        collaborators: true,
        creator: true,
      },
    });
  }

  async getProjectsByUserId(userId: string) {
    return this.prisma.project.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { collaborators: { some: { id: userId } } },
        ],
      },
      include: {
        collaborators: true,
        creator: true,
      },
    });
  }

  async addCollaborator(projectId: string, collaboratorId: string) {
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        collaborators: {
          connect: { id: collaboratorId },
        },
      },
    });
  }

  async removeCollaborator(projectId: string, collaboratorId: string) {
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        collaborators: {
          disconnect: { id: collaboratorId },
        },
      },
    });
  }
}
