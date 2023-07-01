import { maker } from "@prisma/client";
import prisma from "../../../../shared/infra/prisma/prisma";
import { MakerParams, UpdateMakerParams } from "../../schemas/maker.schema";
import { IMakerRepository } from "../interfaces/IMakerRepository";

class MakerRepository implements IMakerRepository {
    async create(data: MakerParams): Promise<maker> {
        const maker = await prisma.maker.create({
            data: data
        });

        return maker;
    }

    async delete(id: string): Promise<void> {
        await prisma.maker.delete({
            where: {
                id
            }
        })
    }

    async update(id: string, data: UpdateMakerParams): Promise<maker> {
        const maker = await prisma.maker.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                site: data.site
            }

        })

        return maker
    }

    async list(): Promise<maker[]> {
        const makers = await prisma.maker.findMany();

        return makers;
    }

    async findById(id: string): Promise<maker | null> {
        const maker = await prisma.maker.findUnique({
            where: {
                id
            }
        })

        return maker;
    }
}

export { MakerRepository }