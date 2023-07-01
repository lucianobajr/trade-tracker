import { Router } from 'express';
import MakerController from '../../../../app/controllers/maker.controller';

const makersRoutes = Router();

makersRoutes.post('/', MakerController.create);
makersRoutes.get('/', MakerController.list);
makersRoutes.delete('/:id', MakerController.delete);
makersRoutes.put('/:id', MakerController.update);

export { makersRoutes };