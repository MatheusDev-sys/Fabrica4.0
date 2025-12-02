import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import { Order } from '../types';

const OrderList: React.FC = () => {
  const { orders, addOrder, machines } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    progress: 0,
    status: 'Pendente',
    operator: 'Não atribuído'
  });

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrder.id && newOrder.part && newOrder.quantity && newOrder.machine) {
      addOrder(newOrder as Order);
      setIsModalOpen(false);
      setNewOrder({ progress: 0, status: 'Pendente', operator: 'Não atribuído' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Ordens de Produção</h1>
          <p className="text-gray-500 dark:text-gray-400">Acompanhe e gerencie as ordens em tempo real.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-animate bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Nova Ordem
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-background-dark text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Peça</th>
                <th className="px-6 py-4 text-center">Qtd</th>
                <th className="px-6 py-4">Operador</th>
                <th className="px-6 py-4">Máquina</th>
                <th className="px-6 py-4">Progresso</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary font-medium">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.part}</td>
                  <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">{order.quantity}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.operator}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{order.machine}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${order.progress === 100 ? 'bg-green-500' :
                              order.status === 'Cancelado' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Concluída' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                        order.status === 'Cancelado' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                          order.status === 'Pendente' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                            'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'}
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Concluída' ? 'bg-green-500' :
                          order.status === 'Cancelado' ? 'bg-red-500' :
                            order.status === 'Pendente' ? 'bg-blue-500' :
                              'bg-yellow-500'
                        }`}></span>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Ordem de Produção">
        <form onSubmit={handleAddOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">ID da Ordem</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: OP-20001"
              value={newOrder.id || ''}
              onChange={e => setNewOrder({ ...newOrder, id: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Peça</label>
            <input
              required
              type="text"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Parafuso M4"
              value={newOrder.part || ''}
              onChange={e => setNewOrder({ ...newOrder, part: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Quantidade</label>
            <input
              required
              type="number"
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newOrder.quantity || ''}
              onChange={e => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Máquina</label>
            <select
              required
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={newOrder.machine || ''}
              onChange={e => setNewOrder({ ...newOrder, machine: e.target.value })}
            >
              <option value="">Selecione uma máquina</option>
              {machines.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full btn-animate bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-colors">
            Criar Ordem
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default OrderList;