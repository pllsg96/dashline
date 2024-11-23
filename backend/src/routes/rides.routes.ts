import { Router } from 'express';
import RidesController from '../controllers/rides.controller';
import validateRideRequest from '../middlewares/validateRideRequest'; // Sem chaves

const ridesRouter = Router();
const ridesController = new RidesController();

ridesRouter.get('/', ridesController.findAll.bind(ridesController));
ridesRouter.post('/estimate', validateRideRequest, ridesController.estimateRide.bind(ridesController));

export default ridesRouter;
