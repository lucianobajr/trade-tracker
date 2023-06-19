import { IAdminsRepository } from '../interfaces/IAdminsRepository';
import { AdminParams } from "../../schemas/admin.schema"

import { admin } from '@prisma/client';
import prisma from "../../../../shared/infra/prisma/prisma";

class AdminsRepository implements IAdminsRepository {
    async create(data: AdminParams): Promise<admin> {
        const admin = await prisma.admin.create({
            data,
        });

        return admin;
    }

    async findByEmail(email: string): Promise<admin | null> {
        const admin = await prisma.admin.findUnique({
            where:{
                email
            }
        })

        return admin;
    }
}

export { AdminsRepository };
