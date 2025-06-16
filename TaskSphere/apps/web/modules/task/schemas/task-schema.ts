import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(3, 'Título obrigatório com no mínimo 3 caracteres'),
  status: z.enum(['todo', 'in_progress', 'done']),
  description: z.string().max(500, 'Máximo de 500 caracteres').optional(),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  imageUrl: z.string().url('URL da imagem inválida').optional(),
}).refine(
  (data) => new Date(data.dueDate) > new Date(),
  {
    message: 'A data deve ser futura',
    path: ['dueDate'],
  }
);

export type TaskFormValues = z.infer<typeof taskSchema>;