import { container } from "tsyringe";

// register singletons
//domain
import { IAdminsRepository } from "../../domain/admin/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../domain/admin/repositories/implementations/AdminsRepository"

import { ICityRepository } from "../../domain/city/repositories/interfaces/ICityRepository"
import { CityRepository } from "../../domain/city/repositories/implementations/CityRepository"

//view
import { IAdminView } from "../../app/views/interfaces/IAdminView"
import { AdminView } from "../../app/views/implementations/AdminView"

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminsRepository
);

container.registerSingleton<ICityRepository>(
    "CityRepository",
    CityRepository
);

container.registerSingleton<IAdminView>(
    "AdminView",
    AdminView
);