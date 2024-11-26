import { Request, Response, NextFunction } from 'express';

const validateRideRequest = (req: Request, res: Response, next: NextFunction): any => {
  const { origin, destination, customer_id } = req.body;

  // Verificar se todos os campos estão presentes
  if (origin === undefined || destination === undefined || customer_id === undefined) {
    return res.status(400).json({ message: 'All fields (origin, destination, customer_id) are required' });
  }

  // Verificar se todos os campos são strings
  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof customer_id !== 'string') {
    return res.status(400).json({ message: 'All fields must be strings' });
  }

  // Verificar se não há campos adicionais
  const allowedFields = ['origin', 'destination', 'customer_id'];
  const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: 'No extra fields are allowed', extraFields });
  }
    
  if (origin === destination) {
    return res.status(400).json({ message: "The origin and destination cannot be the same" });
  }

  next();
};

export default validateRideRequest;
