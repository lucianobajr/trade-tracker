import { container } from "tsyringe";

// register singletons
//domain
import { IAdminsRepository } from "../../domain/admin/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../domain/admin/repositories/implementations/AdminsRepository"

import { ICityRepository } from "../../domain/city/repositories/interfaces/ICityRepository"
import { CityRepository } from "../../domain/city/repositories/implementations/CityRepository"

import { IClientRepository } from "../../domain/clients/repositories/interfaces/IClientRepository"
import { ClientRepository } from "../../domain/clients/repositories/implementations/ClientRepostirory"

//view
import { IAdminView } from "../../app/views/interfaces/IAdminView"
import { AdminView } from "../../app/views/implementations/AdminView"

import { ICityView } from "../../app/views/interfaces/ICityView"
import { CityView } from "../../app/views/implementations/CityView"

container.registerSingleton<IAdminsRepository>(
    "AdminsRepository",
    AdminsRepository
);

container.registerSingleton<ICityRepository>(
    "CityRepository",
    CityRepository
);

container.registerSingleton<IClientRepository>(
    "ClientRepository",
    ClientRepository
);

container.registerSingleton<IAdminView>(
    "AdminView",
    AdminView
);

container.registerSingleton<ICityView>(
    "CityView",
    CityView
);