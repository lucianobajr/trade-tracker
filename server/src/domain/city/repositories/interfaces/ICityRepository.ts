import { city } from "@prisma/client";
import { CityParams } from "../../schemas/city.schema";

interface ICityRepository {
  create(data: CityParams): Promise<city>;
  findByCEP(cep: string): Promise<city | null>;
  list(): Promise<city[]>;
  filterByState(state: string): Promise<city[]>;
}

export { ICityRepository };
