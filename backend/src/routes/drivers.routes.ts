import { Router } from 'express';
import DriversController from '../controllers/drivers.controller';

const driversRouter = Router();

const driversController = new DriversController();

driversRouter.get('/', driversController.findAll.bind(driversController));

export default driversRouter;