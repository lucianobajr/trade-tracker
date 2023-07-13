import { Router } from 'express';
import SalesController from '../../../../app/controllers/sales.controller';

const salesRoutes = Router();

salesRoutes.post('/', SalesController.create);
salesRoutes.get('/', SalesController.list);

export { salesRoutes };