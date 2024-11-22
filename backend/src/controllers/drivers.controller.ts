import { NextFunction, Response, Request } from 'express';
import DriversService from '../services/drivers.service';

class DriversController {
  public driversService: DriversService;

  constructor() {
    this.driversService = new DriversService();
  }
// fazer a tipagem do promise
  public async findAll(_req: Request, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { status, result } = await this.driversService.findAll();
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default DriversController;