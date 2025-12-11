import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Lock, Play, FileText, Video, Book, ExternalLink, 
  HelpCircle, Trophy, Plus, Clock, BrainCircuit, PenTool, Sparkles, ChevronRight, Layers, RotateCw
} from 'lucide-react';
import { PageView, DojoResource, DojoQuiz } from '../types';
import { MOCK_DOJO_RESOURCES, MOCK_DOJO_QUIZZES, MOCK_DOJO_PROJECTS, MOCK_DOJO_HISTORY, MOCK_DOJO_NOTES } from '../constants';

interface DojoPageProps {
  onNavigate: (page: PageView) => void;
}

type TabType = 'SUMMARY' | 'LEARN' | 'PRACTICE' | 'PROJECTS' | 'NOTES' | 'HISTORY' | 'REVIEW';

// Updated ResourceItem to handle navigation
const ResourceItem: React.FC<{ item: DojoResource; onNavigate: (page: PageView) => void }> = ({ item, onNavigate }) => {
  const handleClick = () => {
    if (item.status === 'COMPLETED') {
      // Logic: If completed, "Repasar" goes to Review Page
      onNavigate('REVIEW');
    } else {
      // Logic: Open resource (Mock)
      alert(`Abriendo recurso externo: ${item.title}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${item.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
          {item.type === 'VIDEO' ? <Video size={20} /> : item.type === 'ARTICLE' ? <FileText size={20} /> : <Book size={20} />}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            {item.title}
            {item.isOfficial && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">Oficial</span>}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1"><Clock size={12}/> {item.duration}</span>
            {item.status === 'IN_PROGRESS' && <span className="text-amber-600 font-medium">En progreso (60%)</span>}
          </div>
        </div>
      </div>
      <button 
        onClick={handleClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${item.status === 'COMPLETED' ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      >
        {item.status === 'COMPLETED' ? 'Repasar' : 'Abrir'}
      </button>
    </div>
  );
};

const QuizItem: React.FC<{ item: DojoQuiz }> = ({ item }) => (
  <div className={`p-5 rounded-xl border relative overflow-hidden group ${item.isBossFight ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white' : 'bg-white border-gray-100 hover:border-indigo-100'}`}>
    {item.isBossFight && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">BOSS FIGHT</div>}
    
    <div className="flex justify-between items-start relative z-10">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${item.isBossFight ? 'bg-red-500/20 text-red-400' : 'bg-amber-50 text-amber-600'}`}>
          {item.isBossFight ? <Trophy size={24} /> : <HelpCircle size={24} />}
        </div>
        <div>
          <h4 className={`font-bold text-lg ${item.isBossFight ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
          <div className={`flex items-center gap-3 text-sm mt-1 ${item.isBossFight ? 'text-slate-400' : 'text-gray-500'}`}>
            <span>{item.questionCount} preguntas</span>
            <span>•</span>
            <span>{item.estimatedTime}</span>
          </div>
          {item.bestScore && (
            <div className="mt-2 text-xs font-bold text-green-500 bg-green-500/10 inline-block px-2 py-1 rounded">
              Mejor nota: {item.bestScore}%
            </div>
          )}
        </div>
      </div>
      <button className={`px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-transform active:scale-95 ${item.isBossFight ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
        {item.status === 'COMPLETED' ? 'Repetir' : 'Empezar'}
      </button>
    </div>
  </div>
);

const DojoPage: React.FC<DojoPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('SUMMARY');

  // --- CONTENT RENDERING ---

  const renderContent = () => {
    switch (activeTab) {
      case 'SUMMARY':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Why it matters */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BrainCircuit className="text-indigo-500" /> ¿Qué vas a aprender?
              </h3>
              <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100 text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Al terminar este nodo sabrás estructurar una página web básica con HTML5, usar las etiquetas semánticas esenciales y entender la jerarquía del DOM.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Etiquetas básicas: &lt;html&gt;, &lt;head&gt;, &lt;body&gt;...</li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Listas, enlaces e imágenes optimizadas.</li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0"/> Buenas prácticas de estructura y SEO básico.</li>
                </ul>
              </div>
            </section>

            {/* Why important */}
            <section>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide text-gray-400">Por qué importa</h3>
              <p className="text-gray-600 text-sm">
                Es la base de todo lo que harás en frontend. Sin un HTML sólido, tus estilos CSS se romperán y tu JavaScript será difícil de mantener. Es el esqueleto de la web.
              </p>
            </section>

            {/* Path visualization */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Ruta de Conocimiento</h3>
              <div className="flex items-center gap-4 text-sm overflow-x-auto pb-2">
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={14}/></div>
                  <span className="whitespace-nowrap">Intro Web</span>
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="flex items-center gap-2 font-bold text-indigo-600">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-500 text-indigo-700">2</div>
                  <span className="whitespace-nowrap">HTML Básico</span>
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200"><Lock size={12}/></div>
                  <span className="whitespace-nowrap">HTML Semántico</span>
                </div>
              </div>
            </section>

            {/* Action */}
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 mt-8">
              <p className="text-gray-600 mb-4 text-sm">Llevas el 60% de esta habilidad. Te recomendamos seguir con la guía práctica.</p>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-transform active:scale-95 flex items-center justify-center gap-2 mx-auto">
                <Play fill="currentColor" size={18} /> Continuar Aprendiendo
              </button>
            </div>
          </div>
        );
      
      case 'LEARN':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Camino Recomendado</h3>
              <span className="text-xs text-gray-500">2 de 4 completados</span>
            </div>
            
            <div className="space-y-3">
              {MOCK_DOJO_RESOURCES.map(r => (
                <ResourceItem key={r.id} item={r} onNavigate={onNavigate} />
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Añadir Recurso</h3>
              <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex flex-col items-center justify-center gap-2">
                <Plus size={24} />
                <span className="text-sm font-medium">Pegar enlace o subir PDF</span>
              </button>
            </div>
          </div>
        );

      case 'PRACTICE':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
               <h3 className="font-bold text-gray-900 mb-4">Quizzes y Exámenes</h3>
               <div className="space-y-4">
                 {MOCK_DOJO_QUIZZES.map(q => <QuizItem key={q.id} item={q} />)}
               </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 mt-8">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600">
                  <PenTool size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Reto Rápido de Código</h4>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Crea un archivo HTML con un título <code>&lt;h1&gt;</code>, un párrafo y una lista de 3 frutas favoritas.
                  </p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Pega tu link de CodePen / Gist..." className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2" />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Validar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'PROJECTS':
        return (
          <div className="space-y-6 animate-fade-in">
            {MOCK_DOJO_PROJECTS.map(project => (
              <div key={project.id} className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                     <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                   </div>
                   <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">PROYECTO</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Criterios de éxito</h4>
                  <div className="space-y-2">
                    {project.checklist.map(item => (
                      <label key={item.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-1 rounded">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                   <button className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2">Guardar borrador</button>
                   <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-lg shadow-sm">
                     Entregar Proyecto
                   </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'NOTES':
        return (
          <div className="h-full flex flex-col animate-fade-in">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Mi Cuaderno</h3>
                <button className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Sparkles size={14} /> Resumir con IA
                </button>
             </div>
             <div className="flex-1 bg-yellow-50/50 border border-yellow-200 rounded-xl p-4 shadow-sm relative">
                <textarea 
                  className="w-full h-full bg-transparent border-none resize-none focus:ring-0 text-gray-700 text-sm font-mono leading-relaxed"
                  defaultValue={MOCK_DOJO_NOTES}
                ></textarea>
                <div className="absolute bottom-4 right-4 text-xs text-yellow-600/50">Markdown soportado</div>
             </div>
          </div>
        );

      case 'HISTORY':
        return (
          <div className="animate-fade-in">
            <h3 className="font-bold text-gray-900 mb-6">Actividad en este nodo</h3>
            <div className="relative border-l border-gray-200 ml-3 space-y-6 pb-4">
              {MOCK_DOJO_HISTORY.map((h, i) => (
                <div key={h.id} className="relative pl-6">
                  <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white ${i === 0 ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                  <p className="text-sm text-gray-800 font-medium">{h.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{h.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'REVIEW':
        return (
            <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">Mantenimiento de Habilidad</h3>
                    <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded border border-amber-100">Riesgo Bajo</span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 ring-1 ring-white/20">
                            <RotateCw size={24} className="text-emerald-400" />
                        </div>
                        <h4 className="text-2xl font-bold mb-1">5 Tarjetas Pendientes</h4>
                        <p className="text-indigo-200 text-sm mb-6">Repasar ahora te dará +25 XP</p>

                        <button 
                            onClick={() => onNavigate('REVIEW')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-900/20 transition-transform active:scale-95 flex items-center justify-center gap-2 mx-auto"
                        >
                            <Layers size={18} /> Empezar Sesión
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                         <span className="block text-2xl font-bold text-gray-900">85%</span>
                         <span className="text-xs text-gray-500 uppercase tracking-wide">Retención</span>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                         <span className="block text-2xl font-bold text-gray-900">2d</span>
                         <span className="text-xs text-gray-500 uppercase tracking-wide">Próx. Decadencia</span>
                     </div>
                </div>
            </div>
        );
      
      default: return null;
    }
  };

  // --- MAIN RENDER ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('SKILL_TREE')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
               <ArrowLeft size={20} />
             </button>
             <div>
               <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                  <span>Programación</span>
                  <ChevronRight size={12} />
                  <span>Frontend</span>
                  <ChevronRight size={12} />
                  <span>HTML</span>
               </div>
               <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                 Fundamentos de HTML 
                 <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">En Progreso</span>
               </h1>
             </div>
          </div>

          {/* Progress Section */}
          <div className="hidden md:flex flex-col w-64">
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-1.5">
               <span>Progreso del nodo</span>
               <span>60%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full flex overflow-hidden">
               <div className="w-[40%] bg-indigo-500"></div> {/* Theory */}
               <div className="w-[15%] bg-amber-400"></div> {/* Practice */}
               <div className="w-[5%] bg-green-500"></div> {/* Quiz */}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
               <span>Estudio</span>
               <span>Práctica</span>
               <span>Quiz</span>
            </div>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2">
            <Play fill="currentColor" size={16} /> Continuar
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: TABS & CONTENT */}
        <div className="lg:col-span-8 flex flex-col">
           {/* Navigation Tabs */}
           <div className="flex items-center gap-1 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'SUMMARY', label: 'Resumen' },
                { id: 'LEARN', label: 'Aprender' },
                { id: 'PRACTICE', label: 'Practicar' },
                { id: 'PROJECTS', label: 'Proyectos' },
                { id: 'REVIEW', label: 'Repaso' },
                { id: 'NOTES', label: 'Notas' },
                { id: 'HISTORY', label: 'Historial' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </div>

           {/* Tab Content Container */}
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[500px]">
             {renderContent()}
           </div>
        </div>

        {/* RIGHT COLUMN: CONTEXT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Node Badges */}
           <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Información</h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Dificultad</span>
                    <span className="font-medium text-gray-900">Nivel 1 • Básico</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tipo</span>
                    <span className="font-medium text-gray-900">Teórico + Práctico</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Tiempo est.</span>
                    <span className="font-medium text-gray-900">45 - 60 min</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">XP Recompensa</span>
                    <span className="font-medium text-indigo-600">+150 XP</span>
                 </div>
              </div>
           </div>

           {/* Prerequisites */}
           <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Prerequisitos</h3>
              <div className="space-y-2">
                 <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span className="text-sm text-gray-700">Intro a la Web</span>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span className="text-sm text-gray-700">Cómo funciona internet</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Next Steps (Children) */}
           <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Desbloquea</h3>
              <div className="space-y-2">
                 <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-75">
                    <Lock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">HTML Semántico</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-75">
                    <Lock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">Formularios</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg opacity-75">
                    <Lock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">Accesibilidad (A11y)</span>
                 </div>
              </div>
           </div>

           {/* Goal Impact */}
           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-md">
              <div className="flex items-start gap-3">
                 <Target className="mt-1 opacity-80" size={20} />
                 <div>
                    <h4 className="font-bold text-sm">Impacto en Objetivo</h4>
                    <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
                       Completar este nodo aporta un <strong className="text-white">3%</strong> a tu objetivo "Fullstack Junior".
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

// Simple internal icon component for context
const Target = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

export default DojoPage;