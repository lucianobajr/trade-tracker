import { maker } from "@prisma/client";

import { Maker } from "../../models/maker";

import { IMakerView } from "../interfaces/IMakerView";

class MakerView implements IMakerView {
    create(params: maker): Maker {
        const maker: Maker = {
            id: params.id,
            name: params.name,
            site: params.site
        }

        return maker;
    }

    list(params: maker[]): { total: number; data: Maker[]; } {
        var data: Maker[] = [];

        params.map((maker) => data.push({
            id: maker.id,
            name: maker.name,
            site: maker.site
        }))

        const viewResponse = {
            total: params.length,
            data
        }

        return viewResponse;
    }

    update(params: maker): Maker {
        const maker: Maker = {
            id: params.id,
            name: params.name,
            site: params.site
        }

        return maker;
    }
}

export { MakerView }