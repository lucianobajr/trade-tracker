import { inject, injectable } from 'tsyringe';
import { ISalesRepository } from '../repositories/interfaces/ISalesRepository';

@injectable()
class ListSaleUseCase {
    constructor(
        @inject("SalesRepository") private salesRepository: ISalesRepository
    ) { }

    async execute() {
        const sales = await this.salesRepository.list()

        return sales;
    }
}

export default ListSaleUseCase;