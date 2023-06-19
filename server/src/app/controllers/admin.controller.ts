import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AdminParams, AdminSchema } from "../../domain/admin/schemas/admin.schema"

import { CreateAdminUseCase } from "../../domain/admin/useCases/create-admin.usecase";

import { AdminView } from '../views/implementations/AdminView';
import { AppError } from '../../shared/errors/AppError';
import { LoginAdminUseCase } from '../../domain/admin/useCases/login-admin.usecase';
import { LoginParams, LoginSchema } from '../../domain/admin/schemas/login.schema';

class AdminController {
  async create(req: Request, res: Response) {
    try {
      const createAdminUseCase = container.resolve(CreateAdminUseCase);

      const { name, email, password }: AdminParams = AdminSchema.parse(req.body);

      try {
        const admin = await createAdminUseCase.execute({ name, email, password });
        const adminView = container.resolve(AdminView);

        return res.status(201).json(adminView.create({ id: admin.id, name: admin.name, email: admin.email, created_at: admin.createdAt }));
      } catch (error: unknown) {
        if (error instanceof AppError) {
          // Erro é uma instância de AppError
          return res.status(error.statusCode).json({ error: error.message })
        } else {
          // Erro é de outro tipo
          return res.status(500).json(error)
        }
      }

    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    const loginAdminUseCase = container.resolve(LoginAdminUseCase);

    const { email, password }: LoginParams = LoginSchema.parse(req.body);

    try {
      const data = await loginAdminUseCase.execute({ email, password });
      const loginView = container.resolve(AdminView);

      return res.status(201).json(loginView.login(data));

    } catch (error: unknown) {
      if (error instanceof AppError) {
        // Erro é uma instância de AppError
        return res.status(error.statusCode).json({ error: error.message })
      } else {
        // Erro é de outro tipo
        return res.status(500).json(error)
      }
    }
  }
}

export default new AdminController();