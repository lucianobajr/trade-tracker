import { inject, injectable } from "tsyringe";

import { ClientParams } from "../schemas/client.schema";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";
import { ICityRepository } from "../../city/repositories/interfaces/ICityRepository";

import { AppError } from "../../../shared/errors/AppError";
import { client } from "@prisma/client";

@injectable()
class CreateClientUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository,
        @inject("CityRepository") private cityRepository: ICityRepository
    ) { }

    async execute({ name, adress, phone, cityId }: ClientParams): Promise<client> {
        if (!!cityId) {
            const verifyIfCityExists = await this.cityRepository.findById(cityId);

            if (!verifyIfCityExists) {
                throw new AppError("this city not exists!");

            }
        }

        const newClient = await this.clientRepository.create({ name, adress, phone, cityId });

        return newClient;
    }
}

export { CreateClientUseCase };
