import { inject, injectable } from "tsyringe";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";
import { ICityRepository } from "../../city/repositories/interfaces/ICityRepository";

import { Client } from "../../../app/models/client";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class FilterClientsByCityUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository,
        @inject("CityRepository") private cityRepository: ICityRepository
    ) { }

    async execute(cityName:string): Promise<Client[]> {
        const verifyIfCityExists = await this.cityRepository.findByName(cityName);

        if (!verifyIfCityExists) {
            throw new AppError("this city not exists!");

        }

        const clients = await this.clientRepository.filterByCity(cityName);

        return clients;
    }
}

export { FilterClientsByCityUseCase };