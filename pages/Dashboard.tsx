
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '../components/StatsCard';
import { useApp } from '../context/AppContext';

const productionData = [
  { time: '08:00', value: 40 },
  { time: '09:00', value: 85 },
  { time: '10:00', value: 65 },
  { time: '11:00', value: 90 },
  { time: '12:00', value: 45 },
  { time: '13:00', value: 110 },
  { time: '14:00', value: 95 },
];

const statusData = [
  { name: 'Operando', value: 65, color: '#22c55e' },
  { name: 'Parada', value: 15, color: '#ef4444' },
  { name: 'Manutenção', value: 10, color: '#3b82f6' },
  { name: 'Ociosa', value: 10, color: '#eab308' },
];

const Dashboard: React.FC = () => {
  const { machines } = useApp();

  const operatingCount = machines.filter(m => m.status === 'Operando').length;
  const maintenanceCount = machines.filter(m => m.status === 'Manutenção').length;
  const stoppedCount = machines.filter(m => m.status === 'Parada').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Dashboard Industrial</h1>
        <p className="text-gray-500 dark:text-gray-400">Visão geral do sistema industrial em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Produção do dia" value="1,280" trend="+5.2%" trendUp={true} icon="conveyor_belt" color="text-gray-900 dark:text-white" />
        <StatsCard title="Eficiência geral (OEE)" value="85%" trend="+1.8%" trendUp={true} icon="speed" color="text-gray-900 dark:text-white" />
        <StatsCard title="CNCs em operação" value={`${operatingCount}/${machines.length}`} icon="precision_manufacturing" color="text-gray-900 dark:text-white" />
        <StatsCard title="Paradas ativas" value={stoppedCount.toString()} trend="+1" trendUp={false} icon="warning" color="text-yellow-600 dark:text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm card-hover">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Produção por Hora (Últimas 8h)</h3>
          <div style={{ width: '100%', height: 300, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a85ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0a85ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', zIndex: 100 }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0a85ff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 flex flex-col shadow-sm card-hover">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Status das Máquinas</h3>
          <div className="flex-1 flex justify-center items-center relative" style={{ minHeight: 250, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', zIndex: 100 }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900 dark:text-white">{machines.length}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm card-hover">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Alertas Recentes</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
            <span className="material-symbols-outlined text-red-500">error</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-600 dark:text-red-400">Prioridade Alta</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">CNC-07: Temperatura excedida.</p>
            </div>
            <span className="text-xs text-gray-500">há 5 min</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500">warning</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">Prioridade Média</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Insumo baixo para OP-9874.</p>
            </div>
            <span className="text-xs text-gray-500">há 32 min</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
            <span className="material-symbols-outlined text-blue-500">info</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Prioridade Baixa</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Manutenção preventiva CNC-05 agendada.</p>
            </div>
            <span className="text-xs text-gray-500">há 2 horas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;