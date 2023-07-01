import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MakerParams, MakerSchema, UpdateMakerParams, UpdateMakerSchema } from '../../domain/maker/schemas/maker.schema';

import { AppError } from '../../shared/errors/AppError';

import { MakerView } from '../views/implementations/MakerView';

import { CreateMakerUseCase } from '../../domain/maker/useCases/create-maker.usecase';

import { HttpStatusCodes } from '../../helpers/http-status-code';
import { ListMakersUseCase } from '../../domain/maker/useCases/list-maker.usecase';
import { DeleteMakerUseCase } from '../../domain/maker/useCases/delete-maker.usecase';
import { UpdateMakerUseCase } from '../../domain/maker/useCases/update-maker.usecase';

class MakerController {
    async create(req: Request, res: Response) {
        const createMakerUseCase = container.resolve(CreateMakerUseCase);

        const { name, site }: MakerParams = MakerSchema.parse(req.body);

        try {
            const maker = await createMakerUseCase.execute({ name, site });

            const makerView = container.resolve(MakerView);

            const responseViewData = makerView.create(maker);

            return res.status(HttpStatusCodes.CREATED).json({ ok: "created with success!", data: responseViewData })
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
            }
        }
    }

    async list(req: Request, res: Response) {
        const listMakersUseCase = container.resolve(ListMakersUseCase);
        try {
            const makers = await listMakersUseCase.execute();

            const makerView = container.resolve(MakerView);

            const responseViewData = makerView.list(makers);

            return res.status(HttpStatusCodes.OK).json(responseViewData)
        } catch (error: unknown) {
            // Erro é de outro tipo
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        const deleteMakerUseCase = container.resolve(DeleteMakerUseCase);

        try {
            const { id } = req.params;

            await deleteMakerUseCase.execute(id);

            return res.status(HttpStatusCodes.NO_CONTENT).send()
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
            }
        }
    }

    async update(req: Request, res: Response) {
        const updateMakerUseCase = container.resolve(UpdateMakerUseCase);

        try {
            const { id } = req.params;

            const { name, site }: UpdateMakerParams = UpdateMakerSchema.parse(req.body);

            const maker = await updateMakerUseCase.execute(id, { name, site });

            const makerView = container.resolve(MakerView);

            const responseViewData = makerView.update(maker);

            return res.status(HttpStatusCodes.OK).json({ ok: "updated with success!", data: responseViewData })
        } catch (error: unknown) {
            if (error instanceof AppError) {
                // Erro é uma instância de AppError
                return res.status(error.statusCode).json({ error: error.message })
            } else {
                // Erro é de outro tipo
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
            }
        }
    }

}

export default new MakerController();