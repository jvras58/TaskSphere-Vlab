'use client';

import { Badge, Pencil, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Task } from '@/types';
import { CreateEditTaskDialog } from './create-update-task-dialog';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useSessionStore } from '@/modules/auth/stores/session-store';
import { deleteTask } from '../util/task-api';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  task: Task;
  onRefetch?: () => void;
};

export function TaskCard({ task, onRefetch }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const collaborators = task.collaborators ?? [];
  const { session } = useSessionStore();
  const queryClient = useQueryClient();


  const mutation = useMutation({
  mutationFn: async () => {
    await deleteTask(task.id, session!.accessToken);
 },
  onSuccess: () => {
    toast.success('Tarefa deletada com sucesso!');
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    onRefetch?.();
 },
  onError: (err: any) => {
    toast.error('Erro ao deletar tarefa', {
    description: err.message,
    });
 },
});

  const handleDelete = () => {
   mutation.mutate();
  };

  return (
    <>
      <Card className="p-6 shadow-sm border border-muted transition hover:shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
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
            {format(new Date(task.dueDate), 'dd/MM/yyyy')}
          </span>
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

      <CreateEditTaskDialog
        projectId={task.projectId}
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        defaultValues={task}
        onSuccess={() => {
          setEditOpen(false);
          onRefetch?.();
        }}
      />

       <ConfirmDialog
       title="Excluir tarefa"
       description="Tem certeza que deseja excluir esta tarefa? Essa ação não pode ser desfeita."
       open={deleteOpen}
       onOpenChange={setDeleteOpen}
       onConfirm={handleDelete}
       />
    </>
  );
}
