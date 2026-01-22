import { Router, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { registerSchema, RegisterInput, loginSchema, LoginInput } from '../validators/auth.validator';
import { register, login } from '../services/auth.service';
import { AppError } from '../middleware/error';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body with Zod
      const validatedData: RegisterInput = registerSchema.parse(req.body);

      // Register user
      const result = await register(validatedData);

      // Return success response
      res.status(201).json({
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        const validationError: AppError = new Error(
          error.issues[0]?.message || 'Dados inválidos'
        );
        validationError.statusCode = 400;
        return next(validationError);
      }

      // Pass other errors to error handler middleware
      next(error);
    }
  }
);

/**
 * POST /api/auth/login
 * Login a user
 */
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body with Zod
      const validatedData: LoginInput = loginSchema.parse(req.body);

      // Login user
      const result = await login(validatedData);

      // Return success response
      res.status(200).json({
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        const validationError: AppError = new Error(
          error.issues[0]?.message || 'Dados inválidos'
        );
        validationError.statusCode = 400;
        return next(validationError);
      }

      // Pass other errors to error handler middleware
      next(error);
    }
  }
);

export default router;
