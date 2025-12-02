import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Occurrence } from '../types';

const Occurrences: React.FC = () => {
  const { occurrences, addOccurrence, resolveOccurrence, machines } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOccurrence, setNewOccurrence] = useState<Partial<Occurrence>>({
    status: 'Aberta',
    priority: 'Média',
    date: new Date().toLocaleString('pt-BR')
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOccurrence.title && newOccurrence.machine && newOccurrence.description) {
      addOccurrence({
        ...newOccurrence,
        id: `#${Math.floor(Math.random() * 10000)}`,
        date: new Date().toLocaleString('pt-BR')
      } as Occurrence);
      setIsModalOpen(false);
      setNewOccurrence({ status: 'Aberta', priority: 'Média', date: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Ocorrências</h1>
          <p className="text-gray-500 dark:text-gray-400">Registro de incidentes e paradas não planejadas.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors btn-animate"
        >
          <span className="material-symbols-outlined">warning</span>
          Nova Ocorrência
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        {occurrences.length > 0 ? (
          <div className="overflow-x-auto table-responsive">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Título</th>
                  <th className="px-6 py-4">Máquina</th>
                  <th className="px-6 py-4">Data/Hora</th>
                  <th className="px-6 py-4">Prioridade</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                {occurrences.map((occ) => (
                  <tr key={occ.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400">{occ.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{occ.title}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{occ.machine}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{occ.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${occ.priority === 'Alta' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                          occ.priority === 'Média' ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400' :
                            'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        }`}>
                        {occ.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${occ.status === 'Resolvida' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-200'}`}>
                        {occ.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {occ.status !== 'Resolvida' && (
                        <button
                          onClick={() => resolveOccurrence(occ.id)}
                          className="p-1.5 bg-green-500/10 text-green-600 hover:bg-green-500/20 rounded-md transition-colors btn-animate"
                          title="Marcar como Resolvida"
                        >
                          <span className="material-symbols-outlined text-lg">check</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-100 dark:bg-background-dark p-6 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-600">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nenhuma ocorrência em aberto</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-2">O sistema está operando normalmente. Novas ocorrências registradas aparecerão aqui.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nova Ocorrência">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Título do Incidente</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Vazamento de óleo"
              value={newOccurrence.title || ''}
              onChange={e => setNewOccurrence({ ...newOccurrence, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Máquina Afetada</label>
            <select
              required
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newOccurrence.machine || ''}
              onChange={e => setNewOccurrence({ ...newOccurrence, machine: e.target.value })}
            >
              <option value="">Selecione a máquina</option>
              {machines.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Prioridade</label>
            <select
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newOccurrence.priority}
              onChange={e => setNewOccurrence({ ...newOccurrence, priority: e.target.value as any })}
            >
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Descrição Detalhada</label>
            <textarea
              required
              rows={3}
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Descreva o que aconteceu..."
              value={newOccurrence.description || ''}
              onChange={e => setNewOccurrence({ ...newOccurrence, description: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors btn-animate">
            Registrar Ocorrência
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Occurrences;