import { inject, injectable } from "tsyringe";

import { ICityRepository } from "../repositories/interfaces/ICityRepository";
import { city } from "@prisma/client";

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject("CityRepository") private cityRepository: ICityRepository
  ) { }

  async execute(): Promise<city[]> {
    const data = await this.cityRepository.list();

    return data;
  }
}

export { ListCitiesUseCase };
