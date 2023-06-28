import { city } from "@prisma/client";

interface IViewCreateResponse {
    id: string;
    name: string;
    state: string;
}

interface IViewCreateParams {
    id: string;
    name: string;
    state: string;
}

interface ICityView {
    create(params: IViewCreateParams): IViewCreateResponse;
    list(params: city[]): IViewCreateResponse[];
}

export { ICityView, IViewCreateParams, IViewCreateResponse };