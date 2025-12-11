
import React, { useState } from 'react';
import { 
  ArrowLeft, BrainCircuit, Check, X, RotateCw, Layers, Zap, 
  BarChart3, CheckCircle2, AlertTriangle, Target 
} from 'lucide-react';
import { PageView, Flashcard } from '../types';
import { MOCK_SKILL_NODES } from '../constants';

interface ReviewPageProps {
  onNavigate: (page: PageView) => void;
}

// Mock Flashcards Data
const MOCK_FLASHCARDS: Flashcard[] = [
    { id: 'f1', front: '¿Qué etiqueta HTML se usa para enlaces?', back: '<a> (anchor tag)', nodeId: 'html-basics', nodeTitle: 'HTML Básico', difficulty: 'EASY', nextReview: '2024-03-20', type: 'TEXT' },
    { id: 'f2', front: '¿Cuál es la diferencia entre ID y Class?', back: 'ID es único por página, Class puede usarse en múltiples elementos.', nodeId: 'css-basics', nodeTitle: 'CSS Fundamentos', difficulty: 'MEDIUM', nextReview: '2024-03-20', type: 'TEXT' },
    { id: 'f3', front: '<code>const x = 10; x = 20;</code>\n¿Qué pasa aquí?', back: 'Error. No se puede reasignar una constante.', nodeId: 'js-syntax', nodeTitle: 'JS Sintaxis', difficulty: 'HARD', nextReview: '2024-03-20', type: 'CODE' },
];

type ReviewMode = 'DASHBOARD' | 'SESSION' | 'SUMMARY';

