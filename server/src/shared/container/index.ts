import { container } from "tsyringe";

// register singletons

import { IAdminsRepository } from "../../domain/admin/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../domain/admin/repositories/implementations/AdminsRepository"

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminsRepository
);