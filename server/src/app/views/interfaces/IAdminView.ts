import { ILoginResponse } from "../../../domain/admin/schemas/login.schema";

interface IViewCreateResponse {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

interface IViewCreateParams {
    id: string;
    name: string;
    email: string;
    created_at: Date;
}

interface IViewLoginResponse {
    admin:{
        id:string;
        name:string;
        email:string;
    };
    token:string;
}

interface IAdminView {
    create(params: IViewCreateParams): IViewCreateResponse;
    login(params: ILoginResponse): IViewLoginResponse;
}

export { IAdminView, IViewCreateParams, IViewCreateResponse,IViewLoginResponse };