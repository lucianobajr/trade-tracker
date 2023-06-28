import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";

import { CityParams } from "../schemas/city.schema";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";
import { City } from "../../../app/models/city";

@injectable()
class CreateCityUseCase {
  constructor(
    @inject("CityRepository") private cityRepository: ICityRepository
  ) {}

  async execute({ name, cep, state }: CityParams): Promise<City> {
    const CEPAlreadyBeenRegistered = await this.cityRepository.findByCEP(cep);

    if (CEPAlreadyBeenRegistered) {
      throw new AppError("This cep already been registered!");
    }

    const upperState = state.toUpperCase();

    const newCity = await this.cityRepository.create({
      name,
      cep,
      state: upperState,
    });

    const city: City = {
      id: newCity.id,
      cep: newCity.cep,
      name: newCity.name,
      state: newCity.state,
    };

    return city;
  }
}

export { CreateCityUseCase };
