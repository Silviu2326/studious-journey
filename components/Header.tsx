import React, { useState } from 'react';
import { Bell, Flame, LayoutList, Trophy, User } from 'lucide-react';
import { MOCK_NOTIFICATIONS, MOCK_USER, MOCK_GOAL } from '../constants';

const Header: React.FC = () => {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Left: Greeting & Active Goal */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>👋</span> Buenas, {MOCK_USER.name}
            </h1>
            <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium border border-blue-100">
                {MOCK_GOAL.title}
              </span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-gray-500">Fin: {MOCK_GOAL.targetDate}</span>
            </div>
          </div>

          {/* Right: Quick KPIs */}
          <div className="flex items-center justify-between md:justify-end gap-6">
            
            {/* Level / XP */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Trophy size={16} className="text-yellow-500" />
                <span>Nivel {MOCK_USER.level}</span>
              </div>
              <span className="text-xs text-gray-500">{MOCK_USER.currentXp.toLocaleString()} XP</span>
            </div>

            {/* Streak */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Flame size={16} className="text-orange-500 fill-orange-500" />
                <span>{MOCK_USER.streakDays} días</span>
              </div>
              <span className="text-xs text-orange-600 font-medium">¡En racha!</span>
            </div>

            {/* Today's Tasks Count */}
            <div className="flex flex-col items-end hidden sm:flex">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <LayoutList size={16} className="text-indigo-500" />
                <span>3 misiones</span>
              </div>
              <span className="text-xs text-gray-500">Pendientes</span>
            </div>

            {/* Notifications */}
            <div className="relative border-l border-gray-200 pl-6 ml-2">
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              >
                <Bell size={20} />
                {MOCK_NOTIFICATIONS.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>
              
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                  </div>
                  {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800">{notif.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
               {MOCK_USER.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;