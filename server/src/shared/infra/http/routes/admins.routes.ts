import { Router } from 'express';
import AdminController from '../../../../app/controllers/admin.controller';

const adminsRoutes = Router();

adminsRoutes.post('/', AdminController.create);

export { adminsRoutes };