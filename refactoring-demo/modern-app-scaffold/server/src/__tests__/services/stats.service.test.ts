import { PrismaClient } from '@prisma/client';
import { getTaskStats } from '../../services/stats.service';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      count: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

describe('Stats Service - getTaskStats', () => {
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    jest.clearAllMocks();
  });

  it('should return correct statistics for a user', async () => {
    const userId = 1;

    // Mock Prisma count calls
    (prisma.task.count as jest.Mock)
      .mockResolvedValueOnce(15) // total
      .mockResolvedValueOnce(5)   // pending
      .mockResolvedValueOnce(3)   // inProgress
      .mockResolvedValueOnce(6)   // completed
      .mockResolvedValueOnce(1);  // overdue

    const result = await getTaskStats(userId);

    expect(result).toEqual({
      total: 15,
      pending: 5,
      inProgress: 3,
      completed: 6,
      overdue: 1,
    });

    // Verify all counts were called with correct where clauses
    expect(prisma.task.count).toHaveBeenCalledTimes(5);
    
    // Check total count
    expect(prisma.task.count).toHaveBeenNthCalledWith(1, {
      where: {
        OR: [
          { createdById: userId },
          { assignedToId: userId },
        ],
      },
    });

    // Check pending count
    expect(prisma.task.count).toHaveBeenNthCalledWith(2, {
      where: {
        OR: [
          { createdById: userId },
          { assignedToId: userId },
        ],
        status: 'pending',
      },
    });

    // Check inProgress count
    expect(prisma.task.count).toHaveBeenNthCalledWith(3, {
      where: {
        OR: [
          { createdById: userId },
          { assignedToId: userId },
        ],
        status: 'in_progress',
      },
    });

    // Check completed count
    expect(prisma.task.count).toHaveBeenNthCalledWith(4, {
      where: {
        OR: [
          { createdById: userId },
          { assignedToId: userId },
        ],
        status: 'completed',
      },
    });

    // Check overdue count (dueDate < today AND status != 'completed')
    const overdueCall = (prisma.task.count as jest.Mock).mock.calls[4];
    expect(overdueCall[0].where.OR).toEqual([
      { createdById: userId },
      { assignedToId: userId },
    ]);
    expect(overdueCall[0].where.dueDate.lt).toBeInstanceOf(Date);
    expect(overdueCall[0].where.status.not).toBe('completed');
  });

  it('should return zero statistics when user has no tasks', async () => {
    const userId = 1;

    // Mock all counts returning 0
    (prisma.task.count as jest.Mock).mockResolvedValue(0);

    const result = await getTaskStats(userId);

    expect(result).toEqual({
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    });
  });

  it('should throw error if userId is not provided', async () => {
    await expect(getTaskStats(0)).rejects.toMatchObject({
      message: 'User ID não fornecido',
      statusCode: 400,
    });
  });

  it('should handle database errors gracefully', async () => {
    const userId = 1;

    // Mock database error
    (prisma.task.count as jest.Mock).mockRejectedValue(
      new Error('Database connection error')
    );

    await expect(getTaskStats(userId)).rejects.toMatchObject({
      message: 'Erro ao buscar estatísticas',
      statusCode: 500,
    });
  });

  it('should correctly filter overdue tasks (dueDate < today AND status != completed)', async () => {
    const userId = 1;

    (prisma.task.count as jest.Mock)
      .mockResolvedValueOnce(10) // total
      .mockResolvedValueOnce(3)  // pending
      .mockResolvedValueOnce(2)  // inProgress
      .mockResolvedValueOnce(4)  // completed
      .mockResolvedValueOnce(1); // overdue

    await getTaskStats(userId);

    // Verify overdue query
    const overdueCall = (prisma.task.count as jest.Mock).mock.calls[4];
    const overdueWhere = overdueCall[0].where;

    // Check that dueDate is less than today
    expect(overdueWhere.dueDate.lt).toBeInstanceOf(Date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(overdueWhere.dueDate.lt.getTime()).toBeLessThanOrEqual(today.getTime());

    // Check that status is not 'completed'
    expect(overdueWhere.status.not).toBe('completed');
  });
});