const ReviewPage: React.FC<ReviewPageProps> = ({ onNavigate }) => {
  const [mode, setMode] = useState<ReviewMode>('DASHBOARD');
  const [sessionCards, setSessionCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, xpGained: 0, streakSaved: false });

  // --- ACTIONS ---

  const startSession = (filter: 'ALL' | 'URGENT' | 'NODE') => {
    // In a real app, filter MOCK_FLASHCARDS based on selection
    setSessionCards([...MOCK_FLASHCARDS]); // Mocking 3 cards for demo
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, xpGained: 0, streakSaved: false });
    setMode('SESSION');
  };

  const handleRating = (rating: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
    // FSRS Logic would go here (sending to backend)
    const isLast = currentCardIndex === sessionCards.length - 1;
    
    // Update local stats
    if (rating === 'GOOD' || rating === 'EASY') {
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, xpGained: prev.xpGained + 10 }));
    } else {
        setSessionStats(prev => ({ ...prev, xpGained: prev.xpGained + 2 }));
    }

    if (isLast) {
      setMode('SUMMARY');
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  // --- RENDERERS ---

  const renderDashboard = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
       {/* Header Stats */}
       <div className="flex items-center gap-4 mb-8">
          <button onClick={() => onNavigate('DASHBOARD')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
             <ArrowLeft size={24} />
          </button>
          <div>
             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                Centro de Mantenimiento <BrainCircuit className="text-indigo-500" />
             </h1>
             <p className="text-gray-500">Repasa para evitar la decadencia de tus nodos.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
             <span className="text-4xl font-black text-indigo-600 mb-1">42</span>
             <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tarjetas para hoy</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
             <span className="text-4xl font-black text-red-500 mb-1">18</span>
             <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Atrasadas</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
             <span className="text-4xl font-black text-amber-500 mb-1">~12m</span>
             <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tiempo estimado</span>
          </div>
       </div>

       {/* Selection Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => startSession('ALL')}
            className="group bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1"
          >
             <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-3 rounded-xl"><RotateCw size={24} className="text-white"/></div>
                <span className="bg-indigo-500 text-xs font-bold px-2 py-1 rounded border border-indigo-400">RECOMENDADO</span>
             </div>
             <h3 className="text-xl font-bold mb-2">Repaso Inteligente</h3>
             <p className="text-indigo-100 text-sm mb-6">
                Mezcla optimizada de lo urgente y lo importante. Enfocado en mantener tu racha.
             </p>
             <div className="flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-lg">
                <Zap size={14} className="text-yellow-300" /> +80 XP Potenciales
             </div>
          </div>

          <div className="space-y-4">
             <div 
                onClick={() => startSession('URGENT')}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-4"
             >
                <div className="bg-red-50 p-3 rounded-xl text-red-500"><AlertTriangle size={24}/></div>
                <div>
                   <h4 className="font-bold text-gray-900">Solo Urgentes</h4>
                   <p className="text-xs text-gray-500">Rescata 3 nodos de la oxidación</p>
                </div>
             </div>

             <div 
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-4"
             >
                <div className="bg-blue-50 p-3 rounded-xl text-blue-500"><Target size={24}/></div>
                <div>
                   <h4 className="font-bold text-gray-900">Por Objetivo</h4>
                   <p className="text-xs text-gray-500">Solo tarjetas de "Fullstack JS"</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderSession = () => {
    const card = sessionCards[currentCardIndex];
    const progress = ((currentCardIndex) / sessionCards.length) * 100;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setMode('DASHBOARD')} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                <div className="flex-1 mx-6">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2 font-medium">Tarjeta {currentCardIndex + 1} de {sessionCards.length}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                    <Zap size={14} fill="currentColor" /> <span className="text-xs font-bold">{sessionStats.xpGained} XP</span>
                </div>
            </div>

            {/* Flashcard Area */}
            <div className="flex-1 flex flex-col justify-center perspective-1000 relative">
                 <div className="bg-white w-full min-h-[400px] rounded-3xl shadow-xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    
                    {/* Node Context Pill */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Layers size={14} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-600">{card.nodeTitle}</span>
                        {card.nodeId === 'js-syntax' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" title="En decadencia"></span>}
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full">
                        {card.type === 'CODE' ? (
                            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-left text-sm font-mono overflow-x-auto max-w-full">
                                <code dangerouslySetInnerHTML={{ __html: card.front }} />
                            </pre>
                        ) : (
                            <h2 className="text-2xl font-medium text-gray-800 leading-relaxed">{card.front}</h2>
                        )}
                    </div>

                    {showAnswer && (
                        <div className="w-full pt-8 mt-8 border-t border-gray-100 animate-fade-in-up">
                             <p className="text-lg text-gray-600 font-medium mb-2">Respuesta:</p>
                             <p className="text-xl text-indigo-700 font-bold">{card.back}</p>
                        </div>
                    )}
                 </div>
            </div>

            {/* Controls */}
            <div className="mt-8 h-20">
                {!showAnswer ? (
                    <button 
                        onClick={() => setShowAnswer(true)}
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-lg"
                    >
                        Mostrar Respuesta
                    </button>
                ) : (
                    <div className="grid grid-cols-4 gap-3 h-14">
                        <button onClick={() => handleRating('AGAIN')} className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl border border-rose-200 transition-colors flex flex-col items-center justify-center">
                            <span className="text-sm">Mal</span>
                            <span className="text-[10px] opacity-70">1m</span>
                        </button>
                        <button onClick={() => handleRating('HARD')} className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-xl border border-orange-200 transition-colors flex flex-col items-center justify-center">
                            <span className="text-sm">Difícil</span>
                            <span className="text-[10px] opacity-70">10m</span>
                        </button>
                        <button onClick={() => handleRating('GOOD')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl border border-blue-200 transition-colors flex flex-col items-center justify-center">
                            <span className="text-sm">Bien</span>
                            <span className="text-[10px] opacity-70">1d</span>
                        </button>
                        <button onClick={() => handleRating('EASY')} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold rounded-xl border border-emerald-200 transition-colors flex flex-col items-center justify-center">
                            <span className="text-sm">Fácil</span>
                            <span className="text-[10px] opacity-70">4d</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
  };

  const renderSummary = () => (
     <div className="max-w-md mx-auto px-4 py-12 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">¡Sesión completada!</h2>
        <p className="text-gray-500 mb-8">Has cuidado tu cerebro y fortalecido tus conexiones.</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 grid grid-cols-2 gap-4">
            <div>
                <span className="block text-3xl font-bold text-indigo-600">+{sessionStats.xpGained}</span>
                <span className="text-xs font-bold text-gray-400 uppercase">XP Ganado</span>
            </div>
            <div>
                <span className="block text-3xl font-bold text-green-500">{sessionCards.length}</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Repasadas</span>
            </div>
        </div>

        <button 
            onClick={() => { setMode('DASHBOARD'); onNavigate('DASHBOARD'); }}
            className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
        >
            Volver al Dashboard
        </button>
     </div>
  );

  if (mode === 'SESSION') return renderSession();
  if (mode === 'SUMMARY') return renderSummary();
  return renderDashboard();
};

export default ReviewPage;
