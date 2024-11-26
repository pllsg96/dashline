import { NextFunction, Response, Request } from 'express';
import RidesService from '../services/rides.service';
import { RideConfirm } from '../entities/entities';

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
      const { origin, destination, customer_id } = req.body;
      const { status, result } = await this.ridesService.estimateRide(origin, destination, customer_id);
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }

  public async rideConfirm(req: Request<{}, RideConfirm>, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { body } = req;
      const { status, result } = await this.ridesService.rideConfirm(body as RideConfirm);
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}



export default RidesController;