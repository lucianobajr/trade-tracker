import { admin } from '@prisma/client';
import { z, ZodSchema } from 'zod';

interface LoginParams {
    email: string;
    password: string;
}

interface ILoginResponse {
    admin: admin;
    token: string;
  }

const LoginSchema: ZodSchema<LoginParams> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});


export { LoginParams, LoginSchema,ILoginResponse };