'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/modules/project/util/project-api';
import { getTasksByProject } from '@/modules/task/util/task-api';
import { useSessionStore } from '@/modules/auth/stores/session-store';
import { useMemo } from 'react';

interface DashboardCardProps {
  title: string;
  queryKey: 'projects' | 'tasks';
  filter?: 'todo' | 'done';
  className?: string;
}

export function DashboardCard({ title, queryKey, filter, className }: DashboardCardProps) {
  const { session } = useSessionStore();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      if (!session?.accessToken) return [];
      if (queryKey === 'projects') return getProjects(session.accessToken);
      if (queryKey === 'tasks') return getTasksByProject('all', session.accessToken);
      return [];
    },
    enabled: !!session?.accessToken,
  });

    const value = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    if (queryKey === 'projects') return safeData.length;
    if (queryKey === 'tasks') {
        if (filter) return safeData.filter((task: any) => task.status === filter).length;
        return safeData.length;
    }
    return 0;
    }, [data, queryKey, filter]);

  return (
    <Card className={cn('p-6 flex justify-between items-center', className)}>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        {isLoading ? <Skeleton className="h-6 w-16" /> : <p className="text-xl font-semibold">{value}</p>}
      </div>
    </Card>
  );
}
