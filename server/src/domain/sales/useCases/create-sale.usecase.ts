import { SaleParams, SaleParamsSchema } from '../schemas/sales.schema';
import { inject, injectable } from 'tsyringe';
import { ISalesRepository } from '../repositories/interfaces/ISalesRepository';

@injectable()
class CreateSaleUseCase {
    constructor(
        @inject("SalesRepository") private salesRepository: ISalesRepository
    ) { }

    async execute(params: SaleParams) {
        const validatedParams = SaleParamsSchema.parse(params);
        try {
            const sale = await this.salesRepository.create(
                validatedParams,
                validatedParams.items
            );
            return sale;
        } catch (error) {
            // Trate o erro adequadamente
            throw new Error('Failed to create the sale.');
        }
    }
}

export default CreateSaleUseCase;