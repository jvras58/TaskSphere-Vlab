'use client';

import { useQuery } from '@tanstack/react-query';

import { useSessionStore } from '@/modules/auth/stores/session-store';
import { ProjectCard } from './project-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/types';
import { getProjects } from '../util/project-api';

export function ProjectList() {
  const { session } = useSessionStore();

  const { data: projects=[], isLoading, refetch } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => getProjects(session!.accessToken),
    enabled: !!session?.accessToken,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-lg bg-white-50" />
        ))}
      </div>
    );
  }

    if (projects.length === 0) {
    return <p className="text-muted-foreground text-center mt-10">Nenhum projeto encontrado.</p>;
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onRefetch={refetch} />
      ))}
    </div>
  );
}
