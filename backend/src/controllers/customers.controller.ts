import { NextFunction, Response, Request } from 'express';
import CustomersService from '../services/customers.service';

class CustomersController {
  public customersService: CustomersService;

  constructor() {
    this.customersService = new CustomersService();
  }
// fazer a tipagem do promise
  public async findAll(_req: Request, res: Response, next: NextFunction): Promise<any>  {
    try {
      const { status, result } = await this.customersService.findAll();
      return res.status(status).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default CustomersController;