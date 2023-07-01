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

  async list(): Promise<city[]> {
    const cities = await prisma.city.findMany();

    return cities;
  }

  async listWithoutState(): Promise<{ name: string; }[]> {
    const cities = await prisma.city.findMany({
      select: {
        name: true
      }
    });

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

  async findById(id: string): Promise<city | null> {
    const city = await prisma.city.findUnique({
      where: {
        id
      }
    });

    return city;
  }

  async delete(id: string): Promise<void> {
    await prisma.city.delete({
      where: {
        id
      }
    })
  }

  async findByName(name: string): Promise<city | null> {
    const cities = await prisma.city.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });

    return cities;
  }
}

export { CityRepository };
