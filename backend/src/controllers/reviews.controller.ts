import { NextFunction, Response, Request } from 'express';
import ReviewsService from '../services/reviews.service';

class ReviewsController {
  public reviewsService: ReviewsService;

  constructor() {
    this.reviewsService = new ReviewsService();
  }
// fazer a tipagem do promise
  public async findAll(_req: Request, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { status, result } = await this.reviewsService.findAll();
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default ReviewsController;