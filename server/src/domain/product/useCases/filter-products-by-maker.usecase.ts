import { product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { HttpStatusCodes } from "../../../helpers/http-status-code";
import { AppError } from "../../../shared/errors/AppError";
import { IMakerRepository } from "../../maker/repositories/interfaces/IMakerRepository";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";

@injectable()
class FilterProductsByMakerUseCase {
    constructor(
        @inject("ProductRepository") private productRepository: IProductRepository,
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute(makerId: string): Promise<product[]> {
        const verifyIfMakerExists = await this.makerRepository.findById(makerId);

        if (!verifyIfMakerExists) {
            throw new AppError("This maker not exists!", HttpStatusCodes.NOT_FOUND);
        }

        const products = await this.productRepository.filterByMaker(makerId);

        return products;
    }
}

export { FilterProductsByMakerUseCase }