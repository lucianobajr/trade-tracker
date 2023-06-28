import { inject, injectable } from "tsyringe";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";
import { city } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class DeleteCityUseCase {
    constructor(
        @inject("CityRepository") private cityRepository: ICityRepository
    ) { }

    async execute(id: string): Promise<void> {
        const verifyIfCityExists = await this.cityRepository.findById(id);

        if (!verifyIfCityExists) {
            throw new AppError("This city not exists!");
        }

        await this.cityRepository.delete(id);
    }
}

export { DeleteCityUseCase };
