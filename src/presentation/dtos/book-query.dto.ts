import { z } from 'zod';

export const searchBooksSchema = z.object({
  titulo: z.string().optional(),
  resumo: z.string().optional(),
  sort: z.enum(['titulo', 'anoPublicacao', 'preco']).optional(),
  page: z.string().optional().transform((val) => (val ? Math.max(1, Number(val)) : 1)),
  limit: z.string().optional().transform((val) => (val ? Math.max(1, Number(val)) : 20)),
});