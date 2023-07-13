import { inject, injectable } from "tsyringe";

import { UpdateClientParams } from "../schemas/client.schema";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";

import { AppError } from "../../../shared/errors/AppError";

import { client } from "@prisma/client";

@injectable()
class UpdateClientUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository
    ) { }

    async execute(id: string, { name, adress, phone }: UpdateClientParams): Promise<client> {
        const verifyIfClientExists = await this.clientRepository.findById(id);

        if (!verifyIfClientExists) {
            throw new AppError("use not exists!");
        }


        const newClient = await this.clientRepository.update(id, { name, adress, phone });

        return newClient;
    }
}

export { UpdateClientUseCase };
