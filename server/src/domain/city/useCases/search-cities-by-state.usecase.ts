import { inject, injectable } from "tsyringe";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";
import { city } from "@prisma/client";

@injectable()
class SearchCitiesByStateUseCase {
  constructor(
    @inject("CityRepository") private cityRepository: ICityRepository
  ) { }

  async execute(state: string): Promise<city[]> {
    const data = await this.cityRepository.filterByState(state);

    return data;
  }
}

export { SearchCitiesByStateUseCase };
