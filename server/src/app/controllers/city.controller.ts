import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CityParams, CitySchema } from '../../domain/city/schemas/city.schema';
import { CreateCityUseCase } from '../../domain/city/useCases/create-city.usecase';
import { DeleteCityUseCase } from '../../domain/city/useCases/delete-city.usecase';
import { ListCitiesUseCase } from '../../domain/city/useCases/list-cities.usecase';
import { SearchCitiesByStateUseCase } from '../../domain/city/useCases/search-cities-by-state.usecase';
import { AppError } from '../../shared/errors/AppError';
import { CityView } from '../views/implementations/CityView';

class CityController {
    async create(req: Request, res: Response) {
        const createCityUseCase = container.resolve(CreateCityUseCase);

        const { name, state }: CityParams = CitySchema.parse(req.body);

        try {
            const city = await createCityUseCase.execute({ name, state });

            const cityView = container.resolve(CityView);

            const responseViewData = cityView.create({ id: city.id, name: city.name, state: city.state });

            return res.status(201).json({ ok: "created with success!", data: responseViewData })
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(500).json(error)
            }
        }
    }

    async list(req: Request, res: Response) {
        const listCitiesUseCase = container.resolve(ListCitiesUseCase);

        try {
            const cities = await listCitiesUseCase.execute();

            const cityView = container.resolve(CityView);

            const responseViewData = cityView.list(cities);

            return res.status(201).json(responseViewData)
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(500).json(error)
            }
        }
    }

    async search(req: Request, res: Response) {
        const searchCitiesByStateUseCase = container.resolve(SearchCitiesByStateUseCase);

        const state = req.query.state as string;

        try {
            const cities = await searchCitiesByStateUseCase.execute(state);

            const cityView = container.resolve(CityView);

            const responseViewData = cityView.list(cities);

            return res.status(201).json(responseViewData)
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(500).json(error)
            }
        }
    }

    async delete(req: Request, res: Response) {
        const celeteCityUseCase = container.resolve(DeleteCityUseCase);

        const id = req.params.id as string;

        try {
            await celeteCityUseCase.execute(id);

            return res.status(201).json({ ok: "city deleted with success!" })
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(500).json(error)
            }
        }
    }
}

export default new CityController();