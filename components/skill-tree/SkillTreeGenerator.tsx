import React, { useState } from 'react';
import { X, Wand2, BrainCircuit, Target, Clock, BarChart } from 'lucide-react';
import { generateSkillTree, SkillTreeGenerationParams } from './utils';
import { SkillNode, SkillLink } from '../../types';

interface SkillTreeGeneratorProps {
  onClose: () => void;
  onGenerate: (tree: { id: string; name: string; nodes: SkillNode[]; links: SkillLink[] }) => void;
}

const SkillTreeGenerator: React.FC<SkillTreeGeneratorProps> = ({ onClose, onGenerate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SkillTreeGenerationParams>({
    topic: '',
    goal: '',
    level: 'Beginner',
    timeCommitment: '5h/week'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTree = generateSkillTree(formData);
    onGenerate(newTree);
    setIsGenerating(false);
    onClose();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Wand2 size={24} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">Generador de Habilidades</h2>
                <p className="text-xs text-zinc-400">IA Architect v2.0</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
            {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BrainCircuit size={24} className="text-purple-400 animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-bold text-white">Analizando Arquitectura...</h3>
                        <p className="text-sm text-zinc-400">Diseñando ruta de aprendizaje óptima para {formData.topic}</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-wider">
                                    <BrainCircuit size={16} className="text-purple-400"/> ¿Qué quieres aprender?
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. Machine Learning, Tocar guitarra, Cocina japonesa..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                    value={formData.topic}
                                    onChange={e => setFormData({...formData, topic: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-wider">
                                    <Target size={16} className="text-purple-400"/> ¿Cuál es tu objetivo?
                                </label>
                                <textarea
                                    required
                                    placeholder="Ej. Quiero conseguir un trabajo como Junior Dev en 6 meses..."
                                    rows={3}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                                    value={formData.goal}
                                    onChange={e => setFormData({...formData, goal: e.target.value})}
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                             <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-wider">
                                    <BarChart size={16} className="text-purple-400"/> Nivel Actual
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Principiante', 'Intermedio', 'Avanzado'].map((lvl) => (
                                        <button
                                            key={lvl}
                                            type="button"
                                            onClick={() => setFormData({...formData, level: lvl})}
                                            className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${formData.level === lvl ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-black/20 border-white/10 text-zinc-400 hover:border-white/30'}`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-wider">
                                    <Clock size={16} className="text-purple-400"/> Tiempo Semanal
                                </label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none appearance-none"
                                    value={formData.timeCommitment}
                                    onChange={e => setFormData({...formData, timeCommitment: e.target.value})}
                                >
                                    <option value="2h">2 horas / semana</option>
                                    <option value="5h">5 horas / semana</option>
                                    <option value="10h">10 horas / semana</option>
                                    <option value="20h+">20+ horas / semana</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-3 rounded-xl font-bold text-zinc-400 hover:bg-white/5 transition-colors"
                            >
                                Atrás
                            </button>
                        )}
                        {step < 2 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!formData.topic || !formData.goal}
                                className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/25"
                            >
                                Generar Skill Tree
                            </button>
                        )}
                    </div>

                </form>
            )}
        </div>

      </div>
    </div>
  );
};

export default SkillTreeGenerator;
