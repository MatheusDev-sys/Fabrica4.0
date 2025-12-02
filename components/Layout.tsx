
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useApp();

  // Mock Notifications
  const notifications = [
    { id: 1, text: "Manutenção preventiva na CNC-01 agendada para amanhã.", time: "Há 1 hora", read: false },
    { id: 2, text: "Ocorrência #7451: Vazamento de óleo detectado.", time: "Há 3 horas", read: false },
    { id: 3, text: "Nova ordem de produção OP-10535 criada.", time: "Há 5 horas", read: true },
  ];

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/machines', icon: 'precision_manufacturing', label: 'Máquinas' },
    { path: '/orders', icon: 'list_alt', label: 'Ordens de Produção' },
    { path: '/parts', icon: 'inventory_2', label: 'Catálogo de Peças' },
    { path: '/operators', icon: 'groups', label: 'Operadores' },
    { path: '/maintenance', icon: 'build', label: 'Manutenção' },
    { path: '/occurrences', icon: 'warning', label: 'Ocorrências' },
    { path: '/reports', icon: 'analytics', label: 'Relatórios' },
    { path: '/users', icon: 'manage_accounts', label: 'Usuários' },
    { path: '/settings', icon: 'settings', label: 'Configurações' },
  ];

  const getPageTitle = () => {
    const current = menuItems.find(item => item.path === location.pathname);
    if (current) return current.label;
    if (location.pathname.includes('/machine/')) return 'Detalhes da Máquina';
    if (location.pathname.includes('/order/')) return 'Detalhes da Ordem';
    if (location.pathname.includes('/notifications')) return 'Notificações';
    return 'Precisium';
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-white overflow-hidden font-sans transition-colors duration-200">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-30 h-full bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        <div className="flex items-center gap-3 p-4 h-16 border-b border-gray-200 dark:border-border-dark/50">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
          </div>
          <div className={`flex flex-col overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
            <h1 className="font-bold text-lg font-display tracking-tight text-gray-900 dark:text-white">Precisium</h1>
            <span className="text-xs text-gray-500 dark:text-gray-400">Factory Control</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative
                  ${isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}
                `}
                title={!isSidebarOpen ? item.label : ''}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill-current' : ''}`}>
                  {item.icon}
                </span>
                <span className={`whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                  {item.label}
                </span>
                {/* Tooltip for collapsed desktop */}
                {!isSidebarOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-border-dark/50 flex flex-col gap-1">
          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className={`whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
              Sair
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Header - Increased Z-Index to stay above dashboard charts */}
        <header className="h-16 border-b border-gray-200 dark:border-border-dark bg-white/80 dark:bg-surface-dark/95 backdrop-blur flex items-center justify-between px-4 lg:px-8 z-50 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Contextual Back Button */}
            {location.pathname.split('/').length > 2 && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span className="hidden sm:inline">Voltar</span>
              </button>
            )}

            <h2 className="text-xl font-bold font-display hidden sm:block text-gray-900 dark:text-white">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 relative text-gray-600 dark:text-gray-400"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Notification Dropdown with VERY High Z-Index to overlap everything */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl shadow-2xl z-[100] overflow-hidden animate-fade-in">
                    <div className="p-3 border-b border-gray-200 dark:border-border-dark flex justify-between items-center">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">Notificações</h3>
                      <button className="text-xs text-primary hover:underline">Marcar como lidas</button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-3 border-b border-gray-100 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-t border-gray-200 dark:border-border-dark">
                      <button onClick={() => { navigate('/notifications'); setShowNotifications(false); }} className="text-xs font-medium text-primary hover:underline">Ver todas</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
              </div>
              <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth bg-gray-50 dark:bg-background-dark relative z-0">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] pb-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;