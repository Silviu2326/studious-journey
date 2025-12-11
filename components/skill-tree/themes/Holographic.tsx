import React from 'react';
import { Scan, Globe2, Target, Aperture, Wifi } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const HOLO_THEME: ThemeConfig = {
    id: 'HOLO',
    label: 'Orbital Command',
    icon: Globe2,
    bgWrapper: 'bg-[#000205]', // Void Black
    panelClass: 'bg-[#020617]/80 backdrop-blur-xl border border-[#0ea5e9]/30 shadow-[0_0_30px_rgba(14,165,233,0.15)] text-[#0ea5e9] font-mono uppercase tracking-wider',
    buttonClass: 'hover:bg-[#0ea5e9]/20 hover:text-white border border-[#0ea5e9]/50 text-[#0ea5e9] transition-all rounded-sm font-bold text-xs',
    textPrimary: 'text-[#e0f2fe]',
    textSecondary: 'text-[#7dd3fc]',
    accentColor: '#0ea5e9', // Sky-500
    lineBaseColor: '#1e293b', // Slate-800
    lineActiveColor: '#fbbf24', // Amber-400 (Alert/Active)
    nodeShape: 'hexagon',
    connectionStyle: 'straight',
    font: 'font-mono'
};

const OrbitalRing = ({ size, speed, color, tilt }: { size: number, speed: string, color: string, tilt: string }) => (
    <div 
        className="absolute rounded-full border border-dashed flex items-center justify-center pointer-events-none"
        style={{ 
            width: size, height: size, 
            borderColor: color,
            top: '50%', left: '50%',
            opacity: 0.3,
            transform: `translate(-50%, -50%) ${tilt}`,
            animation: `spin ${speed} linear infinite`
        }}
    >
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-current rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-current rounded-full"></div>
    </div>
);

export const HolographicBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#000205] pointer-events-none overflow-hidden">
             
             {/* 1. Curved Planet Horizon (Bottom Glow) */}
             <div className="absolute bottom-[-40%] left-[-20%] w-[140%] h-[80%] bg-[#0ea5e9]/10 rounded-[100%] blur-[100px]"></div>
             <div className="absolute bottom-[-45%] left-[-20%] w-[140%] h-[80%] border-t border-[#0ea5e9]/30 rounded-[100%] opacity-50"></div>

             {/* 2. Hexagonal Force Field Grid */}
             <div 
                className="absolute inset-[-100%] w-[300%] h-[300%] opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 35L20 70L0 35Z' fill='none' stroke='%230ea5e9' stroke-width='1'/%3E%3C/svg%3E")`,
                    transform: `perspective(1000px) rotateX(60deg) translateY(${camera.y * 0.2}px) translateX(${camera.x * 0.2}px)`,
                }}
             />

             {/* 3. Orbital Rings (3D Gyroscope Effect) */}
             <OrbitalRing size={600} speed="60s" color="#0ea5e9" tilt="rotateX(70deg)" />
             <OrbitalRing size={900} speed="90s" color="#0ea5e9" tilt="rotateY(70deg)" />
             <OrbitalRing size={1200} speed="120s" color="#0ea5e9" tilt="rotateZ(0deg)" />

             {/* 4. Scanning Radar Line */}
             <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0ea5e9]/10 to-transparent w-[20%] animate-[scanline_5s_linear_infinite]"
                style={{ transform: 'skewX(-20deg)' }}
             ></div>
        </div>
    );
};

export const HolographicNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    // Hexagon Clip
    const hexClip = { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
    
    // Tech Decoration Markers
    const CornerMarkers = () => (
        <>
            <div className="absolute top-1/4 left-0 w-[1px] h-1/2 bg-current opacity-50"></div>
            <div className="absolute top-1/4 right-0 w-[1px] h-1/2 bg-current opacity-50"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-current opacity-50"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-current opacity-50"></div>
        </>
    );

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                
                {/* 3D GYROSCOPE ANIMATION */}
                {/* Outer Ring (Z-Axis) */}
                <div className="absolute inset-0 border border-[#fbbf24]/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                {/* Middle Ring (Y-Axis) */}
                <div className="absolute inset-2 border border-[#fbbf24]/50 rounded-full animate-[spin_5s_linear_infinite]" style={{ transform: 'rotateY(60deg)' }}></div>
                {/* Inner Ring (X-Axis) */}
                <div className="absolute inset-4 border border-[#fbbf24] rounded-full animate-[spin_3s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }}></div>

                {/* Core Warning Hex */}
                <div className="relative z-10 w-12 h-12 bg-[#fbbf24]/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(251,191,36,0.5)]" style={hexClip}>
                    <div className="text-[#fbbf24] animate-pulse font-bold">
                        {getNodeIcon(node, 'HOLO')}
                    </div>
                </div>

                {/* Target Locked Lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#fbbf24]/20"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#fbbf24]/20"></div>

                {/* Alert Tag */}
                <div className="absolute -bottom-4 bg-[#fbbf24] text-black text-[7px] font-bold px-1 animate-pulse">
                    TARGET LOCKED
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform">
                 {/* Solid Hologram Projection */}
                 <div className="absolute inset-0 bg-[#0ea5e9]/10 backdrop-blur-md" style={hexClip}></div>
                 
                 {/* Glowing Border */}
                 <div className="absolute inset-0 border-2 border-[#0ea5e9]" style={hexClip}></div>

                 {/* Inner Scanlines */}
                 <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,#0ea5e9,#0ea5e9_1px,transparent_1px,transparent_4px)]" style={hexClip}></div>

                 {/* Icon */}
                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[#e0f2fe] drop-shadow-[0_0_8px_rgba(14,165,233,1)]">
                    {getNodeIcon(node, 'HOLO')}
                 </div>
                 
                 <div className="text-[#0ea5e9]">
                     <CornerMarkers />
                 </div>
            </div>
        );
    }

    // LOCKED (Encrypted Signal)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-50 group hover:opacity-80 transition-opacity">
            {/* Dashed Hex */}
            <div className="absolute inset-0 border border-dashed border-[#0ea5e9]/50" style={hexClip}></div>
            
            <div className="text-[#0ea5e9]/50 group-hover:text-[#0ea5e9] transition-colors blur-[0.5px]">
                {getNodeIcon(node, 'HOLO')}
            </div>

            {/* Lock Icon Overlay */}
            <div className="absolute -bottom-2 -right-2 text-[#0ea5e9] text-[8px] border border-[#0ea5e9] px-0.5 bg-black">
                ENC
            </div>
        </div>
    );
};
