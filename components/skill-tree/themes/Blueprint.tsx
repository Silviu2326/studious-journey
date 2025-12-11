import React from 'react';
import { Ruler, Triangle, Compass, PenTool, MousePointer2 } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const BLUEPRINT_THEME: ThemeConfig = {
    id: 'BLUEPRINT',
    label: 'Structural Schematics',
    icon: Ruler,
    bgWrapper: 'bg-[#1e3a8a]', // Royal Blue Base
    panelClass: 'bg-[#172554]/95 backdrop-blur border-2 border-white/80 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] text-white font-mono uppercase tracking-tight',
    buttonClass: 'hover:bg-white hover:text-[#172554] border-2 border-white text-white font-bold tracking-widest transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_rgba(0,0,0,0.3)]',
    textPrimary: 'text-white',
    textSecondary: 'text-blue-200',
    accentColor: '#ffffff',
    lineBaseColor: '#60a5fa', // Blue-400
    lineActiveColor: '#ffffff',
    nodeShape: 'square',
    connectionStyle: 'straight',
    font: 'font-mono'
};

const GridSystem = ({ camera }: { camera: {x:number, y:number} }) => (
    <>
        {/* Millimeter Grid (Faint) */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: `${20 * camera.zoom}px ${20 * camera.zoom}px`,
            backgroundPosition: `${camera.x}px ${camera.y}px`
        }}></div>
        {/* Major Grid (Bold) */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: `${100 * camera.zoom}px ${100 * camera.zoom}px`,
            backgroundPosition: `${camera.x}px ${camera.y}px`
        }}></div>
    </>
);

const ProtractorDeco = ({ x, y, size, rotation, opacity }: { x: string, y: string, size: number, rotation: string, opacity: number }) => (
    <div 
        className="absolute border border-dashed border-white rounded-full flex items-center justify-center pointer-events-none"
        style={{ 
            top: y, left: x, width: size, height: size, opacity,
            animation: `spin ${rotation} linear infinite`
        }}
    >
        <div className="absolute w-full h-[1px] bg-white/20"></div>
        <div className="absolute h-full w-[1px] bg-white/20"></div>
        <div className="absolute w-[80%] h-[80%] border border-white/10 rounded-full"></div>
    </div>
);

export const BlueprintBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
      <div className="absolute inset-0 bg-[#172554] pointer-events-none overflow-hidden">
          
          {/* Base Paper Texture (Noise) */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          {/* --- TECHNICAL DRAWING LAYER --- */}
          <GridSystem camera={camera} />

          {/* Moving Technical Guides (Parallax) */}
          <div style={{ transform: `translate(${camera.x * 0.2}px, ${camera.y * 0.2}px)` }}>
              <ProtractorDeco x="10%" y="20%" size={400} rotation="60s" opacity={0.05} />
              <ProtractorDeco x="80%" y="70%" size={300} rotation="40s" opacity={0.05} />
          </div>

          {/* Dynamic Measurement Lines (Sweeping Effect) */}
          <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/10 animate-[scanline_10s_linear_infinite]"></div>
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-white/10 animate-[scanline_15s_linear_infinite]"></div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_100%)] opacity-50"></div>
      </div>
    );
};

export const BlueprintNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    // --- HELPER: DIMENSION LINES ---
    const Dimensions = () => (
        <>
            {/* Top Dimension */}
            <div className="absolute -top-3 left-0 w-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-white/40"></div>
                <div className="absolute left-0 h-1 w-[1px] bg-white/40"></div>
                <div className="absolute right-0 h-1 w-[1px] bg-white/40"></div>
                <span className="bg-[#172554] px-1 text-[6px] text-white/60 font-mono absolute -top-1">50mm</span>
            </div>
            {/* Right Dimension */}
            <div className="absolute -right-3 top-0 h-full flex flex-col items-center justify-center">
                <div className="h-full w-[1px] bg-white/40"></div>
                <div className="absolute top-0 w-1 h-[1px] bg-white/40"></div>
                <div className="absolute bottom-0 w-1 h-[1px] bg-white/40"></div>
            </div>
        </>
    );

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Infinite Guide Lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-[200%] h-[1px] bg-yellow-400 border-t border-dashed border-yellow-400"></div>
                    <div className="h-[200%] w-[1px] bg-yellow-400 border-l border-dashed border-yellow-400 absolute"></div>
                </div>

                {/* Compass Circle Drawing Animation */}
                <div className="absolute inset-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                
                {/* Main Node */}
                <div className="relative z-10 w-14 h-14 bg-[#1e3a8a] border-2 border-yellow-400 flex items-center justify-center shadow-lg">
                    {/* Corner Brackets */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                    
                    <div className="text-yellow-400 animate-pulse">
                        {getNodeIcon(node, 'BLUEPRINT')}
                    </div>
                </div>

                {/* Floating Tool */}
                <div className="absolute -bottom-2 -right-2 text-yellow-400 animate-bounce">
                    <PenTool size={16} />
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-105 transition-transform duration-300">
                 {/* 3D Extrusion Effect (Shadow) */}
                 <div className="absolute top-1 left-1 w-full h-full bg-[#0f172a] border-r-2 border-b-2 border-white/30"></div>

                 {/* Main Solid Body */}
                 <div className="relative w-full h-full bg-white border-2 border-white flex items-center justify-center overflow-hidden">
                     {/* Industrial Striping */}
                     <div 
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: `repeating-linear-gradient(-45deg, #000 0, #000 2px, transparent 2px, transparent 5px)` }}
                     ></div>

                     <div className="text-[#172554] relative z-10 drop-shadow-sm font-bold">
                        {getNodeIcon(node, 'BLUEPRINT')}
                     </div>
                 </div>
                 
                 {/* "Dimensions" Decoration */}
                 <Dimensions />

                 {/* Stamp */}
                 <div className="absolute -top-2 -left-2 bg-[#172554] border border-white text-white text-[8px] font-bold px-1 py-0.5 rotate-[-10deg] shadow-md">
                     MK-II
                 </div>
            </div>
        );
    }

    // LOCKED (Blueprint Ghost)
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-40 group hover:opacity-80 transition-opacity">
            {/* Wireframe Box */}
            <div className="absolute inset-0 border border-white bg-[#1e3a8a]/50">
                {/* Cross Hatching */}
                <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-[1px] h-full bg-white/20 transform rotate-45"></div>
                     <div className="w-[1px] h-full bg-white/20 transform -rotate-45"></div>
                </div>
            </div>

            <div className="text-white group-hover:scale-110 transition-transform">
                {getNodeIcon(node, 'BLUEPRINT')}
            </div>
            
            <div className="absolute -bottom-5 font-mono text-[8px] text-white">
                FIG. A-1
            </div>
        </div>
    );
};
