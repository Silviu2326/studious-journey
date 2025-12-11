import React from 'react';
import { Brush, Scroll, Cloud, Wind, Droplets } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const INK_THEME: ThemeConfig = {
    id: 'INK',
    label: 'Celestial Ink',
    icon: Brush,
    bgWrapper: 'bg-[#fdfbf7]', // Antique White
    panelClass: 'bg-[#ffffff]/90 backdrop-blur-sm border-2 border-[#1c1917] shadow-[8px_8px_0px_rgba(28,25,23,0.1)] text-[#1c1917] font-serif',
    buttonClass: 'hover:bg-[#1c1917] hover:text-[#fdfbf7] border-2 border-[#1c1917] text-[#1c1917] transition-all rounded-full px-6 font-bold tracking-widest uppercase',
    textPrimary: 'text-[#1c1917]',
    textSecondary: 'text-[#57534e]',
    accentColor: '#dc2626', // Red Seal
    lineBaseColor: '#292524', // Ink
    lineActiveColor: '#dc2626', // Red Fate Thread
    nodeShape: 'organic',
    connectionStyle: 'hand-drawn',
    font: 'font-serif'
};

const InkKoi = ({ top, left, scale, speed, delay }: any) => (
    <div 
        className="absolute pointer-events-none opacity-40"
        style={{
            top, left,
            transform: `scale(${scale})`,
            animation: `swim ${speed} linear infinite ${delay}`
        }}
    >
        <svg width="100" height="50" viewBox="0 0 100 50" className="overflow-visible">
            <path 
                d="M80,25 Q60,5 40,25 T0,25" 
                fill="none" 
                stroke="#1c1917" 
                strokeWidth="3" 
                style={{ filter: 'url(#ink-bleed)' }}
            />
            <circle cx="85" cy="25" r="3" fill="#dc2626" />
        </svg>
    </div>
);

const Lotus = ({ bottom, left, scale }: any) => (
    <div 
        className="absolute pointer-events-none opacity-60"
        style={{
            bottom, left,
            transform: `scale(${scale})`,
            animation: 'float 6s ease-in-out infinite'
        }}
    >
        <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M30,40 Q10,40 0,20 Q10,0 30,10 Q50,0 60,20 Q50,40 30,40" fill="#fecaca" stroke="#1c1917" strokeWidth="1" />
        </svg>
    </div>
);

export const ZenInkBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#fdfbf7] pointer-events-none overflow-hidden">
             
             {/* SVG Filters */}
             <svg className="absolute w-0 h-0">
                <filter id="ink-bleed">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                    <feGaussianBlur stdDeviation="0.5" />
                </filter>
                <filter id="paper-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
                    <feColorMatrix type="saturate" values="0" />
                    <feBlend mode="multiply" in2="SourceGraphic" />
                </filter>
             </svg>

             {/* Paper Texture */}
             <div className="absolute inset-0 opacity-20" style={{ filter: 'url(#paper-grain)' }}></div>

             {/* Background Elements */}
             <div style={{ transform: `translate(${camera.x * 0.05}px, ${camera.y * 0.05}px)` }}>
                 {/* Distant Mountains (Wash) */}
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#e7e5e4] to-transparent opacity-50"></div>
                 <div className="absolute bottom-20 left-[-10%] w-[120%] h-64 bg-[#d6d3d1] opacity-30 rounded-[50%] blur-3xl"></div>
                 
                 {/* Koi Fish */}
                 <InkKoi top="20%" left="10%" scale={1.2} speed="20s" delay="0s" />
                 <InkKoi top="60%" left="80%" scale={0.8} speed="25s" delay="2s" />
                 <InkKoi top="40%" left="40%" scale={1} speed="30s" delay="5s" />

                 {/* Lotus Flowers */}
                 <Lotus bottom="10%" left="20%" scale={1} />
                 <Lotus bottom="25%" left="70%" scale={0.8} />
             </div>

             {/* Ink Rain */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 animate-[rain_2s_linear_infinite]"></div>
        </div>
    );
};

export const ZenInkNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Brush Circle (Enso) */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]">
                    <path 
                        d="M50,10 A40,40 0 1,1 49,10" 
                        fill="none" 
                        stroke="#1c1917" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        style={{ filter: 'url(#ink-bleed)' }}
                        strokeDasharray="200 50"
                    />
                </svg>
                
                {/* Inner Ink Splash */}
                <div className="absolute inset-4 rounded-full bg-[#1c1917] opacity-10 blur-md animate-pulse"></div>

                <div className="relative z-10 text-[#dc2626] transform scale-110 drop-shadow-sm">
                    {getNodeIcon(node, 'INK')}
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform duration-500">
                 {/* Sakura Seal */}
                 <div className="absolute inset-0">
                     <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                         <path d="M50,0 C60,20 80,20 100,20 C80,40 80,60 100,80 C80,80 60,80 50,100 C40,80 20,80 0,80 C20,60 20,40 0,20 C20,20 40,20 50,0" fill="#fecaca" />
                         <circle cx="50" cy="50" r="35" fill="#dc2626" style={{ filter: 'url(#ink-bleed)' }} />
                     </svg>
                 </div>

                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[#fff1f2]">
                    {getNodeIcon(node, 'INK')}
                 </div>
            </div>
        );
    }

    // LOCKED (Zen Stone)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <div 
                className="absolute inset-0 bg-[#57534e] rounded-[40%_60%_70%_30%/50%_50%_50%_50%]"
                style={{ filter: 'url(#ink-bleed)' }}
            ></div>
            
            <div className="relative text-[#d6d3d1]">
                {getNodeIcon(node, 'INK')}
            </div>
        </div>
    );
};
