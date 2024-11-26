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

      return res.status(status).json(result); // Retorna os dados em caso de sucesso
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento
    }
  }

  // Tipando a função rideConfirm com o formato esperado
  public async rideConfirm(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data: RideConfirm = req.body;
      const { status, result, error_code, error_description } = await this.ridesService.rideConfirm(data);

      //
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
      const { customer_id } = req.params; // Captura o customer_id da URL
      const { driver_id } = req.query; // Captura o driver_id da query string (opcional)

      console.log(customer_id, driver_id, '--------------')

      // Chama o serviço para obter as corridas
      const { status, result, error_code, error_description } = await this.ridesService.getRidesByCustomerId(customer_id, driver_id as string);

      // Verifica se ocorreu algum erro
      if (status >= 400) {
        return res.status(status).json({
          error_code,
          error_description
        });
      }

      // Retorna as corridas ou resultado
      return res.status(status).json(result);
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento
    }
  }
}

export default RidesController;
