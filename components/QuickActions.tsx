import React, { useState } from 'react';
import { Map, Calendar, Search, BookPlus, Users, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getAiSuggestion, AiSuggestion } from '../services/geminiService';

const QuickActions: React.FC = () => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [suggestion, setSuggestion] = useState<AiSuggestion | null>(null);

  const handleGetSuggestion = async () => {
    setLoadingAi(true);
    setSuggestion(null);
    try {
        const result = await getAiSuggestion();
        setSuggestion(result);
    } finally {
        setLoadingAi(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Acciones Rápidas</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-indigo-100 transition-colors group">
                <Map className="text-gray-400 group-hover:text-indigo-500 mb-2" size={20} />
                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-700">Mapa</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-indigo-100 transition-colors group">
                <Calendar className="text-gray-400 group-hover:text-indigo-500 mb-2" size={20} />
                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-700">Plan</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-indigo-100 transition-colors group">
                <BookPlus className="text-gray-400 group-hover:text-indigo-500 mb-2" size={20} />
                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-700">Recurso</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-indigo-100 transition-colors group">
                <Users className="text-gray-400 group-hover:text-indigo-500 mb-2" size={20} />
                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-700">Gremio</span>
            </button>
        </div>

        {/* AI Action */}
        <div className="mt-auto">
             {!suggestion ? (
                <button 
                    onClick={handleGetSuggestion}
                    disabled={loadingAi}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white p-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                    {loadingAi ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <Sparkles size={18} className="text-yellow-200" />
                    )}
                    <div className="text-left">
                        <div className="text-xs font-normal text-violet-100">¿Bloqueado?</div>
                        <div className="text-sm font-bold">Dame una sugerencia</div>
                    </div>
                </button>
             ) : (
                 <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 animate-fade-in">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-violet-500 uppercase flex items-center gap-1">
                            <Sparkles size={10} /> IA Sugiere
                        </span>
                        <button onClick={() => setSuggestion(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                     </div>
                     <h4 className="text-sm font-bold text-gray-900 mb-1">{suggestion.title}</h4>
                     <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                     <button className="w-full bg-white hover:bg-gray-50 text-violet-700 text-xs font-medium py-1.5 rounded border border-violet-200 flex items-center justify-center gap-1">
                        Hacerlo ahora <ArrowRight size={12} />
                     </button>
                 </div>
             )}
        </div>
    </div>
  );
};

export default QuickActions;