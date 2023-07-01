import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";

import { IMakerRepository } from "../repositories/interfaces/IMakerRepository";

@injectable()
class DeleteMakerUseCase {
    constructor(
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute(id: string): Promise<void> {
        const verifyIfMakerExists = await this.makerRepository.findById(id);

        if (!verifyIfMakerExists) {
            throw new AppError("This maker not exists!");
        }

        await this.makerRepository.delete(id);
    }
}

export { DeleteMakerUseCase };
