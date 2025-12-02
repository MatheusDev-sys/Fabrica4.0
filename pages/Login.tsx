import React, { useState } from 'react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network delay for animation effect
    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        onLogin(true);
      } else {
        setError('Usuário ou senha incorretos.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-display">
      {/* Background Image with Zoom Animation */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo5BgiimNUMgqEh6wF-B1jGp2B89nJ5POy6oKeatWeRf1Aa1_vnuBkdvwwSX84Y8dw2Na_TIumnvM4u4-0UaSLuI6J7yCkQVQGc8eBb-Vg77afepjH-s01gXgw0tKk3prQwzzPAtGo3fsSCjLwOb1c5PU_5VwD2QXg_4YwEEYASXyIEb9zQWj1vJS7RTiEeTnm9BX8c-wYMpsWg7S7yoNsyKWc9CJjtjZZW42Ectx3KQ1_jfiyakDz_Y4wzZfUqiHFyQmcRAdAFb4')" 
        }}
      ></div>
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background-dark/95 via-background-dark/80 to-primary/20 backdrop-blur-[2px]"></div>

      {/* Login Card with Glassmorphism and Slide Up Animation */}
      <div className="relative z-10 w-full max-w-[420px] p-6 animate-slide-up">
        <div className="glass-panel rounded-2xl p-10 shadow-2xl border-t border-white/20">
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Animated Logo */}
            <div className="size-20 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-0.5 shadow-[0_0_30px_rgba(10,133,255,0.5)] animate-float">
               <div className="w-full h-full bg-surface-dark rounded-full flex items-center justify-center back">
                 <span className="material-symbols-outlined text-4xl text-primary">precision_manufacturing</span>
               </div>
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-4xl font-black text-white tracking-tight">Fábrica 4.0</h1>
              <p className="text-gray-400 font-medium tracking-wide">Precisium Factory Control</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 input-group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider transition-colors">Usuário</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 input-icon transition-colors duration-300">person</span>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background-dark/50 border border-gray-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 group-hover:border-gray-500"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            <div className="space-y-2 input-group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider transition-colors">Senha</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 input-icon transition-colors duration-300">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-dark/50 border border-gray-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 group-hover:border-gray-500"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200 text-sm animate-fade-in">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-animate bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  Entrando...
                </>
              ) : (
                'Acessar Sistema'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500">Desenvolvido com tecnologia de ponta pela Precisium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;