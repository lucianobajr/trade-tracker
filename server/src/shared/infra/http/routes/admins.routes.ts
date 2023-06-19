import { Router } from 'express';
import AdminController from '../../../../app/controllers/admin.controller';

const adminsRoutes = Router();

adminsRoutes.post('/', AdminController.create);
adminsRoutes.post('/auth/login', AdminController.login);

export { adminsRoutes };