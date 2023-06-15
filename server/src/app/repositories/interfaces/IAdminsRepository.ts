import { Admin } from '../../models/admin';
import { AdminParams } from "../../schemas/admin.schema"

interface IAdminsRepository {
    create(data: AdminParams): Promise<Admin>;
}

export { IAdminsRepository };