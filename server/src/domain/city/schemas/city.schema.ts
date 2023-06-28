import { z, ZodSchema } from 'zod';

interface CityParams {
  name: string;
  state: string;
  cep: string;
}

const CitySchema: ZodSchema<CityParams> = z.object({
  name: z.string(),
  state: z.string().max(2),
  cep: z.string().min(8),
});

export { CitySchema, CityParams };