import { api } from './client';
import { TaskStats } from '../types';

export interface StatsResponse {
  stats: TaskStats;
}

/**
 * Get task statistics for the authenticated user
 * @returns Task statistics
 * @throws Error if request fails
 */
export async function getTaskStats(): Promise<TaskStats> {
  try {
    const response = await api.get<StatsResponse>('/tasks/stats');
    return response.stats;
  } catch (error: unknown) {
    // Re-throw with a more user-friendly message if available
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao buscar estatísticas. Tente novamente.');
  }
}
