import React from 'react';
import { StatCard } from '../StatCard/StatCard';
import { TaskStats, TaskFilter } from '../../types';

export interface StatsCardsProps {
  stats: TaskStats;
  onFilter?: (filter: TaskFilter) => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, onFilter }) => {
  // Alert icon for overdue card
  const AlertIcon = (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );

  const handleCardClick = (filter: Partial<TaskFilter>) => {
    if (onFilter) {
      onFilter(filter as TaskFilter);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <StatCard
        label="Total"
        value={stats.total}
        onClick={onFilter ? () => handleCardClick({}) : undefined}
      />
      <StatCard
        label="Pendentes"
        value={stats.pending}
        onClick={onFilter ? () => handleCardClick({ status: 'pending' }) : undefined}
      />
      <StatCard
        label="Em Progresso"
        value={stats.inProgress}
        onClick={onFilter ? () => handleCardClick({ status: 'in_progress' }) : undefined}
      />
      <StatCard
        label="Concluídas"
        value={stats.completed}
        onClick={onFilter ? () => handleCardClick({ status: 'completed' }) : undefined}
      />
      <StatCard
        label="Atrasadas"
        value={stats.overdue}
        color="bg-red-100"
        icon={AlertIcon}
        onClick={onFilter ? () => handleCardClick({ status: 'pending' }) : undefined}
      />
    </div>
  );
};
