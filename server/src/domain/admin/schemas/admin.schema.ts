import { z, ZodSchema } from 'zod';

interface AdminParams {
  name: string;
  email: string;
  password: string;
}

const AdminSchema: ZodSchema<AdminParams> = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export { AdminSchema, AdminParams };