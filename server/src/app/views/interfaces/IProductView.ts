import { product } from "@prisma/client";
import { Product } from "../../models/product";

interface IProductView {
    create(params: product): Product;
    list(params: Product[]): { total: number, data: Product[] }
    filter(params: Product[]): { total: number, data: Product[] }
}

export { IProductView };