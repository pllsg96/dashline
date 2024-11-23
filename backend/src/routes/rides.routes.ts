import { Router } from 'express';
import RidesController from '../controllers/rides.controller';

const ridesRouter = Router();
const ridesController = new RidesController();

ridesRouter.get('/', ridesController.findAll.bind(ridesController));
ridesRouter.post('/estimate', ridesController.estimateRide.bind(ridesController));

export default ridesRouter;