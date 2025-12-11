import React from 'react';
import { Sparkles, Zap, Globe } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const COSMIC_THEME: ThemeConfig = {
    id: 'COSMIC',
    label: 'Nebula Prime',
    icon: Globe,
    bgWrapper: 'bg-[#020617]', // Slate-950 (Deep Space)
    panelClass: 'bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_50px_-12px_rgba(56,189,248,0.25)] text-slate-100',
    buttonClass: 'hover:bg-cyan-500/10 active:bg-cyan-500/20 text-cyan-300 border border-transparent hover:border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]',
    textPrimary: 'text-white',
    textSecondary: 'text-cyan-200',
    accentColor: '#38bdf8', // Sky-400
    lineBaseColor: '#1e293b', // Slate-800
    lineActiveColor: '#818cf8', // Indigo-400
    nodeShape: 'circle',
    connectionStyle: 'bezier',
    font: 'font-sans'
};

const StarField = ({ camera, density, speed }: { camera: {x:number, y:number}, density: number, speed: number }) => (
    <div 
        className="absolute inset-0 pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(1.5px 1.5px at center, white, transparent)',
            backgroundSize: `${density}px ${density}px`,
            opacity: 0.5,
            transform: `translate(${camera.x * speed}px, ${camera.y * speed}px)`
        }}
    />
);

export const CosmicBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#020617]">
        
        {/* Deep Background - The Void */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black"></div>

        {/* Cinematic Nebulas */}
        <div 
            className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] opacity-30 mix-blend-screen blur-[100px] animate-pulse-slow"
            style={{ 
                background: 'conic-gradient(from 90deg at 50% 50%, #000000 0%, #1e1b4b 25%, #4c1d95 50%, #1e1b4b 75%, #000000 100%)',
                transform: `translate(${camera.x * 0.01}px, ${camera.y * 0.01}px) rotate(${camera.x * 0.02}deg)` 
            }}
        />
        
        {/* Accent Glows (Quasars) */}
        <div 
            className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"
            style={{ transform: `translate(${camera.x * 0.03}px, ${camera.y * 0.03}px)` }}
        />
        <div 
            className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"
            style={{ transform: `translate(${camera.x * 0.02}px, ${camera.y * 0.02}px)` }}
        />

        {/* Parallax Stars */}
        <StarField camera={camera} density={300} speed={0.05} />
        <StarField camera={camera} density={150} speed={0.10} />
        
        {/* Digital Grid Overlay - Horizon */}
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                transform: `perspective(1000px) rotateX(20deg) translate(${camera.x}px, ${camera.y}px)`,
                transformOrigin: 'center 120%',
                maskImage: 'linear-gradient(to bottom, transparent, black)'
            }}
        />
      </div>
    );
};

export const CosmicNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    // --- RENDER LOGIC ---

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-cyan-400/30 rounded-full w-full h-full animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-2 border border-purple-400/30 rounded-full w-[80%] h-[80%] left-[10%] top-[10%] animate-[spin_6s_linear_infinite_reverse]"></div>
                
                {/* Energy Field */}
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
                
                {/* Core Reactor */}
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-slate-950 border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] z-10 overflow-hidden">
                    {/* Inner Plasma */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/50 via-transparent to-transparent opacity-50"></div>
                    <div className="relative text-cyan-200 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] z-20">
                        {getNodeIcon(node, 'COSMIC')}
                    </div>
                    {/* Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-[20%] w-full animate-[scanline_2s_linear_infinite]"></div>
                </div>

                {/* Satellite */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[orbit-cw_4s_linear_infinite] origin-[0_40px]"></div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center group">
                 {/* Atmosphere Glow */}
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                 
                 {/* Planet Body */}
                 <div className="relative w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-emerald-500/50 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]">
                     {/* Surface Gradient */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]"></div>
                     <div className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform duration-300">
                        {getNodeIcon(node, 'COSMIC')}
                     </div>
                 </div>
                 
                 {/* Checkmark Badge */}
                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-black text-[10px] font-bold shadow-lg border border-slate-900">
                    ✓
                 </div>
            </div>
        );
    }

    if (status === 'AVAILABLE') {
        return (
            <div className="relative w-14 h-14 flex items-center justify-center group cursor-pointer">
                {/* Hologram Ring */}
                <div className="absolute inset-0 border border-dashed border-cyan-700 rounded-full animate-[spin_20s_linear_infinite] opacity-50 group-hover:opacity-100 group-hover:border-cyan-400 transition-all"></div>
                
                <div className="relative w-10 h-10 rounded-full bg-slate-900/80 flex items-center justify-center border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                     <div className="text-slate-500 group-hover:text-cyan-300 transition-colors">
                        {getNodeIcon(node, 'COSMIC')}
                     </div>
                </div>
            </div>
        );
    }

    // LOCKED (Void Node)
    return (
        <div className="relative w-12 h-12 flex items-center justify-center opacity-40 grayscale">
            <div className="absolute inset-0 bg-slate-950 rounded-full border border-slate-800"></div>
            <div className="relative text-slate-700">
                {getNodeIcon(node, 'COSMIC')}
            </div>
        </div>
    );
};
