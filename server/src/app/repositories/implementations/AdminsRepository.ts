import { Admin } from '../../models/admin';
import { IAdminsRepository } from '../interfaces/IAdminsRepository';
import { AdminParams } from "../../schemas/admin.schema"

import prisma from "../../../shared/infra/prisma/prisma";

class AdminsRepository implements IAdminsRepository {
    async create(data: AdminParams): Promise<Admin> {
        const admin = await prisma.admin.create({
            data,
        });

        const adminModel: Admin = {
            id: admin.id,
            name: admin.name,
            password: admin.password,
            email: admin.email,
            createdAt: admin.created_at
        }

        return adminModel;
    }
}

export { AdminsRepository };
