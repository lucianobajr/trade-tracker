import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AdminParams,AdminSchema } from "../schemas/admin.schema"

import { AdminsRepository } from '../repositories/implementations/AdminsRepository';
import { renderAdmin } from '../views/admin.view';

class AdminController {
  async create(req: Request, res: Response) {
    try {
      const adminsRepository = container.resolve(AdminsRepository);

      const { name, email, password }: AdminParams = AdminSchema.parse(req.body);

      const admin = await adminsRepository.create({ name, email, password });

      return res.status(201).json(renderAdmin(admin));
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AdminController();