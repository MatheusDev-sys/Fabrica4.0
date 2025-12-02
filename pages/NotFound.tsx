import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">construction</span>
      <h1 className="text-2xl font-bold text-white mb-2">Página em Construção</h1>
      <p className="text-gray-400">Esta funcionalidade estará disponível em breve na versão completa.</p>
    </div>
  );
};

export default NotFound;
