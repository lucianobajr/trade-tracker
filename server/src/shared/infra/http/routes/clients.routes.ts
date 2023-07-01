import { Router } from 'express';
import ClientController from '../../../../app/controllers/client.controller';

const clientsRoutes = Router();

clientsRoutes.post('/', ClientController.create);

export { clientsRoutes };