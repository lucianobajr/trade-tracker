import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AdminParams,AdminSchema } from "../../domain/admin/schemas/admin.schema"

import { renderAdmin } from '../views/admin.view';

import { CreateAdminUseCase } from "../../domain/admin/useCases/create-user.usecase";

class AdminController {
  async create(req: Request, res: Response) {
    try {
      const createAdminUseCase = container.resolve(CreateAdminUseCase);

      const { name, email, password }: AdminParams = AdminSchema.parse(req.body);

      const admin = await createAdminUseCase.execute({name,email,password});

      return res.status(201).json(renderAdmin(admin));
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AdminController();