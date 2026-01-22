import request from 'supertest';
import express from 'express';
import statsRoutes from '../../routes/stats.routes';
import { errorHandler } from '../../middleware/error';

// Mock the stats service
jest.mock('../../services/stats.service', () => ({
  getTaskStats: jest.fn(),
}));

// Mock the auth middleware
jest.mock('../../middleware/auth', () => ({
  authenticate: (req: any, _res: any, next: any) => {
    // Simulate authenticated user
    req.userId = 1;
    next();
  },
}));

import { getTaskStats } from '../../services/stats.service';
const mockGetTaskStats = getTaskStats as jest.MockedFunction<typeof getTaskStats>;

const app = express();
app.use(express.json());
app.use('/api/tasks', statsRoutes);
app.use(errorHandler);

describe('GET /api/tasks/stats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return task statistics for authenticated user', async () => {
    const mockStats = {
      total: 15,
      pending: 5,
      inProgress: 3,
      completed: 6,
      overdue: 1,
    };

    mockGetTaskStats.mockResolvedValue(mockStats);

    const response = await request(app)
      .get('/api/tasks/stats')
      .set('Authorization', 'Bearer valid_token')
      .expect(200);

    expect(response.body).toEqual({
      stats: mockStats,
    });
    expect(mockGetTaskStats).toHaveBeenCalledWith(1);
  });

  it('should return zero statistics when user has no tasks', async () => {
    const mockStats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    };

    mockGetTaskStats.mockResolvedValue(mockStats);

    const response = await request(app)
      .get('/api/tasks/stats')
      .set('Authorization', 'Bearer valid_token')
      .expect(200);

    expect(response.body).toEqual({
      stats: mockStats,
    });
  });

  it('should handle service errors', async () => {
    const error: any = new Error('Erro ao buscar estatísticas');
    error.statusCode = 500;
    mockGetTaskStats.mockRejectedValue(error);

    const response = await request(app)
      .get('/api/tasks/stats')
      .set('Authorization', 'Bearer valid_token')
      .expect(500);

    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Erro ao buscar estatísticas',
    });
  });
});
