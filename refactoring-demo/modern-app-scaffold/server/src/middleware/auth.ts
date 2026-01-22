import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './error';

// Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token and extracts userId
 * Adds userId to request object for use in route handlers
 */
export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error: AppError = new Error('Token de autenticação não fornecido');
      error.statusCode = 401;
      return next(error);
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      const error: AppError = new Error('Token inválido ou expirado');
      error.statusCode = 401;
      return next(error);
    }

    // Add userId to request object
    req.userId = payload.userId;

    next();
  } catch (error) {
    const authError: AppError = new Error('Erro ao autenticar token');
    authError.statusCode = 401;
    next(authError);
  }
};
