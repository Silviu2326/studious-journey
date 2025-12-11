import React from 'react';
import { Cog, Gauge, Flame, Hammer } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const STEAMPUNK_THEME: ThemeConfig = {
    id: 'STEAMPUNK',
    label: 'Clockwork Engine',
    icon: Cog,
    bgWrapper: 'bg-[#19100a]', // Soot / Dark Leather
    panelClass: 'bg-[#2b1d16]/95 border-4 border-[#b8860b] shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-[#e5e5e5] font-serif',
    buttonClass: 'hover:bg-[#b8860b] hover:text-[#2b1d16] border-2 border-[#b8860b] text-[#b8860b] transition-all rounded-sm uppercase font-bold tracking-[0.2em] shadow-[2px_2px_0px_#5c4033]',
    textPrimary: 'text-[#deb887]', // Antique Gold
    textSecondary: 'text-[#a67c52]', // Bronze
    accentColor: '#d4af37',
    lineBaseColor: '#5c4033', // Rusted Iron
    lineActiveColor: '#ff8c00', // Furnace Glow
    nodeShape: 'circle',
    connectionStyle: 'straight',
    font: 'font-serif'
};

const Gear = ({ size, top, left, speed, teeth, color = '#8b4513' }: any) => (
    <div 
        className="absolute flex items-center justify-center"
        style={{ 
            top, left, width: size, height: size,
            animation: `spin ${speed} linear infinite`,
            color: color,
            opacity: 0.4
        }}
    >
        <Cog size={size} strokeWidth={1} />
        <div className="absolute w-1/2 h-1/2 border-2 border-current rounded-full"></div>
    </div>
);

const SteamPuff = ({ left, duration, delay }: any) => (
    <div 
        className="absolute bottom-[-50px] w-32 h-32 bg-gray-400 rounded-full blur-[40px] opacity-20"
        style={{
            left,
            animation: `rise ${duration} ease-in-out infinite ${delay}`
        }}
    />
);

export const SteampunkBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#19100a] pointer-events-none overflow-hidden">
             
             {/* 1. Rust & Grime Texture */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] mix-blend-overlay"></div>

             {/* 2. Mechanical Layers */}
             <div style={{ transform: `translate(${camera.x * 0.1}px, ${camera.y * 0.1}px)` }}>
                 {/* Background Gears */}
                 <Gear size={400} top="-10%" left="-10%" speed="60s" color="#5c4033" />
                 <Gear size={300} top="60%" left="80%" speed="40s" color="#8b4513" />
                 <Gear size={600} top="20%" left="30%" speed="120s" color="#3e2723" />
                 
                 {/* Foreground Pipes (Abstracted lines) */}
                 <div className="absolute top-[30%] left-0 w-full h-4 bg-gradient-to-b from-[#8b4513] to-[#3e2723] opacity-50 border-y border-[#5c4033]"></div>
                 <div className="absolute top-0 left-[20%] w-4 h-full bg-gradient-to-r from-[#8b4513] to-[#3e2723] opacity-50 border-x border-[#5c4033]"></div>
             </div>

             {/* 3. Steam Fog */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <SteamPuff left="10%" duration="8s" delay="0s" />
                 <SteamPuff left="40%" duration="12s" delay="2s" />
                 <SteamPuff left="70%" duration="10s" delay="5s" />
             </div>

             {/* 4. Vignette (Old Photo Look) */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_120%)] opacity-80"></div>
        </div>
    );
};

export const SteampunkNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Piston Ring (Moving In/Out) */}
                <div className="absolute inset-0 border-4 border-[#b8860b] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
                
                {/* Rotating Cog Border */}
                <div className="absolute inset-1 border-2 border-dashed border-[#ff8c00] rounded-full animate-[spin_10s_linear_infinite]"></div>

                {/* Furnace Core */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#b8860b] via-[#8b4513] to-[#3e2723] border-4 border-[#5c4033] shadow-[0_0_30px_rgba(255,140,0,0.4)] flex items-center justify-center overflow-hidden">
                    
                    {/* Fire Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff4500] to-transparent opacity-50 animate-pulse"></div>
                    
                    <div className="relative text-[#ffecd2] drop-shadow-md z-20 animate-[pulse_1s_ease-in-out_infinite]">
                        {getNodeIcon(node, 'STEAMPUNK')}
                    </div>

                    {/* Glass Reflection */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-full pointer-events-none"></div>
                </div>

                {/* Pressure Valve */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8b4513] w-4 h-6 rounded-t-lg border border-[#5c4033]"></div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-2 bg-white/50 blur-md animate-[pulse_0.5s_infinite]"></div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform duration-300">
                 {/* Gold Gear Body */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700] to-[#b8860b] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 border-[#8b4513]"></div>
                 
                 {/* Teeth */}
                 <div className="absolute -inset-1 border-[6px] border-dashed border-[#b8860b] rounded-full opacity-50"></div>

                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[#3e2723] drop-shadow-sm">
                    {getNodeIcon(node, 'STEAMPUNK')}
                 </div>

                 {/* Screws */}
                 <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#3e2723] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"></div>
                 <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#3e2723] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"></div>
            </div>
        );
    }

    // LOCKED (Iron Plate)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-[#2b1d16] rounded-full border-4 border-[#3e2723] shadow-inner"></div>
            
            {/* Rust Spots */}
            <div className="absolute top-2 right-3 w-3 h-3 bg-[#5c4033] rounded-full opacity-50 blur-[1px]"></div>

            <div className="relative text-[#5c4033]">
                {getNodeIcon(node, 'STEAMPUNK')}
            </div>
        </div>
    );
};
