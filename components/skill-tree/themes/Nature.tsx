import React from 'react';
import { Leaf, Sun, Wind, Cloud, Zap } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const NATURE_THEME: ThemeConfig = {
    id: 'NATURE',
    label: 'Solarpunk Haven',
    icon: Sun,
    bgWrapper: 'bg-[#f0fdfa]', // Very light Cyan/Green mix
    panelClass: 'bg-white/80 backdrop-blur-xl border border-[#2dd4bf]/20 shadow-[0_10px_40px_rgba(13,148,136,0.15)] text-[#115e59]',
    buttonClass: 'hover:bg-[#ccfbf1] hover:text-[#0f766e] border border-transparent hover:border-[#2dd4bf]/30 transition-all rounded-2xl font-bold tracking-tight shadow-sm',
    textPrimary: 'text-[#134e4a]',
    textSecondary: 'text-[#0d9488]',
    accentColor: '#f59e0b', // Solar Gold
    lineBaseColor: '#99f6e4', // Light Teal
    lineActiveColor: '#f59e0b', // Gold Energy
    nodeShape: 'circle',
    connectionStyle: 'circuit',
    font: 'font-sans'
};

const WindLine = ({ top, delay, duration }: { top: string, delay: string, duration: string }) => (
    <div 
        className="absolute h-[1px] bg-white/60 w-32 rounded-full animate-[wind_3s_linear_infinite]"
        style={{ 
            top: top, 
            left: '-10%',
            animationDelay: delay,
            animationDuration: duration
        }}
    />
);

const Turbine = ({ x, y, size, speed }: { x: string, y: string, size: number, speed: string }) => (
    <div 
        className="absolute opacity-10 text-[#115e59]"
        style={{ top: y, left: x, animation: `spin ${speed} linear infinite` }}
    >
        <Wind size={size} />
    </div>
);

export const NatureBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#f0fdfa] pointer-events-none overflow-hidden">
             
             {/* 1. Sky Gradient */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] via-[#f0fdfa] to-[#dcfce7]"></div>

             {/* 2. Hexagonal Bio-Structure Overlay */}
             <div 
                className="absolute inset-[-50%] w-[200%] h-[200%] opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 35L20 70L0 35Z' fill='none' stroke='%230f766e' stroke-width='1'/%3E%3C/svg%3E")`,
                    transform: `translate(${camera.x * 0.1}px, ${camera.y * 0.1}px)`
                }}
             />

             {/* 3. Distant Turbines / Floating Tech */}
             <div style={{ transform: `translate(${camera.x * 0.05}px, ${camera.y * 0.05}px)` }}>
                 <Turbine x="20%" y="20%" size={120} speed="20s" />
                 <Turbine x="80%" y="60%" size={180} speed="25s" />
                 <Turbine x="10%" y="80%" size={80} speed="15s" />
             </div>

             {/* 4. Wind Lines */}
             <div className="absolute inset-0 overflow-hidden">
                 <WindLine top="15%" delay="0s" duration="4s" />
                 <WindLine top="45%" delay="2s" duration="6s" />
                 <WindLine top="75%" delay="1s" duration="5s" />
                 <WindLine top="30%" delay="3s" duration="7s" />
             </div>

             {/* 5. Sun Glare */}
             <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#fef3c7] rounded-full blur-[100px] opacity-60"></div>
        </div>
    );
};

export const NatureNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Solar Dynamo Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#f59e0b]/40 border-t-[#f59e0b] animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border-2 border-[#2dd4bf]/40 border-b-[#2dd4bf] animate-[spin_5s_linear_infinite_reverse]"></div>
                
                {/* Core Energy */}
                <div className="absolute inset-0 bg-[#f59e0b]/10 blur-xl animate-pulse"></div>
                
                {/* Main Body */}
                <div className="relative z-10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-[#f59e0b]/50">
                    <div className="text-[#d97706] animate-[pulse_2s_ease-in-out_infinite]">
                        {getNodeIcon(node, 'NATURE')}
                    </div>
                </div>

                {/* Floating Orbitals */}
                <div className="absolute top-0 w-2 h-2 bg-[#f59e0b] rounded-full animate-[orbit-cw_3s_linear_infinite]" style={{ transformOrigin: '40px 40px' }}></div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform duration-300">
                {/* Glass Biosphere Shadow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-10 h-2 bg-[#0f766e]/20 blur-sm rounded-full"></div>

                {/* Glass Sphere Body */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/80 to-[#ccfbf1]/50 backdrop-blur-sm border border-white flex items-center justify-center shadow-lg overflow-hidden">
                    
                    {/* Reflection */}
                    <div className="absolute top-2 left-3 w-6 h-3 bg-white/60 rounded-full blur-[2px]"></div>
                    
                    {/* Inner Plant/Tech */}
                    <div className="relative z-10 text-[#0d9488] drop-shadow-sm">
                        {getNodeIcon(node, 'NATURE')}
                    </div>
                    
                    {/* Bottom Greenery */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#2dd4bf]/20 rounded-b-full"></div>
                </div>
                
                {/* Checkmark Badge */}
                <div className="absolute -top-1 -right-1 bg-[#f59e0b] text-white rounded-full p-0.5 shadow-sm border border-white">
                    <Zap size={10} fill="currentColor" />
                </div>
            </div>
        );
    }

    // LOCKED (Seed Pod)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-[#e2e8f0] rounded-full border border-[#cbd5e1] shadow-inner"></div>
            
            <div className="relative text-[#94a3b8]">
                {getNodeIcon(node, 'NATURE')}
            </div>
        </div>
    );
};