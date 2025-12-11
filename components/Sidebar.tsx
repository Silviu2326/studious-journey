
import React from 'react';
import { LayoutDashboard, Map, Users, Settings, LogOut, Hexagon, CalendarDays, BookCopy, RotateCw } from 'lucide-react';
import { PageView } from '../types';

interface SidebarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'SKILL_TREE', icon: Map, label: 'Mapa de Habilidades' },
    { id: 'PLANNER', icon: CalendarDays, label: 'Planificador' },
    { id: 'DOJO', icon: BookCopy, label: 'Dojo' }, // Keeping Dojo accessible if needed, though usually accessed via map
    { id: 'LIBRARY', icon: BookCopy, label: 'Biblioteca' },
    { id: 'REVIEW', icon: RotateCw, label: 'Repaso' },
    { id: 'COMMUNITY', icon: Users, label: 'Gremio' },
    { id: 'SETTINGS', icon: Settings, label: 'Ajustes' },
  ];

  // Filter out DOJO from direct sidebar nav as it's context-dependent usually, but kept in types.
  // Actually, let's keep the main persistent nav items.
  const displayNavItems = navItems.filter(item => item.id !== 'DOJO');

  return (
    <div className="w-20 lg:w-64 bg-slate-900 h-screen flex flex-col justify-between border-r border-slate-800 fixed left-0 top-0 z-50 transition-all duration-300">
      
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/30">
            <Hexagon className="text-white fill-white" size={24} />
        </div>
        <span className="text-xl font-bold text-white tracking-tight hidden lg:block">DevPath</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {displayNavItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageView)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <item.icon size={22} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className={`font-medium hidden lg:block ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300 hidden lg:block shadow-[0_0_8px_rgba(165,180,252,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors">
            <LogOut size={20} />
            <span className="font-medium hidden lg:block">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
