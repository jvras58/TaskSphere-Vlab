'use client';

import { Badge, Pencil, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { format, isBefore, isAfter } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Project } from '@/types';
import { CreateEditProjectDialog } from './create-update-project-dialog';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useSessionStore } from '@/modules/auth/stores/session-store';
import { deleteProject } from '../util/project-api';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  project: Project;
  onRefetch?: () => void;
};

export function ProjectCard({ project, onRefetch }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const collaborators = project.collaborators ?? [];
  const { session } = useSessionStore();
  const queryClient = useQueryClient();


  const mutation = useMutation({
  mutationFn: async () => {
    await deleteProject(project.id, session!.accessToken);
 },
  onSuccess: () => {
    toast.success('Projeto deletado com sucesso!');
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    onRefetch?.();
 },
  onError: (err: any) => {
    toast.error('Erro ao deletar projeto', {
    description: err.message,
    });
 },
});

  // 💡 Cálculo de status com base nas datas
  const status = (() => {
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);

    if (isBefore(now, start)) return 'Agendado';
    if (isAfter(now, end)) return 'Finalizado';
    return 'Em andamento';
  })();

  const statusColor = {
    'Agendado': 'bg-yellow-200 text-yellow-800',
    'Em andamento': 'bg-blue-200 text-blue-800',
    'Finalizado': 'bg-green-200 text-green-800',
  }[status];

  const handleDelete = () => {
   mutation.mutate();
  };

  return (
    <>
      <Card className="p-6 shadow-sm border border-muted transition hover:shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditOpen(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDeleteOpen(true)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {format(new Date(project.startDate), 'dd/MM/yyyy')} –{' '}
            {format(new Date(project.endDate), 'dd/MM/yyyy')}
          </span>
          <Badge className={statusColor}>{status}</Badge>
        </div>

        {collaborators.length > 0 && (
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {collaborators.slice(0, 2).map((c) => (
            <Badge key={c.id} className="truncate max-w-[120px]">
                {c.name}
            </Badge>
            ))}
            {collaborators.length > 2 && (
            <span className="text-xs text-muted-foreground">
                +{collaborators.length - 2}
            </span>
            )}
        </div>
        )}
      </Card>

      <CreateEditProjectDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        defaultValues={project}
        onSuccess={() => {
          setEditOpen(false);
          onRefetch?.();
        }}
      />

       <ConfirmDialog
       title="Excluir projeto"
       description="Tem certeza que deseja excluir este projeto? Essa ação não pode ser desfeita."
       open={deleteOpen}
       onOpenChange={setDeleteOpen}
       onConfirm={handleDelete}
       />
    </>
  );
}
