import { maker } from "@prisma/client";
import { MakerParams, UpdateMakerParams } from "../../schemas/maker.schema";

interface IMakerRepository {
    create(data: MakerParams): Promise<maker>;
    delete(id: string): Promise<void>;
    update(id: string, data: UpdateMakerParams): Promise<maker>;
    list(): Promise<maker[]>;
    findById(id: string): Promise<maker | null>;
}

export { IMakerRepository }