'use client';

import { useQuery } from '@tanstack/react-query';

import { useSessionStore } from '@/modules/auth/stores/session-store';
import { TaskCard } from './task-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Task } from '@/types';
import { getTasksByProject } from '../util/task-api';

type Props = {
  projectId: string;
};

export function TaskList({ projectId }: Props) {
  const { session } = useSessionStore();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery<Task[]>({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProject(projectId, session!.accessToken),
    enabled: !!session?.accessToken && !!projectId,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground text-center mt-10">
        Nenhuma tarefa encontrada.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onRefetch={refetch} />
      ))}
    </div>
  );
}
