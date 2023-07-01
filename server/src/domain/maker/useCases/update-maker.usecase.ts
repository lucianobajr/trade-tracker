import { maker } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";

import { IMakerRepository } from "../repositories/interfaces/IMakerRepository";
import { UpdateMakerParams } from "../schemas/maker.schema";

@injectable()
class UpdateMakerUseCase {
    constructor(
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute(id: string, data: UpdateMakerParams): Promise<maker> {
        const verifyIfMakerExists = await this.makerRepository.findById(id);

        if (!verifyIfMakerExists) {
            throw new AppError("This maker not exists!");
        }

        const maker = await this.makerRepository.update(id, data);

        return maker;
    }
}

export { UpdateMakerUseCase };
