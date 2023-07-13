import { product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";
import { UpdateProductParams } from "../schemas/product.schema";

@injectable()
class UpdateProductUseCase {
    constructor(
        @inject("ProductRepository") private productRepository: IProductRepository
    ) { }

    async execute(id: string, {
        name,
        description,
        cost_price,
        selling_price,
        stock,
    }: UpdateProductParams): Promise<product> {
        const verifyIfProductExists = await this.productRepository.findById(id);

        if (!verifyIfProductExists) {
            throw new AppError("This product not exists!");
        }

        if (!!name) {
            const verifyIfNameAlreadyBeenRegistered = await this.productRepository.findByname(name);

            if (!!verifyIfNameAlreadyBeenRegistered) {
                throw new AppError("This name already been registered!");

            }
        }

        const product = await this.productRepository.update(id, {
            name,
            description,
            cost_price,
            selling_price,
            stock
        });

        return product;
    }
}

export { UpdateProductUseCase }