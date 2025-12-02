import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme, factoryData, updateFactoryData } = useApp();
  const [formData, setFormData] = useState(factoryData);

  useEffect(() => {
    setFormData(factoryData);
  }, [factoryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateFactoryData(formData);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black font-display text-gray-900 dark:text-white">Configurações do Sistema</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Ajuste as preferências de visualização, parâmetros e dados da sua unidade.</p>
      </div>

      <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white px-6 py-4 border-b border-gray-200 dark:border-border-dark">Aparência</h2>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-gray-200 dark:bg-gray-700/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 dark:text-white">dark_mode</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">Tema do Sistema</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-background-dark p-1 rounded-lg border border-gray-300 dark:border-border-dark">
              <button 
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-3 py-1 text-sm rounded-md transition-all ${theme === 'light' ? 'bg-white shadow text-primary font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Claro
              </button>
              <button 
                onClick={() => theme === 'light' && toggleTheme()}
                className={`px-3 py-1 text-sm rounded-md transition-all ${theme === 'dark' ? 'bg-primary text-white shadow font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Escuro
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm card-hover">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white px-6 py-4 border-b border-gray-200 dark:border-border-dark">Dados da Fábrica</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Nome da Fábrica</label>
            <input 
              name="name"
              type="text" 
              value={formData.name} 
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">CNPJ</label>
            <input 
              name="cnpj"
              type="text" 
              value={formData.cnpj} 
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Código da Unidade</label>
            <input 
              name="code"
              type="text" 
              value={formData.code} 
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Endereço</label>
            <input 
              name="address"
              type="text" 
              value={formData.address} 
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-border-dark">
        <button 
          onClick={() => setFormData(factoryData)}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-2 btn-animate bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default Settings;