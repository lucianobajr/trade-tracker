import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IProductRepository } from "../repositories/interfaces/IProductRepository";

@injectable()
class DeleteProductUseCase {
    constructor(
        @inject("ProductRepository") private productRepository: IProductRepository
    ) { }

    async execute(id: string): Promise<void> {
        const verifyIfProductExists = await this.productRepository.findById(id);

        if (!verifyIfProductExists) {
            throw new AppError("This product not exists!");
        }

        await this.productRepository.delete(id);
    }
}

export { DeleteProductUseCase }