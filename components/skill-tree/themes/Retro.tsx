import React from 'react';
import { Gamepad2, Trophy, Lock, Play } from 'lucide-react';
import { ThemeConfig, ThemeBackgroundProps, ThemeNodeProps } from '../types';
import { getNodeIcon } from '../utils';

export const RETRO_THEME: ThemeConfig = {
    id: 'RETRO',
    label: 'Arcade Legacy',
    icon: Gamepad2,
    bgWrapper: 'bg-[#111]', // Cabinet Black
    panelClass: 'bg-[#222034] border-4 border-[#5b6ee1] shadow-[8px_8px_0px_black] text-[#cbdbfc] font-mono uppercase',
    buttonClass: 'hover:bg-[#5b6ee1] hover:text-white border-2 border-[#cbdbfc] text-[#5b6ee1] font-bold tracking-widest transition-none active:translate-y-1 active:shadow-none shadow-[0_4px_0_#30346d]',
    textPrimary: 'text-[#ffffff]',
    textSecondary: 'text-[#76428a]',
    accentColor: '#d95763', // Player 1 Red
    lineBaseColor: '#3f3f74', // Dark Blue
    lineActiveColor: '#6abe30', // Level Up Green
    nodeShape: 'square',
    connectionStyle: 'circuit',
    font: 'font-mono'
};

const PixelMountain = ({ left, height, color, speed }: any) => (
    <div 
        className="absolute bottom-0 w-64 pointer-events-none"
        style={{ 
            left, height, backgroundColor: color,
            clipPath: 'polygon(0% 100%, 20% 60%, 40% 80%, 60% 20%, 80% 50%, 100% 100%)',
            imageRendering: 'pixelated',
            animation: `scrollLeft ${speed} linear infinite`
        }}
    />
);

export const RetroBackground: React.FC<ThemeBackgroundProps> = ({ camera }) => {
    return (
        <div className="absolute inset-0 bg-[#0f0f1b] pointer-events-none overflow-hidden font-mono">
             
             {/* 1. CRT Scanlines Overlay */}
             <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
             
             {/* 2. Screen Curvature Vignette */}
             <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,black_150%)]"></div>

             {/* 3. Starfield */}
             <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `
                        radial-gradient(white 2px, transparent 2px),
                        radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px, 40px 40px',
                    backgroundPosition: '0 0, 20px 20px',
                    transform: `translate(${camera.x * 0.05}px, ${camera.y * 0.05}px)`
                }}
             />

             {/* 4. Huge Pixel Moon */}
             <div 
                className="absolute top-20 right-20 w-32 h-32 bg-[#fbf7f3] rounded-full opacity-80"
                style={{ 
                    boxShadow: '0 0 20px #fbf7f3',
                    transform: `translate(${camera.x * 0.02}px, ${camera.y * 0.02}px)`
                }}
             ></div>

             {/* 5. Scrolling Parallax Mountains */}
             <div className="absolute bottom-0 w-full h-64 overflow-hidden opacity-60" style={{ transform: `translateX(${camera.x * 0.1}px)` }}>
                 <PixelMountain left="10%" height="150px" color="#30346d" speed="0s" />
                 <PixelMountain left="50%" height="200px" color="#4e4a4e" speed="0s" />
                 <PixelMountain left="80%" height="120px" color="#8595a1" speed="0s" />
             </div>

             {/* 6. Grid Floor */}
             <div 
                className="absolute bottom-0 w-full h-32 bg-[#d95763] opacity-20"
                style={{
                    transform: 'perspective(200px) rotateX(60deg)',
                    backgroundImage: 'linear-gradient(transparent 95%, #5b6ee1 95%)',
                    backgroundSize: '100% 20px'
                }}
             />
        </div>
    );
};

export const RetroNode: React.FC<ThemeNodeProps> = ({ node }) => {
    const status = node.status;

    // Pixelated Box Shadow Style
    const pixelShadow = '4px 4px 0px 0px #000000';

    if (status === 'IN_PROGRESS') {
        return (
            <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Blinking Selection Cursor */}
                <div className="absolute inset-0 border-4 border-white animate-[pulse_0.5s_steps(2)_infinite]"></div>
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-white"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white"></div>

                {/* Main Sprite */}
                <div className="relative z-10 w-14 h-14 bg-[#d95763] border-4 border-white flex items-center justify-center" style={{ boxShadow: pixelShadow }}>
                    <div className="text-white animate-bounce">
                        {getNodeIcon(node, 'RETRO')}
                    </div>
                </div>

                {/* Floating "1UP" Text */}
                <div className="absolute -top-6 text-[#6abe30] font-black text-xs animate-[float_1s_steps(4)_infinite] drop-shadow-md">
                    1UP
                </div>
            </div>
        );
    }

    if (status === 'COMPLETED') {
        return (
            <div className="relative w-16 h-16 group hover:scale-110 transition-transform duration-75">
                 {/* Gold Block */}
                 <div className="absolute inset-0 bg-[#fbf236] border-4 border-[#ac3232]" style={{ boxShadow: pixelShadow }}></div>
                 
                 {/* Inner Shine */}
                 <div className="absolute top-1 right-1 w-2 h-2 bg-white"></div>

                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[#ac3232]">
                    {getNodeIcon(node, 'RETRO')}
                 </div>

                 {/* Trophy Badge */}
                 <div className="absolute -bottom-2 -right-2 bg-[#6abe30] border-2 border-black p-0.5 text-white shadow-[2px_2px_0_black]">
                     <Trophy size={10} strokeWidth={3} />
                 </div>
            </div>
        );
    }

    // LOCKED
    return (
        <div className="relative w-14 h-14 flex items-center justify-center opacity-70">
            <div className="absolute inset-0 bg-[#222034] border-4 border-[#595652]" style={{ boxShadow: pixelShadow }}></div>
            
            {/* Static Noise Pattern */}
            <div className="absolute inset-2 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="relative text-[#595652]">
                {getNodeIcon(node, 'RETRO')}
            </div>
        </div>
    );
};