import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Machine } from '../types';

const Machines: React.FC = () => {
  const { machines, addMachine } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMachine, setNewMachine] = useState<Partial<Machine>>({
    status: 'Operando',
    hours: 0,
    lastMaintenance: new Date().toLocaleDateString('pt-BR')
  });

  const filteredMachines = machines.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.model.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operando': return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
      case 'Parada': return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30';
      case 'Manutenção': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default: return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
    }
  };

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMachine.name && newMachine.model && newMachine.id) {
      addMachine(newMachine as Machine);
      setIsModalOpen(false);
      setNewMachine({ status: 'Operando', hours: 0, lastMaintenance: new Date().toLocaleDateString('pt-BR') });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Lista de CNCs da Fábrica</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitore e gerencie todas as máquinas CNC em tempo real.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-animate bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 w-fit transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar Máquina
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="p-4 border-b border-gray-200 dark:border-border-dark flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Buscar por nome ou modelo..."
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Nome da Máquina</th>
                <th className="px-6 py-4">Modelo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Horas Trabalhadas</th>
                <th className="px-6 py-4">Última Manutenção</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
              {filteredMachines.map((machine) => (
                <tr key={machine.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{machine.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{machine.model}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(machine.status)} flex items-center gap-1.5 w-fit`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(machine.status).split(' ')[1].replace('text-', 'bg-').replace('dark:', '')}`}></span>
                      {machine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{machine.hours.toLocaleString()} h</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{machine.lastMaintenance}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/machine/${machine.id}`)}
                      className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 justify-end ml-auto btn-animate px-2 py-1 rounded"
                    >
                      Detalhes <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Nova Máquina">
        <form onSubmit={handleAddMachine} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">ID da Máquina</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: CNC-006"
              value={newMachine.id || ''}
              onChange={e => setNewMachine({ ...newMachine, id: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Nome</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Torno CNC-A03"
              value={newMachine.name || ''}
              onChange={e => setNewMachine({ ...newMachine, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Modelo</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Siemens 840D"
              value={newMachine.model || ''}
              onChange={e => setNewMachine({ ...newMachine, model: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Status</label>
            <select
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newMachine.status}
              onChange={e => setNewMachine({ ...newMachine, status: e.target.value as any })}
            >
              <option value="Operando">Operando</option>
              <option value="Parada">Parada</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Ociosa">Ociosa</option>
            </select>
          </div>
          <button type="submit" className="w-full btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors">
            Adicionar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Machines;