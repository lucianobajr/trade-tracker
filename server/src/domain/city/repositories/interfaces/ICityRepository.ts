import { city } from "@prisma/client";
import { CityParams } from "../../schemas/city.schema";

interface ICityRepository {
  create(data: CityParams): Promise<city>;
  list(): Promise<city[]>;
  listWithoutState(): Promise<{ name: string; }[]>;
  filterByState(state: string): Promise<city[]>;
  findById(id: string): Promise<city | null>;
  findByName(name: string): Promise<city | null>;
  delete(id: string): Promise<void>;
}

export { ICityRepository };
