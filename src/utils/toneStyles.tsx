import React from 'react';
import { ToneColor } from '../types';

export interface ToneVisualConfig {
  name: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  ringClass: string;
  imageFilter: string;
  overlayGradient: string;
  overlayOpacity: number;
}

export const TONE_CONFIGS: Record<ToneColor, ToneVisualConfig> = {
  rust: {
    name: 'Rust Terracotta',
    hex: '#964627',
    bgClass: 'bg-[#964627]',
    borderClass: 'border-[#964627]',
    textClass: 'text-[#964627]',
    ringClass: 'ring-[#964627]',
    imageFilter: 'sepia(0.38) saturate(1.45) hue-rotate(-15deg) contrast(1.05)',
    overlayGradient: 'linear-gradient(135deg, rgba(150, 70, 39, 0.45), rgba(180, 85, 45, 0.35))',
    overlayOpacity: 1
  },
  slate: {
    name: 'Nordic Slate',
    hex: '#5A6E82',
    bgClass: 'bg-[#5A6E82]',
    borderClass: 'border-[#5A6E82]',
    textClass: 'text-[#5A6E82]',
    ringClass: 'ring-[#5A6E82]',
    imageFilter: 'saturate(0.65) hue-rotate(185deg) contrast(1.08) brightness(0.95)',
    overlayGradient: 'linear-gradient(135deg, rgba(70, 95, 120, 0.45), rgba(55, 75, 95, 0.35))',
    overlayOpacity: 1
  },
  greige: {
    name: 'Limestone Greige',
    hex: '#A89F91',
    bgClass: 'bg-[#A89F91]',
    borderClass: 'border-[#A89F91]',
    textClass: 'text-[#A89F91]',
    ringClass: 'ring-[#A89F91]',
    imageFilter: 'sepia(0.2) saturate(0.85) contrast(1.02) brightness(1.03)',
    overlayGradient: 'linear-gradient(135deg, rgba(185, 175, 160, 0.4), rgba(200, 190, 175, 0.3))',
    overlayOpacity: 1
  }
};

export function getToneConfig(color?: ToneColor | string): ToneVisualConfig {
  if (!color || !(color in TONE_CONFIGS)) {
    return TONE_CONFIGS.rust;
  }
  return TONE_CONFIGS[color as ToneColor];
}

export const ToneImageOverlay: React.FC<{ color?: ToneColor | string }> = ({ color }) => {
  const config = getToneConfig(color);
  return (
    <>
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-[1]"
        style={{ 
          background: config.overlayGradient, 
          mixBlendMode: 'color',
          opacity: config.overlayOpacity 
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-[1]"
        style={{ 
          background: config.overlayGradient, 
          mixBlendMode: 'soft-light',
          opacity: 0.5 
        }}
      />
    </>
  );
};
