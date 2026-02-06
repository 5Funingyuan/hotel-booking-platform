import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json(errorResponse(err.message, 400));
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(errorResponse('Unauthorized', 401));
  }
  
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json(errorResponse('Database error', 400));
  }
  
  res.status(500).json(errorResponse(err.message || 'Internal server error', 500));
};