import { product } from "@prisma/client";
import { ProductParams, UpdateProductParams } from "../../schemas/product.schema";

interface IProductRepository {
    create(data: ProductParams): Promise<product>;
    delete(id: string): Promise<void>;
    update(id: string, data: UpdateProductParams): Promise<product>;
    list(): Promise<product[]>;
    findById(id: string): Promise<product | null>;
    filterByMaker(makerId: string): Promise<product[]>;
}

export { IProductRepository }