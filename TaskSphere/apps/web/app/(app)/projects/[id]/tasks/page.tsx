'use client';

import { useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ContentLayout } from '@/components/content-layout';
import Link from 'next/link';
import { CreateEditTaskDialog } from '@/modules/task/components/create-update-task-dialog';
import { TaskList } from '@/modules/task/components/task-list';
import { notFound } from 'next/navigation';

export default function ProjectTasksPage() {
  const params = useParams();
  const projectId = params?.id as string;

  if (!projectId) return notFound();

  return (
    <ContentLayout className="pt-8 pb-8 px-4 sm:px-8" title="Tarefas">
      <div className="flex w-full justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projetos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tarefas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateEditTaskDialog projectId={projectId} />
      </div>

      <div className="mx-10 mt-10 mb-10 space-y-28">
        <TaskList projectId={projectId} />
      </div>
    </ContentLayout>
  );
}
