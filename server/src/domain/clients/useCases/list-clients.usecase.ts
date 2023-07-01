import { inject, injectable } from "tsyringe";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";

import { Client } from "../../../app/models/client";

@injectable()
class ListClientsUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository
    ) { }

    async execute(): Promise<Client[]> {
        const clients = await this.clientRepository.list();

        return clients;
    }
}

export { ListClientsUseCase };
