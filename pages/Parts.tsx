import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Part } from '../types';

const Parts: React.FC = () => {
  const { parts, addPart, updatePart, deletePart } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPart, setCurrentPart] = useState<Partial<Part>>({});

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPart.code && currentPart.name && currentPart.material && currentPart.stock !== undefined) {
      if (isEdit) {
        updatePart(currentPart as Part);
      } else {
        addPart(currentPart as Part);
      }
      setIsModalOpen(false);
      setCurrentPart({});
      setIsEdit(false);
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setCurrentPart({});
    setIsModalOpen(true);
  };

  const openEditModal = (part: Part) => {
    setIsEdit(true);
    setCurrentPart({ ...part });
    setIsModalOpen(true);
  };

  const handleDelete = (code: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta peça?')) {
      deletePart(code);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Catálogo de Peças</h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie o inventário de peças e materiais.</p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-animate bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar Peça
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Código</th>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4 text-center">Estoque</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
              {parts.map((part) => (
                <tr key={part.code} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary font-medium">{part.code}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{part.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{part.material}</td>
                  <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">{part.stock.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(part)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white btn-animate"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(part.code)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 btn-animate"
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEdit ? "Editar Peça" : "Adicionar Nova Peça"}>
        <form onSubmit={handleAddPart} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Código</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: PFC-003"
              value={currentPart.code || ''}
              onChange={e => setCurrentPart({ ...currentPart, code: e.target.value })}
              disabled={isEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nome</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Chapa de Aço"
              value={currentPart.name || ''}
              onChange={e => setCurrentPart({ ...currentPart, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Material</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Aço 1020"
              value={currentPart.material || ''}
              onChange={e => setCurrentPart({ ...currentPart, material: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estoque</label>
            <input
              required
              type="number"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={currentPart.stock || ''}
              onChange={e => setCurrentPart({ ...currentPart, stock: Number(e.target.value) })}
            />
          </div>
          <button type="submit" className="w-full btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors">
            {isEdit ? "Salvar Alterações" : "Adicionar"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Parts;