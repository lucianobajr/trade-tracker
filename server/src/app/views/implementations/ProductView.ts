import { product } from "@prisma/client";
import { Product } from "../../models/product";
import { IProductView } from "../interfaces/IProductView";

class ProductView implements IProductView {
    create({
        id,
        name,
        description,
        cost_price,
        makerId,
        selling_price,
        stock
    }: product): Product {
        const product: Product = {
            id,
            cost_price,
            description,
            name,
            selling_price,
            stock,
            makerId
        }

        return product;
    }

    list(params: Product[]): { total: number, data: Product[] } {
        let data: Product[] = []

        params.map((product) => {
            data.push({
                id: product.id,
                name: product.name,
                description: product.description,
                cost_price: product.cost_price,
                selling_price: product.selling_price,
                stock: product.stock,
                maker: product?.maker
            })
        })

        const responseView = {
            total: params.length,
            data
        }

        return responseView;
    }

    filter(params: Product[]): { total: number, data: Product[] } {
        let data: Product[] = []

        params.map((product) => {
            data.push({
                id: product.id,
                name: product.name,
                description: product.description,
                cost_price: product.cost_price,
                selling_price: product.selling_price,
                stock: product.stock,
                maker: product?.maker
            })
        })

        const responseView = {
            total: params.length,
            data
        }

        return responseView;
    }
}

export { ProductView }