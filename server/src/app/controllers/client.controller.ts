import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ClientParams, ClientSchema } from "../../domain/clients/schemas/client.schema"

import { AppError } from '../../shared/errors/AppError';

import { CreateClientUseCase } from '../../domain/clients/useCases/create-client.usecase';
import { z } from 'zod';

class ClientController {
    async create(req: Request, res: Response) {
        try {
            const createClientUseCase = container.resolve(CreateClientUseCase);

            const { name, adress, phone, cityId }: ClientParams = ClientSchema.parse(req.body);


            const client = await createClientUseCase.execute({ name, adress, phone, cityId });

            return res.status(201).json(client);
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

                return res.status(400).json({ errors: errorDetails });
            }
            else {
                // Erro é de outro tipo
                return res.status(500).json(error)
            }
        }
    }
}

export default new ClientController();