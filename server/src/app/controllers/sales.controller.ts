import { Request, Response } from 'express';

import { container } from "tsyringe";
import { SaleParams, SaleParamsSchema } from "../../domain/sales/schemas/sales.schema";
import CreateSaleUseCase from "../../domain/sales/useCases/create-sale.usecase";
import ListSaleUseCase from '../../domain/sales/useCases/list-sales.usecase';
import { HttpStatusCodes } from "../../helpers/http-status-code";

class SalesController {
    async create(req: Request, res: Response) {
        const createSalesUseCase = container.resolve(CreateSaleUseCase);

        try {
            const { total_amount, amount_paid, discount, items, client_id }: SaleParams = SaleParamsSchema.parse(req.body);

            await createSalesUseCase.execute({
                amount_paid,
                client_id,
                items,
                total_amount,
                discount
            });

            return res.status(HttpStatusCodes.NO_CONTENT).send()
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Tratar erros específicos, se necessário
                return res.status(400).json({ error: error.message });
            } else {
                // Tratar outros erros
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async list(req: Request, res: Response) {
        const listSalesUseCase = container.resolve(ListSaleUseCase);

        try {
            const sales = await listSalesUseCase.execute()

            return res.status(HttpStatusCodes.OK).json(sales)
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Tratar erros específicos, se necessário
                return res.status(400).json({ error: error.message });
            } else {
                // Tratar outros erros
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

export default new SalesController()