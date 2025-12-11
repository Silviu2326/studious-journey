import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Lock, Play, FileText, Video, Book, ExternalLink, 
  HelpCircle, Trophy, Plus, Clock, BrainCircuit, PenTool, Sparkles, ChevronRight,
  Layers, RotateCw, Maximize2, Minimize2, PanelRightOpen, PanelRightClose,
  MessageSquare, Timer, Code, ChevronDown, MonitorPlay, ListTodo, Star
} from 'lucide-react';
import { PageView, DojoResource, DojoQuiz } from '../types';
import { MOCK_DOJO_RESOURCES, MOCK_DOJO_QUIZZES, MOCK_DOJO_PROJECTS, MOCK_DOJO_HISTORY, MOCK_DOJO_NOTES } from '../constants';

interface DojoPageProps {
  onNavigate: (page: PageView) => void;
}

type StepType = 'SUMMARY' | 'LEARN' | 'PRACTICE' | 'PROJECTS' | 'REVIEW';
type ToolType = 'NOTES' | 'CHAT' | 'TIMER' | 'INFO';

// --- SUB-COMPONENTS ---

// 1. POMODORO TIMER
const DojoTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Bell sound would go here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };
  const switchMode = (m: 'FOCUS' | 'BREAK') => {
    setMode(m);
    setTimeLeft(m === 'FOCUS' ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Temporizador Dojo</h4>
        <div className="flex gap-1">
           <button onClick={() => switchMode('FOCUS')} className={`px-2 py-0.5 text-[10px] rounded ${mode === 'FOCUS' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Focus</button>
           <button onClick={() => switchMode('BREAK')} className={`px-2 py-0.5 text-[10px] rounded ${mode === 'BREAK' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Descanso</button>
        </div>
      </div>
      <div className="text-4xl font-mono font-bold text-center mb-4 tracking-widest text-white">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-2">
        <button onClick={toggleTimer} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${isActive ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
          {isActive ? 'Pausa' : 'Iniciar'}
        </button>
        <button onClick={resetTimer} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
          <RotateCw size={16} />
        </button>
      </div>
    </div>
  );
};

// 2. AI CHAT
const DojoChat = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-1">
        <div className="flex items-start gap-2">
           <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs"><Sparkles size={12}/></div>
           <div className="bg-indigo-50 p-2 rounded-lg rounded-tl-none text-xs text-slate-700 border border-indigo-100">
             Hola, soy tu Sensei AI. Estoy analizando el contenido de este nodo de HTML. ¿Tienes dudas sobre las etiquetas semánticas?
           </div>
        </div>
      </div>
      <div className="mt-2 border-t pt-2">
        <div className="relative">
          <input type="text" placeholder="Pregunta algo..." className="w-full text-xs bg-slate-50 border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-indigo-500 outline-none" />
          <button className="absolute right-2 top-1.5 text-indigo-500 hover:text-indigo-600"><ArrowLeft size={14} className="rotate-180" /></button>
        </div>
      </div>
    </div>
  );
};

// 3. RESOURCE ITEM
const ResourceItem: React.FC<{ item: DojoResource; onNavigate: (page: PageView) => void }> = ({ item, onNavigate }) => {
  const handleClick = () => {
    if (item.status === 'COMPLETED') {
      onNavigate('REVIEW');
    } else {
      alert(`Abriendo recurso externo: ${item.title}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-indigo-100 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
          {item.type === 'VIDEO' ? <Video size={16} /> : item.type === 'ARTICLE' ? <FileText size={16} /> : <Book size={16} />}
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-900 leading-tight">
            {item.title}
            {item.isOfficial && <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-1 py-px rounded border border-slate-200">Oficial</span>}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
            <span className="flex items-center gap-0.5"><Clock size={10}/> {item.duration}</span>
            {item.status === 'IN_PROGRESS' && <span className="text-amber-600 font-bold">En progreso</span>}
          </div>
        </div>
      </div>
      <button 
        onClick={handleClick}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${item.status === 'COMPLETED' ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'}`}
      >
        {item.status === 'COMPLETED' ? 'Repasar' : 'Abrir'}
      </button>
    </div>
  );
};

// --- MAIN PAGE ---

const DojoPage: React.FC<DojoPageProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<StepType>('SUMMARY');
  const [activeTool, setActiveTool] = useState<ToolType>('NOTES');
  const [showTools, setShowTools] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  // --- CONTENT RENDERERS ---

  const renderSummary = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
           <div className="flex items-start justify-between">
              <div>
                 <div className="flex items-center gap-2 text-indigo-200 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest border border-indigo-400/30 px-2 py-0.5 rounded">Objetivo del Nodo</span>
                 </div>
                 <h2 className="text-3xl font-bold mb-4">Dominando la Estructura Web</h2>
                 <p className="text-indigo-100 leading-relaxed max-w-xl">
                    Al terminar este nodo sabrás estructurar una página web básica con HTML5, usar las etiquetas semánticas esenciales y entender la jerarquía del DOM.
                 </p>
              </div>
              <div className="hidden md:block">
                 <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <div className="text-center">
                       <div className="text-3xl font-bold">150</div>
                       <div className="text-xs uppercase tracking-wide opacity-80">XP Reward</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BrainCircuit className="text-indigo-500" /> Conceptos Clave
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
             {['Etiquetas Semánticas', 'Estructura DOM', 'Atributos & Metadatos'].map((c,i) => (
               <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 font-bold">{i+1}</div>
                  <h4 className="font-semibold text-gray-800">{c}</h4>
               </div>
             ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide text-gray-400">Por qué importa</h3>
          <p className="text-gray-600">
            Es la base de todo lo que harás en frontend. Sin un HTML sólido, tus estilos CSS se romperán y tu JavaScript será difícil de mantener. Es el esqueleto de la web.
          </p>
          <div className="mt-6 flex justify-center">
             <button onClick={() => setActiveStep('LEARN')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-transform active:scale-95 flex items-center gap-2">
                <Play fill="currentColor" size={18} /> Comenzar Lección
             </button>
          </div>
        </section>
    </div>
  );

  const renderLearn = () => (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Material de Estudio</h2>
        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded">2/4 Completados</span>
      </div>

      <div className="space-y-3">
        {MOCK_DOJO_RESOURCES.map(r => (
          <ResourceItem key={r.id} item={r} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Plus size={18}/> Material Externo</h3>
        <p className="text-sm text-gray-500 mb-4">Añade documentación o videos que encuentres útiles.</p>
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
           Pegar enlace aquí...
        </button>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
       <div className="grid md:grid-cols-2 gap-6">
          {/* Quiz Section */}
          <div className="space-y-4">
             <h3 className="font-bold text-gray-900 flex items-center gap-2"><HelpCircle size={20} className="text-amber-500"/> Quizzes</h3>
             {MOCK_DOJO_QUIZZES.map(q => (
               <div key={q.id} className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${q.isBossFight ? 'bg-slate-900 border-slate-700 text-white shadow-xl' : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${q.isBossFight ? 'bg-red-500 text-white' : 'bg-green-100 text-green-700'}`}>
                        {q.isBossFight ? 'BOSS FIGHT' : 'QUIZ'}
                     </span>
                     {q.status === 'COMPLETED' && <CheckCircle2 size={16} className="text-green-500"/>}
                  </div>
                  <h4 className="font-bold mb-1">{q.title}</h4>
                  <p className={`text-xs ${q.isBossFight ? 'text-slate-400' : 'text-gray-500'}`}>{q.questionCount} preguntas • {q.estimatedTime}</p>
               </div>
             ))}
          </div>

          {/* Code Challenge */}
          <div className="space-y-4">
             <h3 className="font-bold text-gray-900 flex items-center gap-2"><Code size={20} className="text-indigo-500"/> Reto de Código</h3>
             <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                   Crea un archivo HTML con un título <code>&lt;h1&gt;</code>, un párrafo introductorio y una lista desordenada de tus 3 frutas favoritas.
                </p>
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-green-400 mb-4 overflow-x-auto">
                   &lt;h1&gt;Hola Mundo&lt;/h1&gt;<br/>
                   &lt;p&gt;Este es mi primer sitio&lt;/p&gt;<br/>
                   &lt;ul&gt;...&lt;/ul&gt;
                </div>
                <button className="w-full bg-indigo-50 text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                   Abrir Editor
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  const renderProjects = () => (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
       {MOCK_DOJO_PROJECTS.map(project => (
         <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
               <div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 mb-2 inline-block">PROYECTO FINAL</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{project.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{project.description}</p>
               </div>
               <div className="bg-slate-100 p-3 rounded-lg text-slate-400">
                  <Trophy size={24} />
               </div>
            </div>

            <div className="mt-6 bg-slate-50 rounded-lg p-4 border border-slate-100">
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Checklist de Entrega</h4>
               <div className="space-y-2">
                 {project.checklist.map(item => (
                   <label key={item.id} className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-white rounded transition-colors">
                     <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                     <span className="text-sm text-gray-700">{item.text}</span>
                   </label>
                 ))}
               </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
               <button className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2">Ver Ejemplo</button>
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2 rounded-lg shadow-sm">
                 Subir Solución
               </button>
            </div>
         </div>
       ))}
    </div>
  );

  const renderToolContent = () => {
    switch(activeTool) {
      case 'NOTES':
        return (
          <div className="h-full flex flex-col">
             <div className="p-4 border-b border-gray-100 bg-yellow-50/30 flex justify-between items-center">
                <span className="font-bold text-xs uppercase tracking-wider text-yellow-700">Cuaderno</span>
                <button className="text-yellow-600 hover:text-yellow-700"><Sparkles size={14}/></button>
             </div>
             <textarea
               className="flex-1 p-4 bg-transparent resize-none focus:outline-none text-sm text-gray-700 font-mono leading-relaxed"
               defaultValue={MOCK_DOJO_NOTES}
               placeholder="Escribe tus notas aquí (Markdown soportado)..."
             ></textarea>
          </div>
        );
      case 'CHAT':
        return (
          <div className="h-full flex flex-col bg-slate-50">
             <div className="p-4 border-b border-gray-200 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-indigo-600">Sensei AI</span>
             </div>
             <div className="flex-1 p-4">
               <DojoChat />
             </div>
          </div>
        );
      case 'TIMER':
         return (
           <div className="p-4">
             <DojoTimer />
             <div className="mt-6">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Historial de Sesión</h5>
                <div className="text-sm text-gray-500 flex justify-between border-b border-gray-100 py-2">
                   <span>Estudio Profundo</span>
                   <span>25 min</span>
                </div>
                <div className="text-sm text-gray-500 flex justify-between border-b border-gray-100 py-2">
                   <span>Descanso</span>
                   <span>5 min</span>
                </div>
             </div>
           </div>
         );
      case 'INFO':
        return (
          <div className="p-4 space-y-6">
             <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalles</h5>
                <div className="space-y-3">
                   <div className="flex justify-between text-sm"><span className="text-gray-500">Nivel</span> <span className="font-medium">Principiante</span></div>
                   <div className="flex justify-between text-sm"><span className="text-gray-500">XP</span> <span className="font-medium text-indigo-600">150 XP</span></div>
                   <div className="flex justify-between text-sm"><span className="text-gray-500">Tiempo</span> <span className="font-medium">45m</span></div>
                </div>
             </div>
             <div>
               <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Requisitos</h5>
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                     <CheckCircle2 size={14}/> <span>Intro Web</span>
                  </div>
               </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  // --- LAYOUT ---

  return (
    <div className={`transition-all duration-300 ${focusMode ? 'fixed inset-0 z-50 bg-slate-50 flex flex-col' : 'min-h-screen flex flex-col bg-slate-50'}`}>

       {/* COMMAND BAR (Header) */}
       <header className={`bg-white border-b border-gray-200 flex items-center justify-between px-4 h-16 shrink-0 ${focusMode ? 'shadow-sm' : 'sticky top-0 z-40'}`}>
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('SKILL_TREE')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
               <ArrowLeft size={20} />
             </button>
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">HTML / Nivel 1</span>
                <h1 className="text-sm md:text-base font-bold text-gray-900 truncate max-w-[200px] md:max-w-md">Fundamentos de Estructura</h1>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             {/* Progress Mini */}
             <div className="hidden md:flex flex-col w-32">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                   <span>Progreso</span>
                   <span>60%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div className="w-[60%] bg-indigo-600 h-full"></div>
                </div>
             </div>

             <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

             {/* Focus Toggle */}
             <button
               onClick={() => setFocusMode(!focusMode)}
               className={`p-2 rounded-lg transition-colors ${focusMode ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100 text-gray-500'}`}
               title="Modo Focus"
             >
               {focusMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
             </button>

             {/* Tools Toggle */}
             <button
               onClick={() => setShowTools(!showTools)}
               className={`p-2 rounded-lg transition-colors md:hidden ${showTools ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100 text-gray-500'}`}
             >
               {showTools ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
             </button>
          </div>
       </header>

       {/* WORKSPACE */}
       <div className="flex-1 flex overflow-hidden">

          {/* 1. STEP NAVIGATION (Left Sidebar) */}
          <nav className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
             <div className="p-4 overflow-y-auto flex-1 space-y-2">
                <p className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Ruta de Lección</p>

                {[
                  { id: 'SUMMARY', label: 'Resumen', icon: BrainCircuit },
                  { id: 'LEARN', label: 'Aprender', icon: Book },
                  { id: 'PRACTICE', label: 'Practicar', icon: Code },
                  { id: 'PROJECTS', label: 'Proyecto', icon: Trophy },
                  { id: 'REVIEW', label: 'Repaso', icon: RotateCw },
                ].map(step => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id as StepType)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      activeStep === step.id
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <step.icon size={20} className={activeStep === step.id ? 'text-indigo-600' : 'text-gray-400'} />
                    <span className="hidden md:block text-sm font-medium">{step.label}</span>
                    {activeStep === step.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 hidden md:block"></div>}
                  </button>
                ))}
             </div>

             {/* Bottom Action */}
             <div className="p-4 border-t border-gray-100 hidden md:block">
               <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95">
                 Completar Nodo
               </button>
             </div>
          </nav>

          {/* 2. MAIN CONTENT (Center) */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50 relative scroll-smooth">
             <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
               {activeStep === 'SUMMARY' && renderSummary()}
               {activeStep === 'LEARN' && renderLearn()}
               {activeStep === 'PRACTICE' && renderPractice()}
               {activeStep === 'PROJECTS' && renderProjects()}
               {activeStep === 'REVIEW' && (
                 <div className="text-center py-20">
                   <div className="inline-flex bg-white p-4 rounded-full shadow-sm mb-4"><RotateCw size={32} className="text-indigo-500"/></div>
                   <h2 className="text-xl font-bold text-gray-900">Sección de Repaso</h2>
                   <p className="text-gray-500 mt-2">Próximamente disponible.</p>
                 </div>
               )}
             </div>
          </main>

          {/* 3. TOOLS PANEL (Right Sidebar) */}
          {showTools && (
            <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 shadow-xl md:shadow-none absolute md:relative right-0 h-full z-20">
               {/* Tool Tabs */}
               <div className="flex border-b border-gray-200">
                  {[
                    { id: 'NOTES', icon: PenTool, label: 'Notas' },
                    { id: 'CHAT', icon: MessageSquare, label: 'Chat' },
                    { id: 'TIMER', icon: Timer, label: 'Timer' },
                    { id: 'INFO', icon: Star, label: 'Info' },
                  ].map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id as ToolType)}
                      className={`flex-1 py-3 flex justify-center items-center border-b-2 transition-colors ${
                        activeTool === tool.id
                          ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                          : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                      title={tool.label}
                    >
                      <tool.icon size={18} />
                    </button>
                  ))}
               </div>

               {/* Tool Content */}
               <div className="flex-1 overflow-y-auto">
                 {renderToolContent()}
               </div>
            </aside>
          )}
       </div>
    </div>
  );
};

export default DojoPage;
