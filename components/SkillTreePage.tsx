import React, { useRef, useState, useEffect } from 'react';
import { 
  Search, Target, Filter, MousePointer2, Plus, Minus, 
  Map as MapIcon, X, CheckCircle2, Play, Cpu, Anchor, Palette
} from 'lucide-react';
import { MOCK_GOAL, SKILL_TREES_DATA, AVAILABLE_TREES } from '../constants';
import { SkillNode, CameraState, NodeStatus, PageView, SkillLink } from '../types';
import { ThemeType, ThemeConfig } from './skill-tree/types';
import SkillTreeSelector from './skill-tree/SkillTreeSelector';
import SkillTreeGenerator from './skill-tree/SkillTreeGenerator';

// Original Themes
import { COSMIC_THEME, CosmicBackground, CosmicNode } from './skill-tree/themes/Cosmic';
import { PIRATE_THEME, PirateBackground, PirateNode } from './skill-tree/themes/Pirate';
import { CYBERPUNK_THEME, CyberpunkBackground, CyberpunkNode } from './skill-tree/themes/Cyberpunk';
import { NATURE_THEME, NatureBackground, NatureNode } from './skill-tree/themes/Nature';
import { BLUEPRINT_THEME, BlueprintBackground, BlueprintNode } from './skill-tree/themes/Blueprint';

// New Themes
import { RETRO_THEME, RetroBackground, RetroNode } from './skill-tree/themes/Retro';
import { STEAMPUNK_THEME, SteampunkBackground, SteampunkNode } from './skill-tree/themes/Steampunk';
import { INK_THEME, ZenInkBackground, ZenInkNode } from './skill-tree/themes/ZenInk';
import { HOLO_THEME, HolographicBackground, HolographicNode } from './skill-tree/themes/Holographic';
import { PAPER_THEME, PaperCraftBackground, PaperCraftNode } from './skill-tree/themes/PaperCraft';


interface SkillTreePageProps {
  onNavigate?: (page: PageView) => void;
}

const THEMES: Record<ThemeType, ThemeConfig> = {
  COSMIC: COSMIC_THEME,
  PIRATE: PIRATE_THEME,
  CYBERPUNK: CYBERPUNK_THEME,
  NATURE: NATURE_THEME,
  BLUEPRINT: BLUEPRINT_THEME,
  RETRO: RETRO_THEME,
  STEAMPUNK: STEAMPUNK_THEME,
  INK: INK_THEME,
  HOLO: HOLO_THEME,
  PAPER: PAPER_THEME
};

const BACKGROUND_COMPONENTS = {
  COSMIC: CosmicBackground,
  PIRATE: PirateBackground,
  CYBERPUNK: CyberpunkBackground,
  NATURE: NatureBackground,
  BLUEPRINT: BlueprintBackground,
  RETRO: RetroBackground,
  STEAMPUNK: SteampunkBackground,
  INK: ZenInkBackground,
  HOLO: HolographicBackground,
  PAPER: PaperCraftBackground
};

const NODE_COMPONENTS = {
  COSMIC: CosmicNode,
  PIRATE: PirateNode,
  CYBERPUNK: CyberpunkNode,
  NATURE: NatureNode,
  BLUEPRINT: BlueprintNode,
  RETRO: RetroNode,
  STEAMPUNK: SteampunkNode,
  INK: ZenInkNode,
  HOLO: HolographicNode,
  PAPER: PaperCraftNode
};

