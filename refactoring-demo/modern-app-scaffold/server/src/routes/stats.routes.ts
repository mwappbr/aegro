import { Router, Request, Response, NextFunction } from 'express';
import { getTaskStats } from '../services/stats.service';
import { authenticate } from '../middleware/auth';
import { AppError } from '../middleware/error';

const router = Router();

/**
 * GET /api/tasks/stats
 * Get task statistics for authenticated user
 * Requires authentication (JWT token)
 */
router.get(
  '/stats',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get userId from authenticated request (set by auth middleware)
      const userId = req.userId;

      if (!userId) {
        const error: AppError = new Error('User ID não encontrado');
        error.statusCode = 401;
        return next(error);
      }

      // Get statistics
      const stats = await getTaskStats(userId);

      // Return statistics
      res.status(200).json({
        stats,
      });
    } catch (error) {
      // Pass errors to error handler middleware
      next(error);
    }
  }
);

export default router;
