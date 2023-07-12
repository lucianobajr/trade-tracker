import { container } from "tsyringe";

// register singletons
//domain
import { IAdminsRepository } from "../../domain/admin/repositories/interfaces/IAdminsRepository"
import { AdminsRepository } from "../../domain/admin/repositories/implementations/AdminsRepository"

import { ICityRepository } from "../../domain/city/repositories/interfaces/ICityRepository"
import { CityRepository } from "../../domain/city/repositories/implementations/CityRepository"

import { IClientRepository } from "../../domain/client/repositories/interfaces/IClientRepository"
import { ClientRepository } from "../../domain/client/repositories/implementations/ClientRepository"

import { IMakerRepository } from "../../domain/maker/repositories/interfaces/IMakerRepository"
import { MakerRepository } from "../../domain/maker/repositories/implementations/MakerRepository"

import { IProductRepository } from "../../domain/product/repositories/interfaces/IProductRepository"
import { ProductRepository } from "../../domain/product/repositories/implementations/ProductRepository"

//view
import { IAdminView } from "../../app/views/interfaces/IAdminView"
import { AdminView } from "../../app/views/implementations/AdminView"

import { ICityView } from "../../app/views/interfaces/ICityView"
import { CityView } from "../../app/views/implementations/CityView"

import { IClientView } from "../../app/views/interfaces/IClientView"
import { ClientView } from "../../app/views/implementations/ClientView"

import { IMakerView } from "../../app/views/interfaces/IMakerView"
import { MakerView } from "../../app/views/implementations/MakerView"

import { IProductView } from "../../app/views/interfaces/IProductView"
import { ProductView } from "../../app/views/implementations/ProductView"

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

container.registerSingleton<IMakerRepository>(
    "MakerRepository",
    MakerRepository
);

container.registerSingleton<IProductRepository>(
    "ProductRepository",
    ProductRepository
);

//views
container.registerSingleton<IAdminView>(
    "AdminView",
    AdminView
);

container.registerSingleton<ICityView>(
    "CityView",
    CityView
);

container.registerSingleton<IClientView>(
    "ClientView",
    ClientView
);

container.registerSingleton<IMakerView>(
    "MakerView",
    MakerView
);

container.registerSingleton<IProductView>(
    "ProductView",
    ProductView
);
