import React, { useState, useEffect } from 'react';
import { UserStats } from '../types';
import { fetchDashboardData } from '../services/api';
import { Flame, Gem, Zap } from 'lucide-react';

const GamificationPanel: React.FC = () => {
  const [user, setUser] = useState<UserStats | null>(null);
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const activeDays = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; // Simulated active days

  useEffect(() => {
    fetchDashboardData().then(data => {
      setUser(data.user);
    }).catch(err => console.error(err));
  }, []);

  if (!user) return <div className="p-4">Cargando...</div>;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Tu Progreso</h3>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">Nvl {user.level}</span>
        </div>
        
        {/* Streak Info */}
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <Flame className="text-orange-500 fill-orange-500" size={24} />
                <span className="text-2xl font-black text-gray-900">{user.streakDays}</span>
                <span className="text-sm text-gray-500 font-medium pt-1">días seguidos 🔥</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
                Estás a <span className="font-bold text-indigo-600">3 días</span> de batir tu récord.
            </p>
            
            {/* Calendar Viz */}
            <div className="flex justify-between items-center gap-1">
                {days.map(d => (
                    <div 
                        key={d} 
                        className={`h-8 w-full rounded-md flex items-center justify-center text-[10px] font-bold transition-all
                            ${activeDays.includes(d) 
                                ? 'bg-green-500 text-white shadow-sm scale-100' 
                                : 'bg-gray-100 text-gray-300 scale-90'}`}
                    >
                        {d === 12 ? 'Hoy' : ''}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
         <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Zap size={12} /> XP Total
            </span>
            <span className="text-lg font-bold text-gray-800">{user.currentXp}</span>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1">
                 <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5">82% para Nvl {user.level + 1}</span>
         </div>
         
         <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Gem size={12} /> Gemas
            </span>
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-500">{user.gems}</span>
                <button className="text-[10px] text-indigo-600 hover:underline">Ir a Tienda</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GamificationPanel;