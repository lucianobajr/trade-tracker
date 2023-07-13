import { client } from "@prisma/client";
import prisma from "../../../../shared/infra/prisma/prisma";
import { ClientParams, UpdateClientParams } from "../../schemas/client.schema";
import { IClientRepository } from "../interfaces/IClientRepository";

class ClientRepository implements IClientRepository {
    async create(data: ClientParams): Promise<client> {
        const { name, adress, phone, cityId } = data

        const client = await prisma.client.create({
            data: {
                name,
                adress,
                phone,
                city: {
                    connect: {
                        id: cityId
                    }
                }
            },
        })

        return client;
    }

    async delete(id: string): Promise<void> {
        await prisma.client.delete({
            where: {
                id
            }
        })
    }

    async update(id: string, data: UpdateClientParams): Promise<client> {
        const { name, adress, phone } = data;

        const client = await prisma.client.update({
            where: {
                id
            },
            data: {
                name,
                adress,
                phone
            }
        })

        return client;
    }

    async list(): Promise<client[]> {
        const clients = await prisma.client.findMany({
            include: {
                city: true,
                sale: true
            }
        });

        return clients;
    }

    async findById(id: string): Promise<client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id
            }
        })

        return client
    }

    async filterByCity(city: string): Promise<client[]> {
        const clients = await prisma.client.findMany({
            where: {
                city: {
                    name: {
                        equals: city
                    }
                },
            },
            include: {
                city: true,
                sale: true
            }
        });

        return clients;
    }
}

export { ClientRepository }