import { z, ZodSchema } from 'zod';

interface ClientParams {
  name: string;
  adress: string;
  phone: string;
  cityId?: string;
}

interface UpdateClientParams {
  name?: string;
  adress?: string;
  phone?: string;
}

const ClientSchema: ZodSchema<ClientParams> = z.object({
  name: z.string(),
  adress: z.string(),
  phone: z.string().regex(/^\+55\s?\d{2}\s?\d{5}-\d{4}$/),
  cityId: z.string().optional()
});

const UpdateClientSchema: ZodSchema<UpdateClientParams> = z.object({
  name: z.string().optional(),
  adress: z.string().optional(),
  phone: z.string().regex(/^\+55\s?\d{2}\s?\d{5}-\d{4}$/).optional(),
});

export { ClientSchema, ClientParams, UpdateClientParams, UpdateClientSchema };