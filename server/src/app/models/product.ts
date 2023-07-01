import { Maker } from "./maker";

interface Product {
    id?: string;

    name: string;
    description: string;

    stock: number;
    cost_price: number; // preço de custo
    selling_price: number; // preço de venda

    makerId?: string;
    maker?: Maker;
}

export { Product }