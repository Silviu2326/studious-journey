import React from 'react';
import { Layers, RotateCw, AlertTriangle } from 'lucide-react';

const ReviewPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <RotateCw className="text-emerald-400" size={20} />
                <h3 className="font-bold text-lg">Mantenimiento</h3>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Hoy tienes <span className="font-bold text-white">42 tarjetas</span> para repasar. 
                Si no lo haces, 3 nodos entrarán en <span className="text-red-400 font-medium">decadencia</span> mañana.
            </p>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg border border-white/10 min-w-[70px]">
                    <span className="text-2xl font-bold text-red-400">12</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Vencidas</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg border border-white/10 min-w-[70px]">
                    <span className="text-2xl font-bold text-amber-400">30</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Para Hoy</span>
                </div>
                <div className="flex flex-col items-center p-2 min-w-[70px]">
                    <span className="text-2xl font-bold text-slate-600">85</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-600">Futuras</span>
                </div>
            </div>

            <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-900/20">
                    <Layers size={16} /> Sesión Completa (20m)
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors text-xs">
                    Sesión Rápida (5m)
                </button>
            </div>

            {/* Oxidization Warning */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-medium mb-2">
                    <AlertTriangle size={12} /> Riesgo de oxidación:
                </div>
                <ul className="text-xs text-slate-400 space-y-1">
                    <li>• JavaScript Básico <span className="text-slate-600">(hace 15 días)</span></li>
                    <li>• Inglés B1 - Phrasal Verbs <span className="text-slate-600">(hace 10 días)</span></li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default ReviewPanel;