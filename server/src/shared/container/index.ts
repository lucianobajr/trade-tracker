import { container } from "tsyringe";

// register singletons

import { IAdminsRepository } from "../../app/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../app/repositories/implementations/AdminsRepository"

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminsRepository
);