import { sale } from "@prisma/client";
import { SaleParams } from "../../schemas/sales.schema";

interface ISalesRepository {
    create(params: SaleParams, items: any[]): Promise<void>;
    list(): Promise<sale[]>;
}

export { ISalesRepository }