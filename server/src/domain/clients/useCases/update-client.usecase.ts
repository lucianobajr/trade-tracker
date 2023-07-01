import { inject, injectable } from "tsyringe";

import { UpdateClientParams } from "../schemas/client.schema";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";
import { ICityRepository } from "../../city/repositories/interfaces/ICityRepository";

import { Client } from "../../../app/models/client";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class UpdateClientUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository,
        @inject("CityRepository") private cityRepository: ICityRepository
    ) { }

    async execute(id: string, { name, adress, phone, cityId }: UpdateClientParams): Promise<Client> {
        const verifyIfClientExists = await this.clientRepository.findById(id);

        if (!verifyIfClientExists) {
            throw new AppError("use not exists!");
        }

        if (!!cityId) {
            const verifyIfCityExists = await this.cityRepository.findById(cityId);

            if (!verifyIfCityExists) {
                throw new AppError("this city not exists!");

            }
        }

        const newClient = await this.clientRepository.update(verifyIfClientExists.id, { name, adress, phone, cityId });

        return newClient;
    }
}

export { UpdateClientUseCase };
