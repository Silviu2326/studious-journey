import React from 'react';
import { Layers, Scissors, Sun, Cloud, MapPin } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const PAPER_THEME: ThemeConfig = {
    id: 'PAPER',
    label: 'Papercut Kingdom',
    icon: Scissors,
    bgWrapper: 'bg-[#fdfbf7]', // Cream/Off-white paper base
    panelClass: 'bg-white/80 backdrop-blur-md border-2 border-[#e2e8f0] shadow-[8px_8px_0px_rgba(203,213,225,0.5)] text-[#475569] rounded-2xl font-sans',
    buttonClass: 'hover:bg-[#f1f5f9] hover:text-[#334155] text-[#64748b] font-bold transition-all rounded-xl shadow-[4px_4px_0px_#cbd5e1] border-2 border-[#cbd5e1] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    textPrimary: 'text-[#334155]',
    textSecondary: 'text-[#94a3b8]',
    accentColor: '#f472b6', // Pastel Pink
    lineBaseColor: '#cbd5e1', // Pencil Gray
    lineActiveColor: '#f472b6', // Pink Thread
    nodeShape: 'circle',
    connectionStyle: 'hand-drawn', // Dashed "cut" lines
    font: 'font-sans'
};

const TornLayer = ({ bottom, color, speed, depth, seed }: { bottom: string, color: string, speed: string, depth: number, seed: number }) => (
    <div 
        className="absolute left-[-10%] w-[120%] h-[300px] transition-transform pointer-events-none"
        style={{
            bottom: bottom,
            filter: 'drop-shadow(0px -4px 6px rgba(0,0,0,0.1))',
            animation: `sway ${speed} ease-in-out infinite alternate`,
            zIndex: depth
        }}
    >
        <div 
            className="w-full h-full"
            style={{
                backgroundColor: color,
                clipPath: `polygon(
                    0% 100%, 100% 100%, 100% 20%, 
                    90% ${25 + Math.sin(seed)*5}%, 80% ${15 + Math.cos(seed)*5}%, 
                    70% ${20 + Math.sin(seed+1)*5}%, 60% ${10 + Math.cos(seed+1)*5}%, 
                    50% ${25 + Math.sin(seed+2)*5}%, 40% ${15 + Math.cos(seed+2)*5}%, 
                    30% ${20 + Math.sin(seed+3)*5}%, 20% ${10 + Math.cos(seed+3)*5}%, 
                    10% ${25 + Math.sin(seed+4)*5}%, 0% 20%
                )`
            }}
        ></div>
    </div>
);

const PaperSun = ({ camera }: { camera: { x: number, y: number } }) => (
    <div 
        className="absolute top-[10%] right-[10%] w-32 h-32 pointer-events-none"
        style={{ transform: `translate(${camera.x * 0.02}px, ${camera.y * 0.02}px)` }}
    >
        <div className="absolute inset-0 bg-[#fcd34d] rounded-full shadow-lg animate-[spin_20s_linear_infinite]">
            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <div 
                    key={deg} 
                    className="absolute top-1/2 left-1/2 w-40 h-4 bg-[#fcd34d] -translate-x-1/2 -translate-y-1/2 rounded-full -z-10"
                    style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                />
            ))}
        </div>
        <div className="absolute inset-4 bg-[#fbbf24] rounded-full shadow-inner flex items-center justify-center">
            <Sun className="text-[#fffbeb] w-12 h-12 animate-pulse" />
        </div>
    </div>
);

export const PaperCraftBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#fdfbf7] pointer-events-none overflow-hidden">
             
             {/* Texture: Watercolor Paper */}
             <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

             {/* Sky Elements */}
             <PaperSun camera={camera} />
             
             <div style={{ transform: `translate(${camera.x * 0.05}px, ${camera.y * 0.05}px)` }}>
                 <Cloud className="absolute top-[20%] left-[20%] text-white fill-white drop-shadow-md opacity-80 w-24 h-24 animate-[float_8s_ease-in-out_infinite]" />
                 <Cloud className="absolute top-[35%] left-[60%] text-white fill-white drop-shadow-md opacity-60 w-16 h-16 animate-[float_12s_ease-in-out_infinite]" />
             </div>

             {/* Parallax Paper Hills */}
             <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateX(${camera.x * 0.1}px)` }}>
                 <TornLayer bottom="-50px" color="#c4b5fd" speed="8s" depth={1} seed={1} />
                 <TornLayer bottom="-100px" color="#a78bfa" speed="7s" depth={2} seed={2} />
                 <TornLayer bottom="-150px" color="#8b5cf6" speed="6s" depth={3} seed={3} />
                 <TornLayer bottom="-200px" color="#7c3aed" speed="5s" depth={4} seed={4} />
             </div>
        </div>
    );
};

export const PaperCraftNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Stick Stem */}
                <div className="absolute bottom-0 w-1 h-12 bg-[#cbd5e1] rounded-full"></div>

                {/* Pinwheel Head */}
                <div className="relative w-16 h-16 animate-[spin_3s_linear_infinite] drop-shadow-md">
                    {/* Blades */}
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#f472b6] rounded-tl-xl rounded-br-sm origin-bottom-right"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#22d3ee] rounded-tr-xl rounded-bl-sm origin-bottom-left"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#fbbf24] rounded-br-xl rounded-tl-sm origin-top-left"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#a78bfa] rounded-bl-xl rounded-tr-sm origin-top-right"></div>
                    
                    {/* Pin */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-[#cbd5e1] z-10"></div>
                </div>

                {/* Icon Overlay (Floating) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/80 p-1 rounded-full backdrop-blur-[1px] shadow-sm">
                    <div className="text-[#475569] scale-75">
                        {getNodeIcon(node, 'PAPER')}
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-110 transition-transform duration-300">
                 {/* 3D Pop-up Card Base */}
                 <div className="absolute inset-0 bg-white rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)] border-2 border-[#e2e8f0] transform rotate-3 group-hover:rotate-0 transition-transform"></div>
                 
                 {/* Inner Layer */}
                 <div className="absolute inset-1 bg-[#ecfccb] rounded-lg border border-[#d9f99d]"></div>

                 {/* Icon popping out */}
                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[#65a30d] drop-shadow-sm transform -translate-y-1 group-hover:-translate-y-2 transition-transform">
                    {getNodeIcon(node, 'PAPER')}
                 </div>

                 {/* Tape Decor */}
                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-[#f472b6]/50 -rotate-2"></div>
            </div>
        );
    }

    // LOCKED (Sketch)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-60">
            <div className="absolute inset-0 border-2 border-dashed border-[#94a3b8] rounded-full bg-white/30"></div>
            <div className="text-[#94a3b8] grayscale">
                {getNodeIcon(node, 'PAPER')}
            </div>
        </div>
    );
};
