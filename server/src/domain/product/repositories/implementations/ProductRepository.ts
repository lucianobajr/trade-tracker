import { product } from "@prisma/client";
import { ProductParams,UpdateProductParams } from "../../schemas/product.schema";
import { IProductRepository } from "../interfaces/IProductRepository";

class ProductRepository implements IProductRepository{
    async create(data: ProductParams): Promise<product> {
        
    }

    async delete(id: string): Promise<void> {
        
    }

    async update(id: string, data: UpdateProductParams): Promise<product> {
        
    }

    async list(): Promise<product[]> {
        
    }

    async findById(id: string): Promise<product | null> {
        
    }

    async filterByMaker(makerId: string): Promise<product[]> {
        
    }
}

export { ProductRepository }