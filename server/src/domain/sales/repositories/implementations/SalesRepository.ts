import { PrismaClient, sale } from '@prisma/client';
import { SaleParams } from '../../schemas/sales.schema';
import { ISalesRepository } from '../interfaces/ISalesRepository';

const prisma = new PrismaClient();

class SalesRepository implements ISalesRepository {
    async create(params: SaleParams, items: any[]): Promise<void> {
        const { total_amount, amount_paid, client_id, discount } = params;

        let transaction;
        try {
            transaction = await prisma.$transaction(async (prisma) => {
                const sale = await prisma.sale.create({
                    data: {
                        total_amount: parseFloat(total_amount),
                        amount_paid: parseFloat(amount_paid),
                        discount:parseFloat(discount),
                        clientId: client_id
                    },
                });

                const createdItems = await Promise.all(
                    items.map(async (item) => {
                        const { productId, amount } = item;
                        const product = await prisma.product.findUnique({
                            where: { id: productId },
                        });

                        if (!product) {
                            throw new Error(`Product with id ${productId} not found.`);
                        }

                        if (product.stock < amount) {
                            throw new Error(
                                `Insufficient stock for product ${product.name}. Available stock: ${product.stock}`
                            );
                        }

                        const createdItem = await prisma.item.create({
                            data: {
                                amount: amount,
                                saleId: sale.id,
                                productId: productId,
                            },
                        });

                        await prisma.product.update({
                            where: { id: productId },
                            data: { stock: product.stock - amount },
                        });

                        return createdItem;
                    })
                );

                return { sale, items: createdItems };
            });
        } catch (error) {
            throw new Error('Failed to create the sale.');
        }
    }

    async list(): Promise<sale[]> {
        const sales = await prisma.sale.findMany({
            include: {
                client: true,
                item: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return sales;
    }
}

export { SalesRepository };