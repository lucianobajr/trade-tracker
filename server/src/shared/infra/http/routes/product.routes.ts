import { Router } from 'express';
import ProductController from '../../../../app/controllers/product.controller';

const productsRoutes = Router();

productsRoutes.post('/', ProductController.create);
productsRoutes.get('/', ProductController.list);
productsRoutes.delete('/:id', ProductController.delete);
productsRoutes.put('/:id', ProductController.update);
productsRoutes.get('/filter', ProductController.filter);

export { productsRoutes };