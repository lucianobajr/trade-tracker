import { inject, injectable } from "tsyringe";

import { IAdminsRepository } from "../repositories/interfaces/IAdminsRepository";

import { AppError } from "../../../shared/errors/AppError";

import { AdminParams } from "../schemas/admin.schema";

import { hash } from "bcrypt";
import { Admin } from "../../../app/models/admin";

@injectable()
class CreateAdminUseCase {
  constructor(
    @inject("AdminsRepository") private adminsRepository: IAdminsRepository
  ) { }

  async execute({ name, email, password }: AdminParams): Promise<Admin> {
    const adminAlreadyExists = await this.adminsRepository.findByEmail(email);

    if (adminAlreadyExists) {
      throw new AppError("Admin already exits!");
    }

    const passwordHash = await hash(password, 8);

    const adminCreated = await this.adminsRepository.create({ name, email, password: passwordHash });

    const admin: Admin = {
      id: adminCreated.id,
      name: adminCreated.name,
      email: adminCreated.email,
      password: adminCreated.password,
      createdAt: adminCreated.created_at
    }

    return admin;
  }
}

export { CreateAdminUseCase };
