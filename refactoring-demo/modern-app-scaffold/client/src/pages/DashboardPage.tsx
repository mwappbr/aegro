import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header/Header';
import { StatsCards } from '../components/StatsCards/StatsCards';
import { getTaskStats } from '../api/stats';
import { TaskStats, TaskFilter } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load statistics on component mount
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const statsData = await getTaskStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
      console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter click (for future integration with FilterBar - Story 3.5)
  const handleFilter = (filter: TaskFilter) => {
    // TODO: Integrate with FilterBar when Story 3.5 is implemented
    console.log('Filter clicked:', filter);
    // This will be connected to FilterBar in Story 3.5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            {user && (
              <div className="mb-6">
                <p className="text-lg text-gray-700">
                  Bem-vindo, <span className="font-semibold">{user.name}</span>!
                </p>
                <p className="text-sm text-gray-500 mt-2">Email: {user.email}</p>
              </div>
            )}
            
            {/* Statistics Cards */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={loadStats}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
              <StatsCards stats={stats} onFilter={handleFilter} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
