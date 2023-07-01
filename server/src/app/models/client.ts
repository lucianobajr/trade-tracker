import { City } from "./city";

interface Client {
    name: string;
    adress: string;
    phone: string;
    city?: City;
}

export { Client }