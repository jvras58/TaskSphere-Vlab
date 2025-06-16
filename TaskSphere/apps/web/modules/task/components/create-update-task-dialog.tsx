'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskFormValues, taskSchema } from '../schemas/task-schema';
import { useEffect, useState } from 'react';
import { useSessionStore } from '@/modules/auth/stores/session-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '../util/task-api';
import { TaskFormFields } from './task-form-fields';
import { toast } from 'sonner';

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'create' | 'edit';
  projectId: string;
  defaultValues?: Partial<TaskFormValues> & { id?: string };
  onSuccess?: () => void;
};

export function CreateEditTaskDialog({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  mode = 'create',
  projectId,
  defaultValues,
  onSuccess,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;

  const { session } = useSessionStore();
  const queryClient = useQueryClient();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      dueDate: '',
      description: '',
      status: 'todo',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title ?? '',
        dueDate: defaultValues.dueDate?.slice(0, 10) ?? '',
        description: defaultValues.description ?? '',
        status: defaultValues.status ?? 'todo',
        imageUrl: defaultValues.imageUrl ?? '',
      });
    }
  }, [defaultValues, form]);

  const mutation = useMutation({
    mutationFn: async (data: TaskFormValues) => {
      if (mode === 'edit' && defaultValues?.id) {
        return updateTask(defaultValues.id, data, session!.accessToken);
      }
      return createTask(projectId, data, session!.accessToken);
    },
    onSuccess: () => {
      toast.success(`Tarefa ${mode === 'edit' ? 'atualizada' : 'criada'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      setOpen(false);
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error('Erro ao salvar tarefa', {
        description: err.message,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === 'create' && (
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova tarefa
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar tarefa' : 'Criar nova tarefa'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Atualize os campos desejados abaixo.'
              : 'Preencha os dados para criar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>

        <form
          id="task-form"
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <FormProvider {...form}>
            <TaskFormFields form={form} disabled={mutation.isPending} />
          </FormProvider>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={mutation.isPending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="task-form"
            disabled={mutation.isPending}
          >
            {mode === 'edit' ? 'Salvar alterações' : 'Criar tarefa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
