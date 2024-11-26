import { Router } from 'express';
import RidesController from '../controllers/rides.controller';
import validateRideRequest from '../middlewares/validateRideRequest'; // Sem chaves
import validateConfirmRide from '../middlewares/validateConfirmRide';

const ridesRouter = Router();
const ridesController = new RidesController();

ridesRouter.post('/estimate', validateRideRequest, ridesController.estimateRide.bind(ridesController));
ridesRouter.patch('/confirm', validateConfirmRide, ridesController.rideConfirm.bind(ridesController));
ridesRouter.get('/:customer_id', ridesController.getRidesByCustomerId.bind(ridesController));


export default ridesRouter;
