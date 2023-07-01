import { inject, injectable } from "tsyringe";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";

@injectable()
class ListCitiesWithoutStateUseCase {
  constructor(
    @inject("CityRepository") private cityRepository: ICityRepository
  ) { }

  async execute(): Promise<{ name: string; }[]> {
    const data = await this.cityRepository.listWithoutState();

    return data;
  }
}

export { ListCitiesWithoutStateUseCase };
