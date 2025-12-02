import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Maintenance as MaintenanceType } from '../types';

const Maintenance: React.FC = () => {
  const { maintenanceList, addMaintenance, markMaintenanceCompleted, machines } = useApp();
  const [view, setView] = useState<'history' | 'preventive'>('history');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState<Partial<MaintenanceType>>({
    status: 'Agendada',
    criticality: 'Média',
    type: 'Preventiva',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredList = view === 'preventive'
    ? maintenanceList.filter(m => m.type === 'Preventiva' && m.status !== 'Concluída')
    : maintenanceList;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMaintenance.machine && newMaintenance.description && newMaintenance.date) {
      const [year, month, day] = newMaintenance.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      addMaintenance({
        ...newMaintenance,
        id: `#MP-${Math.floor(Math.random() * 10000)}`,
        date: formattedDate,
        technician: 'Técnico Externo'
      } as MaintenanceType);
      setIsModalOpen(false);
      setNewMaintenance({ status: 'Agendada', criticality: 'Média', type: 'Preventiva', date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Manutenção</h1>
          <p className="text-gray-500 dark:text-gray-400">Histórico e agendamento de intervenções.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-lg border transition-colors ${view === 'history' ? 'bg-primary text-white border-primary btn-animate' : 'bg-white dark:bg-background-dark border-gray-300 dark:border-border-dark text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Histórico
          </button>
          <button
            onClick={() => setView('preventive')}
            className={`px-4 py-2 rounded-lg border transition-colors ${view === 'preventive' ? 'bg-primary text-white border-primary btn-animate' : 'bg-white dark:bg-background-dark border-gray-300 dark:border-border-dark text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Preventivas
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 btn-animate bg-gray-900 dark:bg-white text-white dark:text-background-dark font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span> Agendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark p-4 rounded-xl shadow-sm card-hover">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Críticas Pendentes</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12 <span className="text-sm text-red-500 font-normal">+2%</span></p>
        </div>
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark p-4 rounded-xl shadow-sm card-hover">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Máquinas Paradas</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">5 <span className="text-sm text-red-500 font-normal">+5%</span></p>
        </div>
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark p-4 rounded-xl shadow-sm card-hover">
          <span className="text-gray-500 dark:text-gray-400 text-sm">MTTR Geral</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8.2h <span className="text-sm text-green-500 font-normal">-1.1%</span></p>
        </div>
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark p-4 rounded-xl shadow-sm card-hover">
          <span className="text-gray-500 dark:text-gray-400 text-sm">MTBF Geral</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">45d <span className="text-sm text-green-500 font-normal">+3%</span></p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <h3 className="p-4 border-b border-gray-200 dark:border-border-dark font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5">
          {view === 'history' ? 'Histórico Geral' : 'Preventivas Pendentes'}
        </h3>
        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Máquina</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Criticidade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
              {filteredList.length > 0 ? filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.machine}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.type}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 rounded text-xs font-bold
                      ${item.criticality === 'Alta' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                        item.criticality === 'Média' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                          'bg-blue-500/20 text-blue-600 dark:text-blue-400'}
                    `}>
                      {item.criticality}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'Concluída' ? 'bg-green-500' : item.status === 'Agendada' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                      <span className="text-gray-700 dark:text-white">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status !== 'Concluída' && (
                      <button
                        onClick={() => markMaintenanceCompleted(item.id)}
                        className="p-1.5 bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-md transition-colors btn-animate"
                        title="Marcar como Concluída"
                      >
                        <span className="material-symbols-outlined text-lg">check</span>
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Nenhum registro encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agendar Manutenção">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Máquina</label>
            <select
              required
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newMaintenance.machine || ''}
              onChange={e => setNewMaintenance({ ...newMaintenance, machine: e.target.value })}
            >
              <option value="">Selecione uma máquina</option>
              {machines.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo</label>
            <select
              required
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newMaintenance.type || 'Preventiva'}
              onChange={e => setNewMaintenance({ ...newMaintenance, type: e.target.value as any })}
            >
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              <option value="Preditiva">Preditiva</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Data</label>
            <input
              required
              type="date"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newMaintenance.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Descrição</label>
            <textarea
              required
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newMaintenance.description || ''}
              onChange={e => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="w-full btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors">
            Agendar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Maintenance;