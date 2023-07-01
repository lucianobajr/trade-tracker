import { inject, injectable } from "tsyringe";

import { MakerParams } from "../schemas/maker.schema";

import { maker } from "@prisma/client";
import { IMakerRepository } from "../repositories/interfaces/IMakerRepository";

@injectable()
class CreateMakerUseCase {
    constructor(
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute({ name, site }: MakerParams): Promise<maker> {
        const newMaker = await this.makerRepository.create({ name, site });

        return newMaker;
    }
}

export { CreateMakerUseCase };
