import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ClientParams, ClientSchema, UpdateClientParams, UpdateClientSchema } from "../../domain/client/schemas/client.schema"

import { AppError } from '../../shared/errors/AppError';

import { ClientView } from '../views/implementations/ClientView';

import { CreateClientUseCase } from '../../domain/client/useCases/create-client.usecase';
import { ListClientsUseCase } from '../../domain/client/useCases/list-clients.usecase';
import { FilterClientsByCityUseCase } from '../../domain/client/useCases/filter-clients-by-city.usecase';
import { DeleteClientUseCase } from '../../domain/client/useCases/delete-client.usecase';
import { UpdateClientUseCase } from '../../domain/client/useCases/update-client.usecase';

import { HttpStatusCodes } from '../../helpers/http-status-code';

class ClientController {
    async create(req: Request, res: Response) {
        try {
            const createClientUseCase = container.resolve(CreateClientUseCase);

            const { name, adress, phone, cityId }: ClientParams = ClientSchema.parse(req.body);

            const client = await createClientUseCase.execute({ name, adress, phone, cityId });

            const clientView = container.resolve(ClientView)

            const response = clientView.create(client);

            return res.status(HttpStatusCodes.CREATED).json(response);
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            }
            else if (error instanceof z.ZodError) {

                const errorDetails = error.errors.map((error) => {
                    return {
                        path: error.path.join('.'),
                        message: error.message,
                    };
                });

                return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errorDetails });
            }
            else {
                // Erro é de outro tipo
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
            }
        }
    }

    async list(req: Request, res: Response) {
        try {
            const listClientsUseCase = container.resolve(ListClientsUseCase);

            const clients = await listClientsUseCase.execute();

            const clientView = container.resolve(ClientView)

            const response = clientView.list(clients);

            return res.status(HttpStatusCodes.OK).json(response);
        } catch (error: unknown) {
            // Erro é de outro tipo
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async filter(req: Request, res: Response) {
        const filterClientsByCityUseCase = container.resolve(FilterClientsByCityUseCase)

        const cityName = req.query.cityName as string;

        try {
            const clients = await filterClientsByCityUseCase.execute(cityName);

            const clientView = container.resolve(ClientView)

            const response = clientView.list(clients);

            return res.status(HttpStatusCodes.OK).json(response);
        } catch (error) {
            // Erro é de outro tipo
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        const deleteClientUseCase = container.resolve(DeleteClientUseCase)

        try {
            const { id } = req.params;

            await deleteClientUseCase.execute(id);

            return res.status(HttpStatusCodes.NO_CONTENT).send()

        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async update(req: Request, res: Response) {
        const updateClientUseCase = container.resolve(UpdateClientUseCase)

        try {
            const { id } = req.params;

            const { name, adress, phone, cityId }: UpdateClientParams = UpdateClientSchema.parse(req.body);

            const client = await updateClientUseCase.execute(id, { name, adress, phone, cityId });

            const clientView = container.resolve(ClientView)

            const response = clientView.create(client);

            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

export default new ClientController();