// Simple internal icon component for context
const Clock = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const SkillTreePage: React.FC<SkillTreePageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeType>('COSMIC');
  const [activeTreeId, setActiveTreeId] = useState<string>('fullstack');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  // Local state for trees to allow adding new ones dynamically
  const [localTreesData, setLocalTreesData] = useState<Record<string, { nodes: SkillNode[], links: SkillLink[] }>>(SKILL_TREES_DATA);
  const [availableTrees, setAvailableTrees] = useState<{ id: string; name: string }[]>(AVAILABLE_TREES);

  const [camera, setCamera] = useState<CameraState>({ x: -200, y: -100, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = THEMES[activeTheme];
  const BackgroundComponent = BACKGROUND_COMPONENTS[activeTheme];
  const NodeComponent = NODE_COMPONENTS[activeTheme];

  // Get current tree data
  const currentTreeData = localTreesData[activeTreeId] || localTreesData['fullstack'];
  const currentNodes = currentTreeData.nodes;
  const currentLinks = currentTreeData.links;

  const handleNewTree = (newTree: { id: string; name: string; nodes: SkillNode[]; links: SkillLink[] }) => {
    setLocalTreesData(prev => ({
      ...prev,
      [newTree.id]: { nodes: newTree.nodes, links: newTree.links }
    }));
    setAvailableTrees(prev => [...prev, { id: newTree.id, name: newTree.name }]);
    setActiveTreeId(newTree.id);
  };

  // --- INTERACTION HANDLERS ---

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.interactive-node')) return;
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    if(containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setCamera(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if(containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handleWheel = (e: React.WheelEvent) => {
    const scaleAmount = -e.deltaY * 0.001;
    const newZoom = Math.min(Math.max(camera.zoom + scaleAmount, 0.4), 2);
    setCamera(prev => ({ ...prev, zoom: newZoom }));
  };

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
  };

  const centerOnNode = (nodeId: string) => {
    const node = currentNodes.find(n => n.id === nodeId);
    if (node && containerRef.current) {
      const centerX = containerRef.current.clientWidth / 2;
      const centerY = containerRef.current.clientHeight / 2;
      setCamera({
        x: centerX - (node.x * camera.zoom),
        y: centerY - (node.y * camera.zoom),
        zoom: camera.zoom
      });
      setSelectedNode(node);
    }
  };

  // --- RENDER HELPERS ---

  const getPathData = (source: SkillNode, target: SkillNode) => {
    const sx = source.x + 40; 
    const sy = source.y + 40;
    const tx = target.x + 40;
    const ty = target.y + 40;

    if (theme.connectionStyle === 'circuit') {
        const midY = (sy + ty) / 2;
        return `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
    }

    if (theme.connectionStyle === 'hand-drawn') {
         const cx1 = sx + (tx - sx) / 3 + (Math.random() * 10 - 5);
         const cy1 = sy + (ty - sy) / 3 + (Math.random() * 10 - 5);
         const cx2 = sx + 2 * (tx - sx) / 3 + (Math.random() * 10 - 5);
         const cy2 = sy + 2 * (ty - sy) / 3 + (Math.random() * 10 - 5);
         return `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`;
    }
    
    if (theme.connectionStyle === 'straight') {
         return `M ${sx} ${sy} L ${tx} ${ty}`;
    }

    // Default Bezier
    const dist = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
    const curvature = Math.min(dist * 0.5, 150); 
    return `M ${sx} ${sy} C ${sx + curvature} ${sy}, ${tx - curvature} ${ty}, ${tx} ${ty}`;
  };

  return (
    <div className={`h-screen w-full relative overflow-hidden flex flex-col ${theme.bgWrapper} ${theme.font} transition-colors duration-700`}>
      
      {/* SVG Filters for Effects */}
      <svg className="absolute w-0 h-0">
        <filter id="paper-noise">
           <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
           <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="glow-cyber">
           <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
           <feMerge>
               <feMergeNode in="coloredBlur"/>
               <feMergeNode in="SourceGraphic"/>
           </feMerge>
        </filter>
      </svg>

      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
        
        .anim-orbit { animation: orbit-cw 10s linear infinite; }
        .anim-orbit-rev { animation: orbit-ccw 8s linear infinite; }
        .anim-scanline { animation: scanline 3s linear infinite; }
        .anim-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .anim-glitch { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
      `}</style>

      {/* --- BACKGROUND LAYER --- */}
      <BackgroundComponent camera={camera} />

      {/* --- HUD --- */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-30 flex items-center justify-between px-6 pt-6">
        
        {/* Search Bar */}
        <div className={`pointer-events-auto flex items-center gap-4 p-2.5 rounded-xl transition-all duration-500 ${theme.panelClass}`}>
          <div className="relative group w-64 md:w-80">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 opacity-70`} size={16} />
            <input 
              type="text" 
              placeholder="Buscar habilidad..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent border-b border-white/20 focus:border-white/60 rounded-none pl-10 pr-4 py-2 text-sm transition-all outline-none placeholder-current/50 font-inherit`}
            />
          </div>
          <div className="h-6 w-px bg-current opacity-20 mx-1"></div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:bg-white/5 cursor-pointer transition-all">
            <Target size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">{MOCK_GOAL.title}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="pointer-events-auto flex items-center gap-3">

          {/* SKILL TREE SELECTOR */}
          <SkillTreeSelector
            currentTreeId={activeTreeId}
            onSelectTree={setActiveTreeId}
            onNewTree={() => setShowGenerator(true)}
            trees={availableTrees}
            theme={theme}
          />

          {/* THEME SELECTOR */}
          <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-3 rounded-xl transition-all active:scale-95 shadow-lg border border-transparent ${theme.panelClass} ${theme.buttonClass}`}
              >
                <Palette size={20} />
              </button>
              
              {showThemeMenu && (
                  <div className={`absolute top-full right-0 mt-2 w-64 max-h-[80vh] overflow-y-auto rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 ${theme.panelClass} border-2 border-current shadow-2xl`}>
                      <div className="text-[10px] uppercase font-bold tracking-widest opacity-50 px-3 py-2 border-b border-current/20 mb-2">Estilos visuales</div>
                      <div className="space-y-1">
                        {Object.values(THEMES).map((t) => (
                            <button
                              key={t.id}
                              onClick={() => { setActiveTheme(t.id); setShowThemeMenu(false); }}
                              className={`w-full text-left px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${activeTheme === t.id ? 'bg-current text-black shadow-lg scale-105' : 'hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                              style={{ backgroundColor: activeTheme === t.id ? theme.accentColor : undefined, color: activeTheme === t.id ? 'black' : undefined }}
                            >
                               <t.icon size={18} /> 
                               <span>{t.label}</span>
                            </button>
                        ))}
                      </div>
                  </div>
              )}
          </div>

          <button className={`p-3 rounded-xl transition-all active:scale-95 shadow-lg ${theme.panelClass} ${theme.buttonClass}`}>
            <Filter size={20} />
          </button>
          
          <button 
            onClick={() => {
                // Find a node to center on, preferably the first one or a specific one
                const firstNode = currentNodes[0];
                if (firstNode) centerOnNode(firstNode.id);
            }}
            className={`flex items-center gap-2 px-6 py-3 font-bold border border-transparent rounded-xl transition-all active:scale-95 shadow-lg group ${theme.panelClass} ${theme.buttonClass}`}
          >
            <MousePointer2 size={18} className="group-hover:rotate-12 transition-transform" /> 
            <span className="hidden sm:inline tracking-wide">CENTRAR</span>
          </button>
        </div>
      </div>

      {/* --- CANVAS --- */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative overflow-hidden cursor-grab select-none z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          className="absolute origin-top-left transition-transform duration-75 ease-linear will-change-transform"
          style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }}
        >
          {/* SVG CONNECTIONS */}
          <svg className="overflow-visible absolute top-0 left-0 pointer-events-none w-1 h-1">
            <defs>
              <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={theme.lineBaseColor} stopOpacity="0.1" /> 
                <stop offset="50%" stopColor={theme.accentColor} stopOpacity="1" /> 
                <stop offset="100%" stopColor={theme.lineBaseColor} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {currentLinks.map((link, i) => {
              const source = currentNodes.find(n => n.id === link.source);
              const target = currentNodes.find(n => n.id === link.target);
              if (!source || !target) return null;
              
              const isFlowing = target.status === NodeStatus.IN_PROGRESS;

              return (
                <g key={i}>
                   {/* Base Path */}
                   <path 
                      d={getPathData(source, target)}
                      stroke={theme.lineBaseColor}
                      strokeWidth={activeTheme === 'BLUEPRINT' ? 1 : 3}
                      strokeOpacity={activeTheme === 'COSMIC' ? 0.3 : 0.6}
                      strokeDasharray={activeTheme === 'PIRATE' || activeTheme === 'BLUEPRINT' ? "6,4" : "none"}
                      fill="none"
                      filter={activeTheme === 'CYBERPUNK' ? "url(#glow-cyber)" : undefined}
                   />
                   {/* Flow Animation */}
                   {isFlowing && (
                      <path 
                        d={getPathData(source, target)}
                        stroke={activeTheme === 'CYBERPUNK' ? theme.accentColor : theme.lineActiveColor}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={activeTheme === 'PIRATE' ? "10,10" : "20,20"}
                        className="data-flow"
                        style={{ animation: `flow 1s linear infinite` }}
                      />
                   )}
                </g>
              );
            })}
          </svg>

          {/* NODES */}
          {currentNodes.map(node => {
            const status = node.status;
            return (
                <div
                    key={node.id}
                    onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
                    className={`interactive-node absolute group z-10 transition-transform duration-300 ${status === 'IN_PROGRESS' ? 'scale-110' : 'hover:scale-105'}`}
                    style={{ left: node.x, top: node.y }}
                >
                    {/* Tooltip */}
                    <div className={`absolute -top-14 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 rounded-md border border-white/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-xs font-bold uppercase tracking-wider ${theme.panelClass}`}>
                        {node.title}
                    </div>

                    <div className="w-20 h-20 flex items-center justify-center relative">
                        <NodeComponent node={node} activeTheme={activeTheme} />
                    </div>
                </div>
            );
          })}
        </div>
      </div>

      {/* --- DETAIL PANEL --- */}
      <div 
        className={`absolute top-24 right-6 bottom-6 w-full max-w-sm rounded-2xl transform transition-all duration-500 ease-out z-30 flex flex-col ${selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'} ${theme.panelClass}`}
      >
        {selectedNode ? (
          <>
            <div className="p-6 border-b border-white/10 relative overflow-hidden shrink-0">
               {/* Decorative Background Icon */}
               <div className="absolute -right-6 -top-6 opacity-10 rotate-12">
                   {activeTheme === 'PIRATE' ? <Anchor size={140} /> : <Cpu size={140} />}
               </div>
               
               <div className="relative z-10">
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 border border-current opacity-70`}>
                      {selectedNode.category}
                  </div>
                  <h2 className="text-2xl font-black leading-tight mb-1">{selectedNode.title}</h2>
                  <div className="flex items-center gap-4 text-xs font-mono opacity-80">
                      <span className="flex items-center gap-1"><Target size={12}/> NVL.{selectedNode.level}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {selectedNode.estimatedTime}</span>
                  </div>
               </div>
               <button onClick={() => setSelectedNode(null)} className="absolute top-4 right-4 p-2 opacity-60 hover:opacity-100 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <p className="text-sm leading-relaxed opacity-90 font-medium">
                  {selectedNode.description}
               </p>

               {/* Progress Bar */}
               {(selectedNode.status === 'IN_PROGRESS' || selectedNode.status === 'COMPLETED') && (
                   <div className="bg-black/10 p-4 rounded-xl border border-current border-opacity-10">
                       <div className="flex justify-between text-xs font-bold uppercase mb-2 opacity-70">
                           <span>Sincronización Neural</span>
                           <span>{selectedNode.status === 'COMPLETED' ? '100%' : '35%'}</span>
                       </div>
                       <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                           <div 
                             className="h-full transition-all duration-1000" 
                             style={{ 
                                 width: selectedNode.status === 'COMPLETED' ? '100%' : '35%',
                                 backgroundColor: theme.accentColor 
                             }}
                           ></div>
                       </div>
                   </div>
               )}

               {/* Action Button */}
               <button 
                  onClick={() => onNavigate && onNavigate('DOJO')}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${theme.buttonClass} bg-current bg-opacity-10`}
               >
                  {selectedNode.status === 'COMPLETED' ? <CheckCircle2 size={18}/> : <Play size={18} fill="currentColor"/>}
                  <span>{selectedNode.status === 'COMPLETED' ? 'REPASAR NODO' : 'ENTRAR AL DOJO'}</span>
               </button>
               
               {/* Prerequisites */}
               <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 border-b border-current border-opacity-20 pb-1">Dependencias</h4>
                  <div className="space-y-2">
                     <div className="flex items-center gap-3 p-2 rounded-lg bg-black/5 border border-black/5">
                        <CheckCircle2 size={14} className="text-green-500"/>
                        <span className="text-xs font-bold opacity-80">Intro a la Programación</span>
                     </div>
                  </div>
               </div>
            </div>
          </>
        ) : null}
      </div>

      {/* --- MINI MAP & ZOOM --- */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-4 z-20 pointer-events-none">
          <div className={`pointer-events-auto p-2 rounded-xl flex flex-col gap-1 shadow-lg ${theme.panelClass}`}>
             <button onClick={() => setCamera(prev => ({ ...prev, zoom: Math.min(prev.zoom + 0.2, 2) }))} className={`p-2 rounded-lg transition-colors ${theme.buttonClass}`}><Plus size={20}/></button>
             <button onClick={() => setCamera(prev => ({ ...prev, zoom: Math.max(prev.zoom - 0.2, 0.4) }))} className={`p-2 rounded-lg transition-colors ${theme.buttonClass}`}><Minus size={20}/></button>
          </div>
          
          <div className={`pointer-events-auto w-48 h-32 rounded-xl p-3 relative overflow-hidden shadow-lg group border-2 border-transparent hover:border-current transition-colors ${theme.panelClass}`}>
             <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 flex items-center gap-1">
                 <MapIcon size={10} /> Radar
             </div>
             <div className="w-full h-full relative" style={{ transform: 'scale(0.12)', transformOrigin: 'top left' }}>
                 {currentNodes.map(n => (
                     <div key={n.id} className={`absolute w-24 h-24 rounded-full ${n.status === 'COMPLETED' ? 'bg-green-500' : 'bg-gray-500'}`} style={{ left: n.x, top: n.y }}></div>
                 ))}
             </div>
          </div>
      </div>

      {showGenerator && (
        <SkillTreeGenerator
            onClose={() => setShowGenerator(false)}
            onGenerate={handleNewTree}
        />
      )}

    </div>
  );
};

export default SkillTreePage;
