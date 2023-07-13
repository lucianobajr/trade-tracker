import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProductParams, ProductSchema, UpdateProductParams, UpdateProductSchema } from '../../domain/product/schemas/product.schema';

import { AppError } from '../../shared/errors/AppError';

import { ProductView } from '../views/implementations/ProductView';

import { CreateProductUseCase } from '../../domain/product/useCases/create-product.usecase';
import { ListProductsUseCase } from '../../domain/product/useCases/list-products..usecase';

import { HttpStatusCodes } from '../../helpers/http-status-code';
import { DeleteProductUseCase } from '../../domain/product/useCases/delete-product.usecase';
import { UpdateProductUseCase } from '../../domain/product/useCases/update-product.usecase';
import { FilterProductsByMakerUseCase } from '../../domain/product/useCases/filter-products-by-maker.usecase';

class ProductController {
    async create(req: Request, res: Response) {
        const createProductUseCase = container.resolve(CreateProductUseCase);

        const { name, cost_price, description, makerId, selling_price, stock }: ProductParams = ProductSchema.parse(req.body);

        try {
            const product = await createProductUseCase.execute({ name, cost_price, description, makerId, selling_price, stock });

            const productView = container.resolve(ProductView);

            const responseViewData = productView.create(product);

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
        const listProductsUseCase = container.resolve(ListProductsUseCase);

        try {
            const products = await listProductsUseCase.execute();

            const productView = container.resolve(ProductView);

            const responseViewData = productView.list(products);

            return res.status(HttpStatusCodes.OK).json(responseViewData)
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

    async delete(req: Request, res: Response) {
        const deleteProductUseCase = container.resolve(DeleteProductUseCase);
        try {
            const { id } = req.params;

            await deleteProductUseCase.execute(id);

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
        const updateProductUseCase = container.resolve(UpdateProductUseCase);
        try {
            const { id } = req.params;
            const { name, cost_price, description, selling_price, stock }: UpdateProductParams = UpdateProductSchema.parse(req.body);

            await updateProductUseCase.execute(id, { name, cost_price, description, selling_price, stock });

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

    async filter(req: Request, res: Response) {
        const filterProductsByMakerUseCase = container.resolve(FilterProductsByMakerUseCase);

        const makerId = req.query.makerId as string;

        if (!makerId) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "makerId is required!" })
        }

        try {
            const products = await filterProductsByMakerUseCase.execute(makerId);

            const productView = container.resolve(ProductView);

            const responseViewData = productView.filter(products);

            return res.status(HttpStatusCodes.OK).json(responseViewData)
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

export default new ProductController();