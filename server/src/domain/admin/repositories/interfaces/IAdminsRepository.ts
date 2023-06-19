import { admin } from '@prisma/client';
import { AdminParams } from "../../schemas/admin.schema"

interface IAdminsRepository {
    create(data: AdminParams): Promise<admin>;
    findByEmail(email: string): Promise<admin | null>;
}

export { IAdminsRepository };