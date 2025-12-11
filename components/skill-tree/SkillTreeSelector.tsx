import React, { useState } from 'react';
import { Network, ChevronDown, Check } from 'lucide-react';
import { ThemeConfig } from './types';

import { Plus } from 'lucide-react';

interface SkillTreeSelectorProps {
  currentTreeId: string;
  onSelectTree: (treeId: string) => void;
  onNewTree?: () => void;
  trees: { id: string; name: string }[];
  theme: ThemeConfig;
}

const SkillTreeSelector: React.FC<SkillTreeSelectorProps> = ({ currentTreeId, onSelectTree, onNewTree, trees, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentTree = trees.find(t => t.id === currentTreeId);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg border border-transparent ${theme.panelClass} ${theme.buttonClass}`}
      >
        <Network size={18} />
        <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">{currentTree?.name || 'Seleccionar Árbol'}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 border-2 border-current shadow-2xl ${theme.panelClass}`}>
             <div className="text-[10px] uppercase font-bold tracking-widest opacity-50 px-3 py-2 border-b border-current/20 mb-2">Árboles de Habilidad</div>
             <div className="space-y-1 mb-2">
               {trees.map((tree) => (
                 <button
                   key={tree.id}
                   onClick={() => {
                     onSelectTree(tree.id);
                     setIsOpen(false);
                   }}
                   className={`w-full text-left px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${currentTreeId === tree.id ? 'bg-current text-black shadow-lg scale-105' : 'hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                   style={{ backgroundColor: currentTreeId === tree.id ? theme.accentColor : undefined, color: currentTreeId === tree.id ? 'black' : undefined }}
                 >
                   <span>{tree.name}</span>
                   {currentTreeId === tree.id && <Check size={14} />}
                 </button>
               ))}
             </div>

             {onNewTree && (
                <div className="pt-2 border-t border-current/20">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onNewTree();
                        }}
                        className="w-full text-left px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                    >
                        <Plus size={14} />
                        <span>Aprender Nueva Habilidad</span>
                    </button>
                </div>
             )}
          </div>
        </>
      )}
    </div>
  );
};

export default SkillTreeSelector;
