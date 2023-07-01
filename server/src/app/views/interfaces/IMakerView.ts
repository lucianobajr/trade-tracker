import { maker } from "@prisma/client";
import { Maker } from "../../models/maker";

interface IMakerView {
    create(params: maker): Maker;
    list(params: maker[]): { total: number;data: Maker[];};
    update(params: maker): Maker;
}

export { IMakerView };