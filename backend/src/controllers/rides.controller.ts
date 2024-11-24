import { NextFunction, Response, Request } from 'express';
import RidesService from '../services/rides.service';

class RidesController {
  public ridesService: RidesService;

  constructor() {
    this.ridesService = new RidesService();
  }
// fazer a tipagem do promise
  public async findAll(_req: Request, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { status, result } = await this.ridesService.findAll();
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }

  public async estimateRide(req: Request, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { origin, destination, userId } = req.body;
      const { status, result } = await this.ridesService.estimateRide(origin, destination, userId);
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}



export default RidesController;