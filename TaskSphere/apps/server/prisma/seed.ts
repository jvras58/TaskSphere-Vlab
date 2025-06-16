import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

export const roles = [
  {
    id: 1,
    name: 'Administrador',
  },
  {
    id: 2,
    name: 'Usuario Padrão',
  },
];

export const permissions = [
  {
    id: 1,
    role_id: 1,
    action: 'manage',
    subject: 'all',
  },
  {
    id: 2,
    role_id: 2,
    action: 'manage',
    subject: 'taskRequest',
  },
  {
    id: 3,
    role_id: 2,
    action: 'read',
    subject: 'User',
  },
  {
    id: 4,
    role_id: 2,
    action: 'update',
    subject: 'User',
  },
];

async function seedRoles() {
  for await (const role of roles) {
    const roleAttrs = structuredClone(role) as { id?: number; name: string };
    delete roleAttrs.id;
    await prisma.role.upsert({
      where: { id: role.id },
      create: roleAttrs,
      update: roleAttrs,
    });
  }
}

async function seedPermissions() {
  for await (const permission of permissions) {
    const permissionAttrs = structuredClone(permission) as {
      id?: number;
      role_id: number;
      action: string;
      subject: string;
    };
    delete permissionAttrs.id;
    await prisma.permission.upsert({
      where: { id: permission.id },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }
}

async function seedUsers() {
  const adminDev = {
    name: 'jvras',
    email: 'jvras@cin.ufpe.br',
    bio: 'Desenvolvedor Administrador.',
    image: faker.image.avatar(),
    password: await hash('123456'),
    role_id: 1,
  };

  const adminUser = {
    name: 'vlab',
    email: 'vlab@admin.ufpe.br',
    bio: 'Administrador do sistema com acesso total.',
    image: faker.image.avatar(),
    password: await hash('123456'),
    role_id: 1,
  };

  const clientUser = {
    name: 'Jonh Doe',
    email: 'jonh@doe.com',
    bio: 'Usuario padrão.',
    image: faker.image.avatar(),
    password: await hash('123456'),
    role_id: 2,
  };

  await prisma.user.createMany({
    data: [adminDev, adminUser, clientUser],
  });
}

async function seedProjects() {
  const users = await prisma.user.findMany();
  const [adminDevUser, adminUserUser, clientUserUser] = users;

  const projects = [
    {
      name: 'Sistema de Gerenciamento de Tarefas',
      description: 'Projeto para facilitar a organização de atividades.',
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      creatorId: adminDevUser.id,
      collaborators: [adminUserUser.id, clientUserUser.id],
    },
    {
      name: 'Plataforma de Cursos Online',
      description: 'Projeto de ensino a distância com videoaulas e quizzes.',
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      creatorId: adminUserUser.id,
      collaborators: [clientUserUser.id],
    },
  ];

  for (const projectData of projects) {
    const { collaborators, ...projectInfo } = projectData;

    await prisma.project.create({
      data: {
        ...projectInfo,
        collaborators: {
          connect: collaborators.map((id) => ({ id })),
        },
      },
    });
  }
}

async function seedTasks() {
  const projects = await prisma.project.findMany();
  const users = await prisma.user.findMany();

  for (const project of projects) {
    for (let i = 0; i < 5; i++) {
      const taskCreator = faker.helpers.arrayElement(users);
      await prisma.task.create({
        data: {
          title: faker.hacker.phrase(),
          status: faker.helpers.arrayElement(['To Do', 'In Progress', 'Done']),
          description: faker.lorem.paragraph(),
          dueDate: faker.date.soon(),
          imageUrl: faker.image.urlPicsumPhotos(),
          creatorId: taskCreator.id,
          projectId: project.id,
        },
      });
    }
  }
}

async function main() {
  try {
    await seedRoles();
    await seedPermissions();
    await seedUsers();
    await seedProjects();
    await seedTasks();
    console.log('✅ Seed finalizado com sucesso!');
  } catch (e) {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();