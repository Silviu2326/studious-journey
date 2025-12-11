
import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, Swords, BookOpen, BrainCircuit } from 'lucide-react';
import { MOCK_MISSIONS } from '../constants';
import { Mission, PageView } from '../types';

interface DailyMissionsProps {
  onNavigate?: (page: PageView) => void;
}

const DailyMissions: React.FC<DailyMissionsProps> = ({ onNavigate }) => {
  const [timeAvailable, setTimeAvailable] = useState<number>(60);
  
  // Calculate total estimated time
  const totalTime = MOCK_MISSIONS.reduce((acc, curr) => acc + curr.durationMin, 0);

  const getIcon = (type: Mission['type']) => {
    switch (type) {
      case 'BOSS': return <Swords className="text-red-500" size={20} />;
      case 'REVIEW': return <BrainCircuit className="text-amber-500" size={20} />;
      default: return <BookOpen className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: Mission['type']) => {
     switch (type) {
      case 'BOSS': return 'bg-red-50 border-red-100';
      case 'REVIEW': return 'bg-amber-50 border-amber-100';
      default: return 'bg-white border-gray-100';
    }
  };

  const handleStart = (mission: Mission) => {
    if (!onNavigate) return;
    
    if (mission.type === 'REVIEW') {
      onNavigate('REVIEW');
    } else {
      // For LEARN, PROJECT, BOSS -> Go to Dojo (ideally specific node, but defaulting to general Dojo view for now)
      onNavigate('DOJO');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Misión del día</h2>
        
        {/* Time Selector */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 hidden sm:inline">Hoy tengo:</span>
          <select 
            value={timeAvailable} 
            onChange={(e) => setTimeAvailable(Number(e.target.value))}
            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5"
          >
            <option value="30">30 min</option>
            <option value="60">1 hora</option>
            <option value="120">2 horas</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_MISSIONS.map((mission) => (
          <div key={mission.id} className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${getBgColor(mission.type)}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm">
                  {getIcon(mission.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                     <h3 className="font-semibold text-gray-900">{mission.title}</h3>
                     {mission.topic && (
                       <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                         {mission.topic}
                       </span>
                     )}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {mission.durationMin} min
                    </span>
                    <span className="text-indigo-600 font-medium bg-indigo-50 px-1.5 rounded">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  {/* Subtasks */}
                  {mission.subTasks && (
                    <div className="mt-3 space-y-1.5">
                      {mission.subTasks.map(sub => (
                        <div key={sub.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className={`w-3 h-3 rounded-full border ${sub.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                          <span>{sub.title} <span className="text-gray-400 text-xs">({sub.durationMin}m)</span></span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                 <button 
                    onClick={() => handleStart(mission)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-colors"
                 >
                    <Play size={16} fill="currentColor" /> Empezar
                 </button>
                 {mission.type === 'LEARN' && (
                   <button className="text-gray-400 hover:text-green-600 text-xs flex items-center justify-end gap-1">
                     <CheckCircle2 size={14} /> Ya lo sé
                   </button>
                 )}
              </div>
            </div>
            
            {/* Boss Fight Warning */}
            {mission.type === 'BOSS' && (
              <div className="absolute top-0 right-0 p-1">
                <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">BOSS FIGHT</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Tiempo total estimado: <span className="font-medium text-gray-900">~{totalTime} min</span></span>
        {totalTime > timeAvailable && (
             <span className="text-amber-600 text-xs">⚠️ Supera tu tiempo disponible</span>
        )}
      </div>
    </div>
  );
};

export default DailyMissions;
