import { Router } from 'express';
import ReviewsController from '../controllers/reviews.controller';

const reviewsRouter = Router();

const reviewsController = new ReviewsController();

reviewsRouter.get('/', reviewsController.findAll.bind(reviewsController));

export default reviewsRouter;