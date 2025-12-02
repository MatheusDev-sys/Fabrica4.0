import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { User } from '../types';

const Users: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({ role: 'Operador' });

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser.name && currentUser.email) {
      if (isEdit && currentUser.id) {
        updateUser(currentUser as User);
      } else {
        addUser({ ...currentUser, id: Date.now().toString() } as User);
      }
      setIsModalOpen(false);
      setCurrentUser({ role: 'Operador' });
      setIsEdit(false);
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setCurrentUser({ role: 'Operador' });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setIsEdit(true);
    setCurrentUser({ ...user });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Gerenciamento de Usuários</h1>
        <button
          onClick={openAddModal}
          className="btn-animate bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar Usuário
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Papel</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                      user.role === 'Técnico' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                        user.role === 'Inativo' ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                          'bg-green-500/20 text-green-600 dark:text-green-400'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-all btn-animate"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-all btn-animate"
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEdit ? "Editar Usuário" : "Novo Usuário"}>
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Nome</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={currentUser.name || ''}
              onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={currentUser.email || ''}
              onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Função</label>
            <select
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={currentUser.role}
              onChange={e => setCurrentUser({ ...currentUser, role: e.target.value as any })}
            >
              <option value="Operador">Operador</option>
              <option value="Técnico">Técnico</option>
              <option value="Admin">Admin</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <button type="submit" className="w-full btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg">
            {isEdit ? "Salvar Alterações" : "Adicionar"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Users;