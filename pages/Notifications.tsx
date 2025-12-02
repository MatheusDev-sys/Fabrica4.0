
import React from 'react';

const Notifications: React.FC = () => {
  // Mock data for full list
  const notifications = [
    { id: 1, text: "Manutenção preventiva na CNC-01 agendada para amanhã.", time: "Há 1 hora", type: "info" },
    { id: 2, text: "Ocorrência #7451: Vazamento de óleo detectado.", time: "Há 3 horas", type: "error" },
    { id: 3, text: "Nova ordem de produção OP-10535 criada.", time: "Há 5 horas", type: "success" },
    { id: 4, text: "Estoque de Parafuso M4 abaixo do mínimo.", time: "Há 1 dia", type: "warning" },
    { id: 5, text: "Relatório mensal gerado com sucesso.", time: "Há 2 dias", type: "info" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-500 bg-red-500/10';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10';
      case 'success': return 'text-green-500 bg-green-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Central de Notificações</h1>
          <p className="text-gray-500 dark:text-gray-400">Histórico de alertas e atividades do sistema.</p>
        </div>
        <button className="text-primary hover:underline text-sm">Marcar todas como lidas</button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="divide-y divide-gray-200 dark:divide-border-dark">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className={`p-2 rounded-lg shrink-0 ${getColor(notif.type)}`}>
                <span className="material-symbols-outlined">{getIcon(notif.type)}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">{notif.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors btn-animate rounded-full p-1">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;