import { inject, injectable } from "tsyringe";

import { maker } from "@prisma/client";
import { IMakerRepository } from "../repositories/interfaces/IMakerRepository";

@injectable()
class ListMakersUseCase {
    constructor(
        @inject("MakerRepository") private makerRepository: IMakerRepository
    ) { }

    async execute(): Promise<maker[]> {
        const makers = await this.makerRepository.list();

        return makers;
    }
}

export { ListMakersUseCase };
