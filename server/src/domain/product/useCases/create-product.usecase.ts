import { product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { HttpStatusCodes } from "../../../helpers/http-status-code";
import { AppError } from "../../../shared/errors/AppError";
import { IMakerRepository } from "../../maker/repositories/interfaces/IMakerRepository";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";
import { ProductParams } from "../schemas/product.schema";

@injectable()
class CreateProductUseCase {
    constructor(
        @inject("ProductRepository") private productRepository: IProductRepository,
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute({
        name,
        description,
        cost_price,
        selling_price,
        stock,
        makerId,
    }: ProductParams): Promise<product> {
        const verifyIfNameAlreadyBeenRegistered = await this.productRepository.findByname(name);

        if (!!verifyIfNameAlreadyBeenRegistered) {
            throw new AppError("This name already been registered!");

        }

        const verifyIfMakerExists = await this.makerRepository.findById(makerId);

        if (!verifyIfMakerExists) {
            throw new AppError("This maker not exists!", HttpStatusCodes.NOT_FOUND);
        }

        if (stock <= 0) {
            throw new AppError("This product must have at least one in stock!");
        }

        const product = await this.productRepository.create({
            name, description, cost_price, selling_price, stock, makerId
        })

        return product;
    }
}

export { CreateProductUseCase }