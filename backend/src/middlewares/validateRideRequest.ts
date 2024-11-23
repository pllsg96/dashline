import { Request, Response, NextFunction } from 'express';

const validateRideRequest = (req: Request, res: Response, next: NextFunction): any => {
  const { origin, destination, userId } = req.body;

  // Verificar se todos os campos estão presentes
  if (origin === undefined || destination === undefined || userId === undefined) {
    return res.status(400).json({ message: 'All fields (origin, destination, userId) are required' });
  }

  // Verificar se todos os campos são strings
  if (typeof origin !== 'string' || typeof destination !== 'string' || typeof userId !== 'string') {
    return res.status(400).json({ message: 'All fields must be strings' });
  }

  // Verificar se não há campos adicionais
  const allowedFields = ['origin', 'destination', 'userId'];
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
