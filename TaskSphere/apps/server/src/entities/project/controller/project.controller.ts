import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { ProjectService } from '../services/project.service';
import { CreateProjectBody, CreateProjectInput, UpdateProjectInput } from '../types';

export class ProjectController {
  private projectService: ProjectService;

  constructor(prisma: PrismaClient, fastify: FastifyInstance) {
    this.projectService = new ProjectService(prisma, fastify);
  }

  async create(
    request: FastifyRequest<{ Body: CreateProjectBody }>,
    reply: FastifyReply
    ) {
    try {
        const creatorId = (request.user as any).sub?.userId;
        if (!creatorId) {
          return reply.status(401).send({ message: 'Usuário não autenticado' });
        }
        const data: CreateProjectInput = { ...request.body, creatorId };
        const project = await this.projectService.createProject(data);
        reply.status(201).send(project);
    } catch (error) {
        reply.status(400).send({ message: (error as Error).message });
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }, Body: UpdateProjectInput }>, reply: FastifyReply) {
    try {
      const project = await this.projectService.getProjectById(request.params.id);
      if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado' });
      }
      if (project.creatorId !== ((request.user as any).sub?.userId)) {
        return reply.status(403).send({ message: 'Apenas o criador pode editar o projeto' });
      }
      const updated = await this.projectService.updateProject(request.params.id, request.body);
      reply.send(updated);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const project = await this.projectService.getProjectById(request.params.id);
      if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado' });
      }
      if (project.creatorId !== ((request.user as any).sub?.userId)) {
        return reply.status(403).send({ message: 'Apenas o criador pode excluir o projeto' });
      }
      await this.projectService.deleteProject(request.params.id);
      reply.status(200).send({ message: 'Projeto deletado com sucesso!' });
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  async addCollaborator(request: FastifyRequest<{ Params: { id: string }, Body: { collaboratorId: string } }>, reply: FastifyReply) {
    try {
      const project = await this.projectService.getProjectById(request.params.id);
      if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado' });
      }
      if (project.creatorId !== ((request.user as any).sub?.userId)) {
        return reply.status(403).send({ message: 'Apenas o criador pode adicionar colaboradores' });
      }
      await this.projectService.addCollaborator(request.params.id, request.body.collaboratorId);
      reply.status(200).send({ message: 'Colaborador adicionado' });
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  async removeCollaborator(request: FastifyRequest<{ Params: { id: string }, Body: { collaboratorId: string } }>, reply: FastifyReply) {
    try {
      const project = await this.projectService.getProjectById(request.params.id);
      if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado' });
      }
      if (project.creatorId !== ((request.user as any).sub?.userId)) {
        return reply.status(403).send({ message: 'Apenas o criador pode remover colaboradores' });
      }
      await this.projectService.removeCollaborator(request.params.id, request.body.collaboratorId);
      reply.status(200).send({ message: 'Colaborador removido' });
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const project = await this.projectService.getProjectById(request.params.id);
      if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado' });
      }
      reply.send(project);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request.user as any).sub?.userId;
      const projects = await this.projectService.getProjectsByUserId(userId);
      reply.send(projects);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }
}
