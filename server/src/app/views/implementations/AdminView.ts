import { ILoginResponse } from "../../../domain/admin/schemas/login.schema";
import formattedDate from "../../../utils/formatted-date";
import { IAdminView, IViewCreateParams, IViewCreateResponse, IViewLoginResponse } from "../interfaces/IAdminView";

class AdminView implements IAdminView {
    create(params: IViewCreateParams): IViewCreateResponse {
        const data: IViewCreateResponse = {
            id: params.id,
            email: params.email,
            name: params.name,
            created_at: formattedDate(params.created_at)
        }

        return data;
    }

    login(params: ILoginResponse): IViewLoginResponse {
        return {
            admin: {
                id: params.admin.id,
                email: params.admin.email,
                name: params.admin.name
            },
            token: params.token
        };
    }
}

export { AdminView }