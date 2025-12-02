import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Operator } from '../types';

const Operators: React.FC = () => {
  const { getOperators, updateOperatorMachines, machines } = useApp();
  // Operators are derived dynamically from Users list
  const operators = getOperators(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);

  const openAssignModal = (op: Operator) => {
    setSelectedOperator(op);
    setSelectedMachines(op.machines);
    setIsModalOpen(true);
  };

  const handleMachineToggle = (machineId: string) => {
    if (selectedMachines.includes(machineId)) {
      setSelectedMachines(selectedMachines.filter(id => id !== machineId));
    } else {
      setSelectedMachines([...selectedMachines, machineId]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOperator) {
      updateOperatorMachines(selectedOperator.id, selectedMachines);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Operadores</h1>
          <p className="text-gray-500 dark:text-gray-400">Desempenho e alocação da equipe.</p>
        </div>
      </div>

      {operators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operators.map((op) => (
            <div key={op.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 flex flex-col gap-4 shadow-sm card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                    {op.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{op.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{op.shift} • {op.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => openAssignModal(op)}
                  className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg btn-animate"
                  title="Atribuir Máquinas"
                >
                  <span className="material-symbols-outlined">edit_square</span>
                </button>
              </div>
              
              <div className="border-t border-gray-200 dark:border-border-dark pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Eficiência</span>
                  <span className={`font-bold ${op.efficiency >= 90 ? 'text-green-600 dark:text-green-500' : 'text-yellow-600 dark:text-yellow-500'}`}>{op.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-background-dark rounded-full h-2">
                  <div className={`h-2 rounded-full ${op.efficiency >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${op.efficiency}%` }}></div>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase font-bold tracking-wider">Máquinas Atribuídas</p>
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {op.machines.length > 0 ? op.machines.map(mId => {
                    const mName = machines.find(mac => mac.id === mId)?.name || mId;
                    return (
                      <span key={mId} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                        {mName}
                      </span>
                    );
                  }) : (
                    <span className="text-xs text-gray-400 italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">info</span>
                      Nenhuma atribuída
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark card-hover">
          <div className="size-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-gray-400">group_off</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nenhum operador encontrado</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Adicione usuários com o cargo "Operador" na aba Usuários.</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Atribuir Máquinas - ${selectedOperator?.name}`}>
        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Selecione as máquinas que este operador está autorizado a utilizar.</p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {machines.map(machine => (
              <label key={machine.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">
                <input 
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary bg-gray-50 dark:bg-background-dark border-gray-300 dark:border-border-dark"
                  checked={selectedMachines.includes(machine.id)}
                  onChange={() => handleMachineToggle(machine.id)}
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 dark:text-white text-sm font-medium">{machine.name}</span>
                  <span className="text-xs text-gray-500">{machine.id} - {machine.model}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg">
              Salvar Atribuições
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Operators;