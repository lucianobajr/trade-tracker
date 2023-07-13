import { z, ZodSchema } from 'zod';

interface ProductParams {
    name: string;
    description: string;

    stock: number;
    cost_price: number; // preço de custo
    selling_price: number; // preço de venda

    makerId: string;
}

interface UpdateProductParams {
    name?: string;
    description?: string;

    stock?: number;
    cost_price?: number; // preço de custo
    selling_price?: number; // preço de venda
}

const ProductSchema: ZodSchema<ProductParams> = z.object({
    name: z.string(),
    description: z.string(),

    stock: z.number(),
    cost_price: z.number(),
    selling_price: z.number(),

    makerId: z.string()
});

const UpdateProductSchema: ZodSchema<UpdateProductParams> = z.object({
    name: z.string().optional(),
    description: z.string().optional(),

    stock: z.number().optional(),
    cost_price: z.number().optional(),
    selling_price: z.number().optional(),
});

export { ProductParams, UpdateProductParams, ProductSchema, UpdateProductSchema }