import React, { useState, useEffect } from 'react';
import { ActivityLog } from '../types';
import { fetchDashboardData } from '../services/api';
import { CheckCircle2, PlusCircle, Trophy } from 'lucide-react';

const ActivityTimeline: React.FC = () => {
  const [activity, setActivity] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetchDashboardData().then(data => {
      setActivity(data.activity);
    }).catch(err => console.error(err));
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
        case 'COMPLETE': return <CheckCircle2 size={16} className="text-green-500" />;
        case 'ACHIEVEMENT': return <Trophy size={16} className="text-yellow-500" />;
        case 'ADD': return <PlusCircle size={16} className="text-blue-500" />;
        default: return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Actividad Reciente</h3>
        <div className="space-y-4">
            {activity.map((item, idx) => (
                <div key={item.id} className="flex gap-3 relative">
                    {/* Connector Line */}
                    {idx !== activity.length - 1 && (
                        <div className="absolute left-[7px] top-6 bottom-[-20px] w-px bg-gray-100"></div>
                    )}
                    
                    <div className="mt-0.5 relative z-10 bg-white">
                        {getIcon(item.type)}
                    </div>
                    <div>
                        <p className="text-sm text-gray-700 leading-snug">{item.message}</p>
                        <span className="text-xs text-gray-400">{item.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>
        <button className="w-full mt-4 text-center text-xs text-gray-500 hover:text-indigo-600 py-2 border-t border-gray-50">
            Ver historial completo
        </button>
    </div>
  );
};

export default ActivityTimeline;