import React, { useState } from 'react';
import { X, Wand2, Target, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { SkillNode, SkillLink } from '../../types';
import { generateSkillTree } from './utils';

interface CreateSkillTreeModalProps {
  onClose: () => void;
  onCreate: (treeId: string, treeName: string, nodes: SkillNode[], links: SkillLink[]) => void;
}

const CreateSkillTreeModal: React.FC<CreateSkillTreeModalProps> = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    goal: '',
    level: 'beginner',
    timeCommitment: 'casual'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
      if (step < 3) setStep(step + 1);
      else handleSubmit();
  };

  const handleSubmit = () => {
      setIsGenerating(true);

      // Simulate API delay
      setTimeout(() => {
          const { nodes, links } = generateSkillTree(formData.topic, formData.level, formData.goal);
          const treeId = formData.topic.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

          onCreate(treeId, formData.topic, nodes, links);
          setIsGenerating(false);
          onClose();
      }, 1500);
  };

  const renderStep1 = () => (
      <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
          <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">¿Qué quieres aprender?</label>
              <input
                  type="text"
                  autoFocus
                  placeholder="Ej. Rust, Cocina, Machine Learning..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-70">¿Cuál es tu objetivo principal?</label>
              <textarea
                  placeholder="Ej. Conseguir un trabajo, Proyecto personal, Curiosidad..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 resize-none h-24 focus:border-blue-400 outline-none transition-all"
                  value={formData.goal}
                  onChange={e => setFormData({...formData, goal: e.target.value})}
              />
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
          <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3 opacity-70">Nivel Actual</label>
              <div className="grid grid-cols-3 gap-3">
                  {[
                      { id: 'beginner', label: 'Principiante', icon: GraduationCap },
                      { id: 'intermediate', label: 'Intermedio', icon: Target },
                      { id: 'advanced', label: 'Avanzado', icon: Wand2 }
                  ].map((opt) => (
                      <button
                          key={opt.id}
                          onClick={() => setFormData({...formData, level: opt.id})}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.level === opt.id ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                      >
                          <opt.icon size={24} />
                          <span className="text-xs font-bold">{opt.label}</span>
                      </button>
                  ))}
              </div>
          </div>

          <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3 opacity-70">Disponibilidad</label>
              <div className="grid grid-cols-3 gap-3">
                  {[
                      { id: 'casual', label: 'Casual', sub: '2h/semana' },
                      { id: 'serious', label: 'Serio', sub: '5h/semana' },
                      { id: 'intense', label: 'Intenso', sub: '10h+/semana' }
                  ].map((opt) => (
                      <button
                          key={opt.id}
                          onClick={() => setFormData({...formData, timeCommitment: opt.id})}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${formData.timeCommitment === opt.id ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                      >
                          <Clock size={20} />
                          <span className="text-xs font-bold">{opt.label}</span>
                          <span className="text-[10px] opacity-60">{opt.sub}</span>
                      </button>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderStep3 = () => (
      <div className="text-center space-y-6 animate-in zoom-in fade-in duration-300 py-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Wand2 size={40} className="text-white" />
          </div>
          <div>
              <h3 className="text-2xl font-bold mb-2">¡Todo listo!</h3>
              <p className="opacity-70 max-w-xs mx-auto">
                  Nuestra IA está lista para generar tu ruta de aprendizaje personalizada para <span className="text-blue-400 font-bold">{formData.topic}</span>.
              </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-left text-sm space-y-2 max-w-xs mx-auto border border-white/10">
              <div className="flex justify-between">
                  <span className="opacity-50">Tema:</span>
                  <span className="font-bold">{formData.topic}</span>
              </div>
               <div className="flex justify-between">
                  <span className="opacity-50">Nivel:</span>
                  <span className="font-bold capitalize">{formData.level}</span>
              </div>
              <div className="flex justify-between">
                  <span className="opacity-50">Ritmo:</span>
                  <span className="font-bold capitalize">{formData.timeCommitment}</span>
              </div>
          </div>
      </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0f1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div>
                <h2 className="text-xl font-bold tracking-tight">Nueva Habilidad</h2>
                <div className="flex gap-2 mt-1">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1 rounded-full transition-all duration-500 ${s <= step ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}></div>
                    ))}
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/5 flex justify-between items-center">
            {step > 1 ? (
                <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                >
                    Atrás
                </button>
            ) : <div></div>}

            <button
                onClick={handleNext}
                disabled={!formData.topic}
                className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                    !formData.topic
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-blue-500/25'
                }`}
            >
                {isGenerating ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generando...</span>
                    </>
                ) : (
                    <>
                        <span>{step === 3 ? 'Generar Plan' : 'Siguiente'}</span>
                        {step < 3 && <ChevronRight size={16} />}
                    </>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default CreateSkillTreeModal;
