import { city } from "@prisma/client";
import { ICityView, IViewCreateParams, IViewCreateResponse } from "../interfaces/ICityView";

class CityView implements ICityView {
    create(params: IViewCreateParams): IViewCreateResponse {
        const data: IViewCreateResponse = {
            id: params.id,
            name: params.name,
            state: params.state
        }

        return data;
    }

    list(params: city[]): IViewCreateResponse[] {
        var data: IViewCreateResponse[] = [];

        params.map((city) => data.push({
            id: city.id,
            name: city.name,
            state: city.state,
        }))


        return data;
    }
}

export { CityView }