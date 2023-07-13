import { product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";

@injectable()
class ListProductsUseCase {
    constructor(
        @inject("ProductRepository") private productRepository: IProductRepository
    ) { }

    async execute(): Promise<product[]> {
        const products = await this.productRepository.list();

        return products;
    }
}

export { ListProductsUseCase }