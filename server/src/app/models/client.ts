import { City } from "./city";

interface Client {
    id?: string;
    name: string;
    adress: string;
    phone: string;
    cityId?: string;
    city?: City;
}

export { Client }