import { client } from "@prisma/client";
import { ClientParams,UpdateClientParams } from "../../schemas/client.schema";

interface IClientRepository {
    create(data: ClientParams): Promise<client>;
    delete(id: string): Promise<void>;
    update(id: string, data: UpdateClientParams): Promise<client>;
    list(): Promise<client[]>;
    findById(id: string): Promise<client | null>;
    filterByCity(city: string): Promise<client[]>;
}

export { IClientRepository }