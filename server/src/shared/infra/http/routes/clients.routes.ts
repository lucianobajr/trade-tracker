import { Router } from 'express';
import ClientController from '../../../../app/controllers/client.controller';

const clientsRoutes = Router();

clientsRoutes.post('/', ClientController.create);
clientsRoutes.delete('/:id', ClientController.delete);
clientsRoutes.get('/filter', ClientController.filter);
clientsRoutes.get('/', ClientController.list);
clientsRoutes.put('/:id', ClientController.update);

export { clientsRoutes };