import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().max(500, 'Máximo de 500 caracteres').optional(),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data inicial inválida',
  }),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data final inválida',
  }),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: 'A data final deve ser posterior à inicial',
    path: ['endDate'],
  }
);

export type ProjectFormValues = z.infer<typeof projectSchema>;