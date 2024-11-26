import { Router } from 'express';
import RidesController from '../controllers/rides.controller';
import validateRideRequest from '../middlewares/validateRideRequest'; // Sem chaves
import validateConfirmRide from '../middlewares/validateConfirmRide';

const ridesRouter = Router();
const ridesController = new RidesController();

ridesRouter.get('/', ridesController.findAll.bind(ridesController));
ridesRouter.post('/estimate', validateRideRequest, ridesController.estimateRide.bind(ridesController));
ridesRouter.patch('/confirm', validateConfirmRide, ridesController.rideConfirm.bind(ridesController));

export default ridesRouter;
