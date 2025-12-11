import React from 'react';
import { SkillNode, CameraState } from '../../types';

export type ThemeType = 
  | 'COSMIC' 
  | 'PIRATE' 
  | 'CYBERPUNK' 
  | 'NATURE' 
  | 'BLUEPRINT'
  | 'RETRO'
  | 'STEAMPUNK'
  | 'INK'
  | 'HOLO'
  | 'PAPER';

export interface ThemeConfig {
  id: ThemeType;
  label: string;
  icon: React.ElementType;
  // CSS Classes
  bgWrapper: string;
  panelClass: string;
  buttonClass: string;
  // Colors for SVG/JS
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  lineBaseColor: string;
  lineActiveColor: string;
  // Geometry
  nodeShape: 'circle' | 'square' | 'hexagon' | 'organic' | 'coin';
  connectionStyle: 'bezier' | 'straight' | 'hand-drawn' | 'circuit';
  font: string;
}

export interface ThemeBackgroundProps {
  camera: CameraState;
}

export interface ThemeNodeProps {
  node: SkillNode;
  activeTheme: ThemeType; // Passed for context if needed, though usually implicit in the component choice
}