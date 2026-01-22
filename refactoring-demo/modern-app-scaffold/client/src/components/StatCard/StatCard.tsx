import React, { ReactNode } from 'react';

export interface StatCardProps {
  label: string;
  value: number;
  color?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  color = 'bg-white',
  icon,
  onClick,
}) => {
  const baseClasses = 'rounded-lg shadow-md p-6 transition-all duration-200';
  const hoverClasses = onClick ? 'hover:shadow-lg cursor-pointer transform hover:scale-105' : '';
  const colorClasses = color === 'bg-red-100' || color === 'bg-red-50' 
    ? `${color} border-2 border-red-300` 
    : `${color} border border-gray-200`;

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${hoverClasses}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color.includes('red') ? 'text-red-700' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={`ml-4 ${color.includes('red') ? 'text-red-600' : 'text-gray-500'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
