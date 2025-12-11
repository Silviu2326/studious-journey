import React from 'react';
import { Cpu, Dna, Activity, Lock, Zap } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const CYBERPUNK_THEME: ThemeConfig = {
    id: 'CYBERPUNK',
    label: 'Bio-Synth v9',
    icon: Dna,
    bgWrapper: 'bg-[#05010a]', // Deep Void Purple
    panelClass: 'bg-[#0f0518]/90 backdrop-blur-md border border-[#d946ef]/30 shadow-[0_0_30px_rgba(217,70,239,0.15)] text-[#e879f9]',
    buttonClass: 'hover:bg-[#d946ef]/20 hover:text-[#f0abfc] transition-all rounded-2xl border border-[#d946ef]/50 text-[#d946ef] font-bold tracking-wider',
    textPrimary: 'text-[#f0abfc]', // Light Pink
    textSecondary: 'text-[#22d3ee]', // Cyan details
    accentColor: '#d946ef', // Neon Magenta
    lineBaseColor: '#2e1065', // Dark Violet
    lineActiveColor: '#bef264', // Acid Green (Data Flow)
    nodeShape: 'organic', // Soft tech
    connectionStyle: 'circuit',
    font: 'font-sans'
};

const NeuralMesh = ({ camera }: { camera: { x: number, y: number } }) => (
    <div 
        className="absolute inset-[-100%] w-[300%] h-[300%] opacity-20 pointer-events-none" 
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23d946ef' /%3E%3Cpath d='M50 50 L80 80 M50 50 L20 80 M50 50 L50 20' stroke='%23d946ef' stroke-width='0.5' opacity='0.5' /%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            transform: `translate(${camera.x * 0.2}px, ${camera.y * 0.2}px) rotate(15deg)`
        }}
    />
);

const FloatingParticles = ({ camera }: { camera: { x: number, y: number } }) => (
    <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(circle, #bef264 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: `translate(${camera.x * 0.1}px, ${camera.y * 0.1}px)`
        }}
    />
);

export const CyberpunkBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#020005] pointer-events-none overflow-hidden">
             
             {/* 1. Fluid Gradient Blob Background */}
             <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#d946ef]/10 rounded-full blur-[150px] animate-pulse-slow"></div>
             <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#22d3ee]/5 rounded-full blur-[150px] animate-pulse-slow"></div>

             {/* 2. Neural/Data Mesh */}
             <NeuralMesh camera={camera} />

             {/* 3. Acid Rain / Particles */}
             <FloatingParticles camera={camera} />

             {/* 4. Bio-Scanline (Organic Curve) */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
             
             {/* Vignette */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020005_100%)]"></div>
        </div>
    );
};

export const CyberpunkNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;
    
    // "Squircle" shape for Bio-Tech look
    const bioShape = { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' };
    const capsuleShape = { borderRadius: '20px' };

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-20 h-20 flex items-center justify-center">
                
                {/* 1. Pulsing Biological Aura */}
                <div className="absolute inset-0 bg-[#d946ef]/20 rounded-full blur-xl animate-pulse"></div>
                
                {/* 2. Spinning Data Rings */}
                <div className="absolute inset-[-4px] border border-[#bef264]/30 rounded-full animate-[spin_8s_linear_infinite] border-dashed"></div>
                <div className="absolute inset-0 border border-[#22d3ee]/30 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>

                {/* 3. The Core Cell */}
                <div 
                    className="relative z-10 w-14 h-14 bg-[#1a0b2e] flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.4)] overflow-hidden"
                    style={capsuleShape}
                >
                    {/* Living Fluid Background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d946ef]/40 to-transparent animate-pulse"></div>
                    
                    {/* Scan Effect */}
                    <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-[#bef264]/20 to-transparent animate-[scanline_2s_linear_infinite]"></div>

                    {/* Icon */}
                    <div className="text-[#f0abfc] z-20 drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
                        {getNodeIcon(node, 'CYBERPUNK')}
                    </div>
                </div>

                {/* 4. Status Tag */}
                <div className="absolute -bottom-3 bg-[#bef264] text-black text-[9px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(190,242,100,0.6)] animate-bounce">
                    MUTATING
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform duration-300">
                {/* Stable Glow */}
                <div className="absolute inset-0 bg-[#22d3ee]/20 blur-md transition-opacity rounded-2xl"></div>
                
                {/* Implant Body */}
                <div className="relative w-full h-full bg-[#0f172a] flex items-center justify-center border border-[#22d3ee]/50 rounded-2xl overflow-hidden">
                    {/* Inner Tech Grid */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] bg-[size:8px_8px]"></div>
                    
                    {/* Icon */}
                    <div className="text-[#22d3ee] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10">
                        {getNodeIcon(node, 'CYBERPUNK')}
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#22d3ee] rounded-tl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#22d3ee] rounded-br-lg"></div>
                </div>
            </div>
        );
    }

    // LOCKED (Dormant Tissue)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="absolute inset-0 bg-[#1e1b4b] rounded-2xl border border-[#312e81]"></div>
            
            <div className="relative flex flex-col items-center gap-1">
                <Lock size={14} className="text-[#6366f1]" />
            </div>
        </div>
    );
};
