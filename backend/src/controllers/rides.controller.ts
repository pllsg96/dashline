import { NextFunction, Response, Request } from 'express';
import RidesService from '../services/rides.service';
import { RideConfirm } from '../entities/entities';

class RidesController {
  public ridesService: RidesService;

  constructor() {
    this.ridesService = new RidesService();
  }

  
  public async estimateRide(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { origin, destination, customer_id } = req.body;
      const { status, result, error_code, error_description } = await this.ridesService.estimateRide(origin, destination, customer_id);

      
      if (status >= 400) {
        return res.status(status).json({
          error_code,
          error_description
        });
      }

      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }

 
  public async rideConfirm(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data: RideConfirm = req.body;
      const { status, result, error_code, error_description } = await this.ridesService.rideConfirm(data);

     
      if (status >= 400) {
        return res.status(status).json({
          error_code,
          error_description
        });
      }

      return res.status(status).json(result);
    } catch (error) {
      return next(error); 
    }
  }

  

 public async getRidesByCustomerId(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { customer_id } = req.params;
      const { driver_id } = req.query;

      console.log(customer_id, driver_id, '--------------')

     
      const { status, result, error_code, error_description } = await this.ridesService.getRidesByCustomerId(customer_id, driver_id as string);

     
      if (status >= 400) {
        return res.status(status).json({
          error_code,
          error_description
        });
      }

     
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default RidesController;
