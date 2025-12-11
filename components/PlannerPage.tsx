
import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Settings, RotateCcw, Filter, Calendar as CalIcon, 
  List, CheckCircle2, AlertCircle, Clock, Video, BookOpen, PenTool, BrainCircuit, 
  X, MoveRight, Play, ArrowRight, MoreHorizontal 
} from 'lucide-react';
import { MOCK_CALENDAR_TASKS, MOCK_GOAL, getTodayStr } from '../constants';
import { CalendarTask, PageView } from '../types';

interface PlannerPageProps {
  onNavigate: (page: PageView) => void;
}

type ViewMode = 'WEEK' | 'MONTH';

const PlannerPage: React.FC<PlannerPageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('WEEK');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<CalendarTask[]>(MOCK_CALENDAR_TASKS);
  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null);
  
  // Settings State
  const [dailyMinutes, setDailyMinutes] = useState(60);
  const [studyDays, setStudyDays] = useState([1, 2, 3, 4, 5]); // Mon-Fri default
  const [showSettings, setShowSettings] = useState(false);
  
  // Simulation State
  const [simulatedMinutes, setSimulatedMinutes] = useState(60);

  // --- HELPERS ---

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    start.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const isToday = (date: Date) => formatDate(date) === getTodayStr();

  const getTasksForDate = (dateStr: string) => tasks.filter(t => t.date === dateStr);

  const getTotalDuration = (dateStr: string) => {
    return getTasksForDate(dateStr).reduce((acc, curr) => acc + curr.durationMin, 0);
  };

  const getLoadStatus = (minutes: number, limit: number) => {
    if (minutes === 0) return 'EMPTY';
    if (minutes <= limit) return 'OK';
    if (minutes <= limit + 15) return 'WARN';
    return 'OVERLOAD';
  };

  const getLoadColor = (status: string) => {
    switch (status) {
      case 'OK': return 'bg-green-500';
      case 'WARN': return 'bg-yellow-400';
      case 'OVERLOAD': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  const getTaskIcon = (type: CalendarTask['type']) => {
    switch (type) {
      case 'LESSON': return <Video size={14} />;
      case 'PROJECT': return <PenTool size={14} />;
      case 'QUIZ': return <BookOpen size={14} />;
      case 'REVIEW': return <BrainCircuit size={14} />;
    }
  };

  const getTaskColor = (type: CalendarTask['type']) => {
    switch (type) {
        case 'LESSON': return 'border-blue-200 bg-blue-50 text-blue-700';
        case 'PROJECT': return 'border-indigo-200 bg-indigo-50 text-indigo-700';
        case 'QUIZ': return 'border-amber-200 bg-amber-50 text-amber-700';
        case 'REVIEW': return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }
  };

  // --- SIMULATION LOGIC ---
  
  // Mock calculation: Total Goal Nodes * Avg Time / Minutes per Day
  const totalRemainingMinutes = (MOCK_GOAL.totalNodes - MOCK_GOAL.completedNodes) * 45; // Approx 45 min per node
  const daysRemaining = Math.ceil(totalRemainingMinutes / simulatedMinutes);
  
  const getProjectedDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + daysRemaining);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  };

  // --- RENDERERS ---

  const renderHeader = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30">
      
      {/* Left: Nav & Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Planificador</h2>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode('WEEK')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'WEEK' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                Semana
            </button>
            <button onClick={() => setViewMode('MONTH')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'MONTH' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                Mes
            </button>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={20} /></button>
            <span className="text-sm font-semibold text-gray-700 min-w-[140px] text-center">
                {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={20} /></button>
            <button onClick={() => setCurrentDate(new Date())} className="text-xs font-bold text-indigo-600 hover:underline px-2">Hoy</button>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
         <div className="hidden md:flex flex-col items-end mr-2">
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Objetivo Activo</span>
             <span className="text-sm font-bold text-indigo-600">{MOCK_GOAL.title}</span>
         </div>
         
         <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
             <Settings size={16} /> <span className="hidden sm:inline">Disponibilidad</span>
         </button>
         
         <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
             <RotateCcw size={16} /> Recalcular
         </button>
      </div>
    </div>
  );

  const renderBacklog = () => {
    const overdueTasks = tasks.filter(t => t.status === 'OVERDUE');
    if (overdueTasks.length === 0) return null;

    return (
        <div className="bg-red-50 border-b border-red-100 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-700">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">Tienes <strong>{overdueTasks.length} tareas atrasadas</strong>. ¿Quieres redistribuirlas?</span>
            </div>
            <button className="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded hover:bg-red-700 transition-colors">
                Repartir automáticamente
            </button>
        </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);

    return (
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex h-full min-w-[1000px]">
                {weekDays.map((day, idx) => {
                    const dateStr = formatDate(day);
                    const dayTasks = getTasksForDate(dateStr);
                    const totalMins = getTotalDuration(dateStr);
                    const isTodayDate = isToday(day);
                    const loadStatus = getLoadStatus(totalMins, dailyMinutes);
                    const isStudyDay = studyDays.includes(day.getDay());

                    return (
                        <div key={idx} className={`flex-1 border-r border-gray-100 flex flex-col h-full min-w-[140px] ${!isStudyDay ? 'bg-slate-50/50' : ''}`}>
                            {/* Day Header */}
                            <div className={`p-3 border-b border-gray-100 text-center ${isTodayDate ? 'bg-indigo-50/50' : ''}`}>
                                <span className="text-xs font-bold text-gray-400 uppercase block">{day.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mt-1 ${isTodayDate ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-900'}`}>
                                    {day.getDate()}
                                </div>
                                
                                {isStudyDay && (
                                    <div className="mt-2 flex items-center justify-center gap-1.5">
                                        <div className={`h-1.5 w-12 rounded-full ${getLoadColor(loadStatus)}`}></div>
                                        <span className={`text-[10px] font-medium ${totalMins > dailyMinutes ? 'text-red-500' : 'text-gray-400'}`}>{totalMins}m</span>
                                    </div>
                                )}
                            </div>

                            {/* Tasks Container */}
                            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                {!isStudyDay && dayTasks.length === 0 && (
                                    <div className="h-full flex items-center justify-center text-gray-300 text-xs text-center px-4">
                                        Día libre
                                    </div>
                                )}
                                
                                {dayTasks.map(task => (
                                    <div 
                                        key={task.id}
                                        onClick={() => setSelectedTask(task)}
                                        className={`p-3 rounded-lg border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-all group bg-white ${getTaskColor(task.type)} ${selectedTask?.id === task.id ? 'ring-2 ring-indigo-500' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
                                                {getTaskIcon(task.type)} {task.type}
                                            </span>
                                            <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 text-gray-400" />
                                        </div>
                                        <h4 className="text-xs font-bold text-gray-900 leading-snug mb-2">{task.title}</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <Clock size={10} /> {task.durationMin} min
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
  };

  const renderSettingsModal = () => {
      if (!showSettings) return null;
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Configurar Disponibilidad</h3>
                      <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
                  </div>
                  
                  <div className="space-y-6">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo diario (minutos)</label>
                          <div className="flex items-center gap-4">
                              <input 
                                type="range" min="15" max="180" step="15" 
                                value={dailyMinutes} onChange={(e) => setDailyMinutes(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                              />
                              <span className="text-indigo-600 font-bold w-12 text-right">{dailyMinutes}m</span>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Días de estudio</label>
                          <div className="flex justify-between">
                              {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => {
                                        if (studyDays.includes(idx)) setStudyDays(studyDays.filter(d => d !== idx));
                                        else setStudyDays([...studyDays, idx]);
                                    }}
                                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${studyDays.includes(idx) ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                  >
                                      {day}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                      <button onClick={() => setShowSettings(false)} className="flex-1 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Cancelar</button>
                      <button onClick={() => setShowSettings(false)} className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700">Guardar Cambios</button>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* SETTINGS MODAL */}
        {renderSettingsModal()}

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col min-w-0">
            {renderHeader()}
            {renderBacklog()}
            {viewMode === 'WEEK' ? renderWeekView() : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                        <CalIcon size={48} className="mx-auto mb-2 opacity-20" />
                        <p>Vista mensual en construcción</p>
                    </div>
                </div>
            )}
        </div>

        {/* RIGHT SIDEBAR (DETAILS & SIMULATOR) */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col z-20 shadow-xl">
            {selectedTask ? (
                // TASK DETAIL VIEW
                <div className="flex flex-col h-full animate-fade-in">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                        <h3 className="font-bold text-gray-900 text-lg">Detalle de Tarea</h3>
                        <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                    </div>
                    
                    <div className="p-6 flex-1 overflow-y-auto">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 ${getTaskColor(selectedTask.type)}`}>
                            {selectedTask.type}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{selectedTask.title}</h2>
                        
                        <div className="space-y-4 mt-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Clock className="text-indigo-500" size={18} />
                                <span>Estimado: <strong>{selectedTask.durationMin} min</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CalIcon className="text-indigo-500" size={18} />
                                <span>Fecha: <strong>{selectedTask.date}</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle2 className="text-indigo-500" size={18} />
                                <span>Estado: <strong>{selectedTask.status === 'PENDING' ? 'Pendiente' : 'Completado'}</strong></span>
                            </div>
                        </div>

                        {selectedTask.nodeId && (
                             <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                 <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">Nodo Relacionado</h4>
                                 <p className="text-sm text-indigo-900 font-medium mb-3">Fundamentos de HTML</p>
                                 <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
                                     <div className="bg-indigo-600 h-full w-[60%]"></div>
                                 </div>
                             </div>
                        )}
                    </div>

                    <div className="p-5 border-t border-gray-100 space-y-3 bg-gray-50">
                        <button onClick={() => onNavigate('DOJO')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md">
                            <Play fill="currentColor" size={18} /> Empezar Ahora
                        </button>
                        <div className="flex gap-2">
                             <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                                <CheckCircle2 size={16} /> Completar
                             </button>
                             <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                                <MoveRight size={16} /> Mover
                             </button>
                        </div>
                    </div>
                </div>
            ) : (
                // SIMULATOR VIEW (DEFAULT)
                <div className="flex flex-col h-full">
                     <div className="p-5 border-b border-gray-100">
                         <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Clock size={18} className="text-indigo-500" /> Simulador de Futuro
                         </h3>
                     </div>
                     <div className="p-6 flex-1 bg-gradient-to-b from-white to-slate-50">
                         <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Ajusta tu dedicación diaria para ver cómo cambia tu fecha de finalización.
                         </p>

                         <div className="mb-8">
                             <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                                 <span>Minutos / día</span>
                                 <span className="text-indigo-600">{simulatedMinutes} min</span>
                             </div>
                             <input 
                                type="range" min="15" max="120" step="15" 
                                value={simulatedMinutes} onChange={(e) => setSimulatedMinutes(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                              />
                             <div className="flex justify-between text-xs text-gray-400 mt-2">
                                 <span>Relajado</span>
                                 <span>Intenso</span>
                             </div>
                         </div>

                         <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Fecha estimada fin</span>
                             <div className="text-2xl font-black text-gray-900 mb-1">{getProjectedDate()}</div>
                             {simulatedMinutes > 60 ? (
                                 <span className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                                     <ArrowRight size={12} className="rotate-[-45deg]"/> 2 semanas antes
                                 </span>
                             ) : simulatedMinutes < 45 ? (
                                 <span className="text-xs text-red-500 font-medium flex items-center justify-center gap-1">
                                     <ArrowRight size={12} className="rotate-[45deg]"/> 3 semanas tarde
                                 </span>
                             ) : (
                                 <span className="text-xs text-gray-400">Según lo previsto</span>
                             )}
                         </div>
                     </div>

                     <div className="p-5 border-t border-gray-100 bg-white">
                         <button onClick={() => { setDailyMinutes(simulatedMinutes); alert('Plan actualizado'); }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
                             Aplicar este ritmo
                         </button>
                     </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default PlannerPage;
