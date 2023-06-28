import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CityController{
    async create(req: Request, res: Response) {}
}

export default new CityController();