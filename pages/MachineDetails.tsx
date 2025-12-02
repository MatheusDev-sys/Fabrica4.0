
import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';

const MachineDetails: React.FC = () => {
  const { id } = useParams();
  const { machines, factoryData, maintenanceList } = useApp();
  const machine = machines.find(m => m.id === id) || machines[0];

  // Logic: Zero out data if machine is Stopped or Idle
  const isStopped = machine.status === 'Parada' || machine.status === 'Ociosa';

  // Find next scheduled preventive maintenance for this machine
  const nextMaintenance = maintenanceList.find(
    m => m.machine === machine.name &&
      m.type === 'Preventiva' &&
      (m.status === 'Agendada' || m.status === 'Pendente')
  );

  // Generate vibration data based on status
  const vibrationData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    value: isStopped ? 0 : Math.sin(i * 0.5) * 20 + 50 + Math.random() * 10
  }));

  // Logic: Set temp to ambient if stopped, otherwise simulated operational temp
  const temperature = isStopped ? 25 : 72;

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Operando':
        return {
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-500',
          shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
          icon: 'play_arrow',
          animate: true
        };
      case 'Parada':
        return {
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-500',
          shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
          icon: 'stop',
          animate: false
        };
      case 'Manutenção':
        return {
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-500',
          shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
          icon: 'build',
          animate: false
        };
      default: // Ociosa
        return {
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-500',
          shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
          icon: 'pause',
          animate: false
        };
    }
  };

  const statusConfig = getStatusDisplay(machine.status);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('pt-BR');

    // Header
    doc.setFillColor('#1f2937');
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Precisium - Relatório de Máquina", 15, 20);

    doc.setFontSize(10);
    doc.text(factoryData.name, 195, 20, { align: 'right' });
    doc.text(date, 195, 26, { align: 'right' });

    // Machine Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Máquina: ${machine.name} (${machine.id})`, 15, 55);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Modelo: ${machine.model}`, 15, 65);
    doc.text(`Status Atual: ${machine.status}`, 15, 72);
    doc.text(`Horas Trabalhadas: ${machine.hours.toLocaleString()}h`, 15, 79);
    doc.text(`Última Manutenção: ${machine.lastMaintenance}${machine.lastMaintenanceType ? ` (${machine.lastMaintenanceType})` : ''}`, 15, 86);

    // Simulated Metrics
    doc.text("Métricas Atuais:", 15, 100);
    doc.text(`- Nível de Vibração: ${isStopped ? '0' : '50'} mm/s`, 20, 108);
    doc.text(`- Temperatura do Motor: ${temperature}°C`, 20, 115);
    doc.text("- Avanço: 250 mm/min", 20, 122);

    doc.save(`Maquina_${machine.id}_${date.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Detalhes da Máquina: {machine.id}</h1>
          <p className="text-gray-500 dark:text-gray-400">Painel de controle com informações em tempo real.</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors btn-animate"
        >
          <span className="material-symbols-outlined text-base">download</span>
          Exportar Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
            <h3 className="p-4 border-b border-gray-200 dark:border-border-dark font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5">Informações Gerais</h3>
            <div className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-gray-500 dark:text-gray-500">Nome</span>
                <span className="font-medium text-gray-900 dark:text-white">{machine.name}</span>
              </div>
              <div>
                <span className="block text-gray-500 dark:text-gray-500">Modelo</span>
                <span className="font-medium text-gray-900 dark:text-white">{machine.model}</span>
              </div>
              <div>
                <span className="block text-gray-500 dark:text-gray-500">Fabricante</span>
                <span className="font-medium text-gray-900 dark:text-white">Siemens</span>
              </div>
              <div>
                <span className="block text-gray-500 dark:text-gray-500">Ano</span>
                <span className="font-medium text-gray-900 dark:text-white">2022</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 gap-4 shadow-sm card-hover">
            <div className="relative">
              {statusConfig.animate && <div className={`absolute inset-0 ${statusConfig.bg}/20 rounded-full animate-ping`}></div>}
              <div className={`relative size-24 ${statusConfig.bg} rounded-full flex items-center justify-center ${statusConfig.shadow}`}>
                <span className="material-symbols-outlined text-5xl text-white">{statusConfig.icon}</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`text-2xl font-bold ${statusConfig.color}`}>{machine.status}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Status Atual</p>
            </div>
          </div>
        </div>

        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm card-hover">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Níveis de Vibração (mm/s)</h3>
            <div style={{ width: '100%', height: 256, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vibrationData}>
                  <defs>
                    <linearGradient id="colorVib" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a85ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0a85ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0a85ff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVib)"
                    isAnimationActive={!isStopped}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm card-hover">
              <h3 className="text-gray-900 dark:text-white font-bold mb-4 border-b border-gray-200 dark:border-border-dark pb-2">Parâmetros de Usinagem</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Avanço</span>
                  <span className="text-xl font-mono text-gray-900 dark:text-white">{isStopped ? 0 : 250} <span className="text-xs text-gray-500">mm/min</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Rotação</span>
                  <span className="text-xl font-mono text-gray-900 dark:text-white">{isStopped ? 0 : 1200} <span className="text-xs text-gray-500">RPM</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Temp. Motor</span>
                  <span className={`text-xl font-mono ${temperature > 60 ? 'text-yellow-600 dark:text-yellow-500' : 'text-green-600 dark:text-green-500'}`}>
                    {temperature} <span className="text-xs text-gray-500">°C</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm card-hover">
              <h3 className="text-gray-900 dark:text-white font-bold mb-4 border-b border-gray-200 dark:border-border-dark pb-2">Histórico de Manutenção</h3>
              <div className="space-y-3">
                {machine.lastMaintenance && (
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 dark:text-green-400">check_circle</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {machine.lastMaintenanceType || 'Manutenção'} Realizada
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{machine.lastMaintenance}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined ${nextMaintenance ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>calendar_month</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {nextMaintenance ? `${nextMaintenance.type} Agendada` : 'Próxima Preventiva'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {nextMaintenance ? nextMaintenance.date : 'Aguardando agendamento'}
                    </p>
                    {nextMaintenance && nextMaintenance.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {nextMaintenance.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
