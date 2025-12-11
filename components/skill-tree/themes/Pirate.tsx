import React from 'react';
import { Anchor, Compass, Scroll, Ship, MapPin, Gem, Flame } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const PIRATE_THEME: ThemeConfig = {
    id: 'PIRATE',
    label: 'Capitán de Navío',
    icon: Ship,
    bgWrapper: 'bg-[#1a120b]', // Dark Oak wood behind the map
    panelClass: 'bg-[#f3e5c9] border-4 border-[#5d4037] shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-[#4e342e] sepia-[0.1]',
    buttonClass: 'hover:bg-[#5d4037]/10 active:bg-[#5d4037]/20 text-[#3e2723] font-serif font-bold tracking-widest border border-[#8d6e63]/30',
    textPrimary: 'text-[#3e2723]',
    textSecondary: 'text-[#5d4037]',
    accentColor: '#b91c1c', // Crimson
    lineBaseColor: '#5d4037', // Ink Brown
    lineActiveColor: '#b91c1c', // Blood Red Trail
    nodeShape: 'coin',
    connectionStyle: 'hand-drawn',
    font: 'font-serif'
};

const RhumbLine = ({ angle, x, y }: { angle: number, x: number, y: number }) => (
    <div 
        className="absolute h-[200vh] w-[1px] bg-[#5d4037]/10 pointer-events-none origin-top"
        style={{ 
            top: y, left: x,
            transform: `rotate(${angle}deg)`
        }}
    />
);

export const PirateBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#e6d5b8]">
         
         {/* --- PAPER TEXTURE & AGE --- */}
         <div className="absolute inset-0 opacity-100 mix-blend-multiply" style={{
             filter: 'url(#paper-noise)',
             background: 'linear-gradient(to bottom, #d7c2a0, #c0a080)'
         }}></div>
         
         {/* Stains & Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(62,39,35,0.4)_100%)]"></div>
         
         {/* --- ANIMATED ATMOSPHERE (Shadows of sails/clouds passing) --- */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-pulse-slow mix-blend-overlay"></div>
         <div 
            className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-black/10 to-transparent rotate-12 animate-[pulse_8s_ease-in-out_infinite]"
            style={{ transform: `translate(${camera.x * 0.05}px, ${camera.y * 0.05}px)` }}
         ></div>

         {/* --- NAVIGATION LINES (Rhumb Lines) --- */}
         <div className="absolute inset-0 overflow-hidden" style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
             {/* Center Rose */}
             <div className="absolute top-[20%] left-[20%] opacity-20">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <RhumbLine key={deg} angle={deg} x={0} y={0} />
                ))}
                <Compass size={120} className="text-[#5d4037] -translate-x-1/2 -translate-y-1/2" />
             </div>
             {/* Secondary Rose */}
             <div className="absolute top-[80%] right-[10%] opacity-10">
                {[0, 90, 180, 270].map(deg => (
                    <RhumbLine key={deg} angle={deg} x={0} y={0} />
                ))}
             </div>
         </div>

         {/* --- LANTERN LIGHT EFFECT (Follows "Player" slightly or stays centered) --- */}
         <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-[radial-gradient(circle_at_50%_50%,#fff7ed_0%,transparent_60%)] animate-[pulse_4s_ease-in-out_infinite] opacity-60"></div>

         {/* SVG Filters */}
         <svg className="absolute w-0 h-0">
            <filter id="wax-seal-distort">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>
         </svg>
      </div>
    );
};

export const PirateNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    // --- IN PROGRESS: THE SHIP'S WHEEL (HELM) ---
    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Rotating Helm */}
                <div className="relative w-20 h-20 animate-[spin_10s_linear_infinite]">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-[6px] border-[#5d4037] bg-[#3e2723] shadow-xl"></div>
                    {/* Inner Ring */}
                    <div className="absolute inset-4 rounded-full border-[2px] border-[#8d6e63] bg-[#4e342e]"></div>
                    {/* Spokes */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <div 
                            key={deg} 
                            className="absolute top-1/2 left-1/2 w-1 h-24 bg-[#5d4037] -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                        >
                            {/* Handle knobs at ends */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-[#3e2723] rounded-sm"></div>
                        </div>
                    ))}
                </div>

                {/* Center Hub (Static Icon) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#3e2723] border-[3px] border-[#fbbf24] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 text-[#fbbf24]">
                        {getNodeIcon(node, 'PIRATE')}
                    </div>
                </div>
                
                {/* Lantern Glow behind */}
                <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl animate-pulse -z-10"></div>
            </div>
        );
    }

    // --- COMPLETED: THE JEWEL ---
    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                {/* Gold Setting */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b45309] shadow-lg border border-[#fef08a]"></div>
                
                {/* Gemstone Body */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-900 shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center">
                    {/* Facets / Shine */}
                    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/40 to-transparent"></div>
                    <div className="relative text-[#ecfccb] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        {getNodeIcon(node, 'PIRATE')}
                    </div>
                </div>

                {/* Sparkle */}
                <div className="absolute -top-1 -right-1 text-white animate-pulse">
                    <Gem size={16} fill="white" />
                </div>
            </div>
        );
    }

    // --- AVAILABLE: RED WAX SEAL ---
    if (status === 'AVAILABLE') {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform">
                {/* Wax Blob Shape */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#ef4444] to-[#7f1d1d] shadow-sm rounded-full"
                    style={{ 
                        filter: 'url(#wax-seal-distort)',
                        boxShadow: '2px 4px 6px rgba(0,0,0,0.4)'
                    }}
                ></div>
                
                {/* Stamped Inner Circle */}
                <div className="absolute inset-3 rounded-full border-[2px] border-[#7f1d1d]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center bg-[#b91c1c]">
                    <div className="text-[#fee2e2]/80 group-hover:text-white transition-colors" style={{ filter: 'drop-shadow(0px 1px 0px rgba(0,0,0,0.3))' }}>
                        {getNodeIcon(node, 'PIRATE')}
                    </div>
                </div>
            </div>
        );
    }

    // --- LOCKED: BURNT/FADED MARK ---
    return (
        <div className="relative w-12 h-12 flex items-center justify-center opacity-50 grayscale hover:opacity-70 transition-opacity">
            <div className="text-[#5d4037]">
                {getNodeIcon(node, 'PIRATE')}
            </div>
            {/* Question Mark / Mystery */}
            <div className="absolute -bottom-1 -right-1 text-[#5d4037] opacity-50">?</div>
        </div>
    );
};
