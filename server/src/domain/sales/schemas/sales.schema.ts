import { z, ZodSchema } from 'zod';

interface SaleItem {
  productId: string;
  amount: number;
}

interface SaleParams {
  total_amount: string;
  amount_paid: string;
  discount:string;

  client_id: string;
  items: SaleItem[];
}

const SaleItemSchema: ZodSchema<SaleItem> = z.object({
  productId: z.string(),
  amount: z.number().positive(),
});

const SaleParamsSchema: ZodSchema<SaleParams> = z.object({
  total_amount: z.string(),
  amount_paid: z.string(),
  discount: z.string(),
  client_id: z.string(),
  items: z.array(SaleItemSchema),
});

export { SaleParamsSchema, SaleParams };