import { inject, injectable } from "tsyringe";

import { CityParams } from "../schemas/city.schema";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";
import { City } from "../../../app/models/city";

@injectable()
class CreateCityUseCase {
  constructor(
    @inject("CityRepository") private cityRepository: ICityRepository
  ) { }

  async execute({ name, state }: CityParams): Promise<City> {
    const upperState = state.toUpperCase();

    const newCity = await this.cityRepository.create({
      name,
      state: upperState,
    });

    const city: City = {
      id: newCity.id,
      name: newCity.name,
      state: newCity.state,
    };

    return city;
  }
}

export { CreateCityUseCase };
