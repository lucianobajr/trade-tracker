import { z, ZodSchema } from 'zod';

interface CityParams {
  name: string;
  state: string;
}

const CitySchema: ZodSchema<CityParams> = z.object({
  name: z.string(),
  state: z.string().max(2),
});

export { CitySchema, CityParams };