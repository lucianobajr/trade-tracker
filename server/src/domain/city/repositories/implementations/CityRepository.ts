import { city } from "@prisma/client";
import { CityParams } from "../../schemas/city.schema";
import { ICityRepository } from "../interfaces/ICityRepository";

import prisma from "../../../../shared/infra/prisma/prisma";

class CityRepository implements ICityRepository {
  async create(data: CityParams): Promise<city> {
    const newCity = await prisma.city.create({
      data,
    });

    return newCity;
  }
  async findByCEP(cep: string): Promise<city | null> {
    const city = await prisma.city.findUnique({
      where: {
        cep,
      },
    });

    return city;
  }

  async list(): Promise<city[]> {
    const cities = await prisma.city.findMany();

    return cities;
  }

  async filterByState(state: string): Promise<city[]> {
    const cities = await prisma.city.findMany({
      where: {
        state: {
          equals: state,
        },
      },
    });

    return cities;
  }
}

export { CityRepository };
