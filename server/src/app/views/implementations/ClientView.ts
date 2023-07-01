import { client } from "@prisma/client";
import { Client } from "../../models/client";
import { IClientView } from "../interfaces/IClientView";

class ClientView implements IClientView {
    create(params: client): Client {
        const client: Client = {
            id: params.id,
            name: params.name,
            adress: params.adress,
            phone: params.phone,
            cityId: params.cityId ? params.cityId : undefined
        }
        return client;
    }
    list(params: Client[]): { total: number, data: Client[] } {
        var data: Client[] = [];

        params.map((city) => data.push({
            id: city.id,
            name: city.name,
            adress: city.adress,
            phone: city.phone,
            cityId: city.cityId ? city.cityId : undefined,
            city: city.city
        }))

        const viewResponse = {
            total: params.length,
            data
        }

        return viewResponse;
    }
}

export { ClientView }