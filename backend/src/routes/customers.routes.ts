import { Router } from 'express';
import CustomersController from '../controllers/customers.controller';

const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.get('/', customersController.findAll.bind(customersController));

export default customersRouter;