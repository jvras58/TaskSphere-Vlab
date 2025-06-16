'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProjectFormValues, projectSchema } from '../schemas/project-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormFields } from './project-form-fields';
import { useQueryClient } from '@tanstack/react-query';
import { useSessionStore } from '@/modules/auth/stores/session-store';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createProject, updateProject } from '../util/project-api';
import { PlusCircle } from 'lucide-react';

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'create' | 'edit';
  defaultValues?: Partial<ProjectFormValues> & { id?: string };
  onSuccess?: () => void;
};

export function CreateEditProjectDialog({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  mode = 'create',
  defaultValues,
  onSuccess,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;
  const queryClient = useQueryClient();

  const { session } = useSessionStore();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name ?? '',
        description: defaultValues.description ?? '',
        startDate: defaultValues.startDate?.slice(0, 10) ?? '',
        endDate: defaultValues.endDate?.slice(0, 10) ?? '',
      });
    }
  }, [defaultValues, form]);

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      if (mode === 'edit' && defaultValues?.id) {
        return updateProject(defaultValues.id, data, session!.accessToken);
      }
      return createProject(data, session!.accessToken);
    },
    onSuccess: () => {
      toast.success(`Projeto ${mode === 'edit' ? 'atualizado' : 'criado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setOpen(false);
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error('Erro ao salvar projeto', {
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
            Criar projeto
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar projeto' : 'Criar projeto'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Altere os dados do projeto abaixo.'
              : 'Preencha os campos para criar um novo projeto.'}
          </DialogDescription>
        </DialogHeader>

        <form
          id="project-form"
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <FormProvider {...form}>
            <ProjectFormFields form={form} disabled={mutation.isPending} />
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
            form="project-form"
            disabled={mutation.isPending}
          >
            {mode === 'edit' ? 'Salvar' : 'Criar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
