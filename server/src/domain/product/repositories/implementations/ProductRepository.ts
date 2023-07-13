import { product } from "@prisma/client";
import prisma from "../../../../shared/infra/prisma/prisma";
import { ProductParams, UpdateProductParams } from "../../schemas/product.schema";
import { IProductRepository } from "../interfaces/IProductRepository";

class ProductRepository implements IProductRepository {
    async create({
        name,
        description,
        stock,
        cost_price,
        selling_price,
        makerId
    }: ProductParams): Promise<product> {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                stock,
                cost_price,
                selling_price,
                maker: {
                    connect: {
                        id: makerId
                    }
                }
            }
        })

        return product;
    }

    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: {
                id
            }
        })
    }

    async update(id: string, data: UpdateProductParams): Promise<product> {
        const product = await prisma.product.update({
            where: {
                id
            },
            data
        })

        return product;
    }

    async list(): Promise<product[]> {
        const products = await prisma.product.findMany({
            include: {
                maker: true
            }
        });

        return products;
    }

    async findById(id: string): Promise<product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        return product;
    }

    async filterByMaker(makerId: string): Promise<product[]> {
        const products = await prisma.product.findMany({
            where: {
                makerId: {
                    equals: makerId
                }
            },
            include: {
                maker: true
            }
        })

        return products;
    }

    async findByname(name: string): Promise<product | null> {
        const product = await prisma.product.findUnique({
            where: {
                name
            }
        })

        return product;
    }
}

export { ProductRepository }