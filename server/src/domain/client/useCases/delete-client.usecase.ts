import { inject, injectable } from "tsyringe";

import { IClientRepository } from "../repositories/interfaces/IClientRepository";

import { AppError } from "../../../shared/errors/AppError";

@injectable()
class DeleteClientUseCase {
    constructor(
        @inject("ClientRepository") private clientRepository: IClientRepository
    ) { }

    async execute(id: string): Promise<void> {
        const verifyIfClientExists = await this.clientRepository.findById(id);

        if (!verifyIfClientExists) {
            throw new AppError("This user not exists!");
        }

        await this.clientRepository.delete(id);
    }
}

export { DeleteClientUseCase };