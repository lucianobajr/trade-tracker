import { client } from "@prisma/client";
import { Client } from "../../models/client";

interface IClientView {
    create(params: client): Client;
    list(params: Client[]): { total: number, data: Client[] };
}

export { IClientView };