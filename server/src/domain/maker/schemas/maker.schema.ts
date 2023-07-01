import { z, ZodSchema } from 'zod';

interface MakerParams {
  name: string;
  site: string;
}

interface UpdateMakerParams {
  name?: string;
  site?: string;
}

const MakerSchema: ZodSchema<MakerParams> = z.object({
  name: z.string(),
  site: z.string(),
});

const UpdateMakerSchema: ZodSchema<UpdateMakerParams> = z.object({
  name: z.string().optional(),
  site: z.string().optional(),
});

export { MakerSchema, MakerParams, UpdateMakerSchema, UpdateMakerParams };