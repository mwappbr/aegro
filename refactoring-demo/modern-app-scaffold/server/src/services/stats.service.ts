import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error';

const prisma = new PrismaClient();

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

/**
 * Get task statistics for a user
 * @param userId User ID from JWT token
 * @returns Task statistics object
 * @throws AppError if userId is not provided
 */
export async function getTaskStats(userId: number): Promise<TaskStats> {
  if (!userId) {
    const error: AppError = new Error('User ID não fornecido');
    error.statusCode = 400;
    throw error;
  }

  // Get today's date at start of day for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // Get all tasks for the user (created by or assigned to)
    // Using Prisma's OR condition to get tasks where user is creator or assignee
    const whereClause = {
      OR: [
        { createdById: userId },
        { assignedToId: userId },
      ],
    };

    // Total count
    const total = await prisma.task.count({
      where: whereClause,
    });

    // Pending count
    const pending = await prisma.task.count({
      where: {
        ...whereClause,
        status: 'pending',
      },
    });

    // In Progress count
    const inProgress = await prisma.task.count({
      where: {
        ...whereClause,
        status: 'in_progress',
      },
    });

    // Completed count
    const completed = await prisma.task.count({
      where: {
        ...whereClause,
        status: 'completed',
      },
    });

    // Overdue count: dueDate < today AND status != 'completed'
    const overdue = await prisma.task.count({
      where: {
        ...whereClause,
        dueDate: {
          lt: today,
        },
        status: {
          not: 'completed',
        },
      },
    });

    return {
      total,
      pending,
      inProgress,
      completed,
      overdue,
    };
  } catch (error) {
    const dbError: AppError = new Error('Erro ao buscar estatísticas');
    dbError.statusCode = 500;
    throw dbError;
  }
}
