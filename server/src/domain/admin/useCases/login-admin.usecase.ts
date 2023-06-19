import { inject, injectable } from "tsyringe";

import { IAdminsRepository } from "../repositories/interfaces/IAdminsRepository";

import { AppError } from "../../../shared/errors/AppError";

import { LoginParams, ILoginResponse } from "../schemas/login.schema";

import { compare } from "bcrypt";
import { GenerateTokenProvider } from "../providers/GenerateTokenProvider";

@injectable()
class LoginAdminUseCase {
    constructor(
        @inject("AdminsRepository") private adminsRepository: IAdminsRepository
    ) { }

    async execute({ email, password }: LoginParams): Promise<ILoginResponse> {
        const admin = await this.adminsRepository.findByEmail(email);

        if (!admin) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, admin.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        //token
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(admin.id);

        const responseLogin: ILoginResponse = {
            admin,
            token,
        }

        return responseLogin;
    }
}

export { LoginAdminUseCase };