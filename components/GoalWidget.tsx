import React from 'react';
import { MOCK_GOAL } from '../constants';
import { ArrowRight, Map } from 'lucide-react';

const GoalWidget: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Progreso del Objetivo</h3>
        <button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center gap-1">
          Ver plan <ArrowRight size={12} />
        </button>
      </div>

      {/* Progress Bar Section */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{MOCK_GOAL.progressPercent}% Completado</span>
          <span className="text-gray-500">{MOCK_GOAL.completedNodes}/{MOCK_GOAL.totalNodes} Nodos</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${MOCK_GOAL.progressPercent}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-gray-500">Te quedan 73 días</span>
          <span className="text-green-600 font-medium">Ligeramente por delante</span>
        </div>
      </div>

      {/* Mini Map Visualization */}
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute top-2 left-2 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Map size={12} /> Mini Mapa
        </div>
        
        {/* Simple SVG Tree Representation */}
        <svg viewBox="0 0 200 150" className="w-full h-full max-w-[200px]">
          {/* Connecting Lines */}
          <line x1="100" y1="20" x2="60" y2="60" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="100" y1="20" x2="140" y2="60" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="60" x2="40" y2="110" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="60" x2="80" y2="110" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="140" y1="60" x2="140" y2="110" stroke="#cbd5e1" strokeWidth="2" />

          {/* Root Node (Completed) */}
          <circle cx="100" cy="20" r="8" fill="#10b981" className="cursor-pointer hover:stroke-2 hover:stroke-green-300" />
          
          {/* Level 1 Nodes */}
          <circle cx="60" cy="60" r="8" fill="#10b981" className="cursor-pointer" /> {/* Completed */}
          <circle cx="140" cy="60" r="10" fill="#f59e0b" stroke="#fef3c7" strokeWidth="3" className="cursor-pointer animate-pulse" /> {/* In Progress (Current) */}

          {/* Level 2 Nodes */}
          <circle cx="40" cy="110" r="6" fill="#10b981" opacity="0.6" />
          <circle cx="80" cy="110" r="6" fill="#cbd5e1" /> {/* Locked */}
          
          <circle cx="140" cy="110" r="8" fill="#3b82f6" className="cursor-pointer" /> {/* Next */}
          
          {/* Labels */}
          <text x="140" y="85" fontSize="8" textAnchor="middle" fill="#4b5563" fontWeight="bold">JS DOM</text>
          <text x="140" y="130" fontSize="8" textAnchor="middle" fill="#3b82f6">React Intro</text>
        </svg>

        <div className="absolute bottom-2 right-2 flex flex-col gap-1">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-gray-500">Listo</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] text-gray-500">En curso</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] text-gray-500">Siguiente</span></div>
        </div>
      </div>
    </div>
  );
};

export default GoalWidget;