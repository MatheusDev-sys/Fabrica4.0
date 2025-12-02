
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendUp, icon, color }) => {
  const valueColor = color || 'text-gray-900 dark:text-white';
  
  return (
    <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden group shadow-sm transition-all card-hover">
      <div className="flex justify-between items-start z-10">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</p>
        {icon && <span className={`material-symbols-outlined ${valueColor} opacity-80`}>{icon}</span>}
      </div>
      <p className={`text-4xl font-bold font-display z-10 ${valueColor}`}>{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium z-10 ${trendUp ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          <span className="material-symbols-outlined text-sm">
            {trendUp ? 'trending_up' : 'trending_down'}
          </span>
          {trend}
        </div>
      )}
      {/* Background decoration */}
      <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110`}>
         <span className={`material-symbols-outlined text-9xl ${valueColor}`}>{icon || 'analytics'}</span>
      </div>
    </div>
  );
};

export default StatsCard;