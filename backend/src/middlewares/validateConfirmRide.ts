import { Request, Response, NextFunction } from 'express';

export default function validateRideRequest(req: Request, res: Response, next: NextFunction): any {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

  // Verificar se todos os campos estão presentes
  if (
    customer_id === undefined || 
    origin === undefined || 
    destination === undefined || 
    distance === undefined || 
    duration === undefined || 
    driver === undefined || 
    value === undefined || 
    driver.id === undefined || 
    driver.name === undefined
  ) {
    return res.status(400).json({ message: 'All fields (customer_id, origin, destination, distance, duration, driver, value) are required' });
  }

  // Verificar se os tipos dos campos estão corretos
  if (
    typeof customer_id !== 'string' || 
    typeof origin !== 'string' || 
    typeof destination !== 'string' || 
    typeof distance !== 'number' || 
    typeof duration !== 'string' || 
    typeof driver !== 'object' || 
    typeof driver.id !== 'number' || 
    typeof driver.name !== 'string' || 
    typeof value !== 'number'
  ) {
    return res.status(400).json({ message: 'Invalid data types for one or more fields' });
  }

  // Verificar se não há campos adicionais
  const allowedFields = ['customer_id', 'origin', 'destination', 'distance', 'duration', 'driver', 'value'];
  const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ message: 'No extra fields are allowed', extraFields });
  }
    
  // Verificar se origem e destino são diferentes
  if (origin === destination) {
    return res.status(400).json({ message: "The origin and destination cannot be the same" });
  }

  next();
};
