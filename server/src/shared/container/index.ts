import { container } from "tsyringe";

// register singletons
//domain
import { IAdminsRepository } from "../../domain/admin/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../domain/admin/repositories/implementations/AdminsRepository"

//view
import { IAdminView } from "../../app/views/interfaces/IAdminView"
import { AdminView } from "../../app/views/implementations/AdminView"

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminsRepository
);

container.registerSingleton<IAdminView>(
    "AdminView",
    AdminView
);