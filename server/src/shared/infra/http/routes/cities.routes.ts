import { Router } from 'express';
import CityController from '../../../../app/controllers/city.controller';

const citiesRoutes = Router();

citiesRoutes.get('/', CityController.list);
citiesRoutes.get('/search', CityController.search);
citiesRoutes.get('/without-state', CityController.listWithoutState);
citiesRoutes.post('/', CityController.create);
citiesRoutes.delete('/:id', CityController.delete);

export { citiesRoutes };