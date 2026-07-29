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
    imageFilter: 'none',
    overlayGradient: 'radial-gradient(ellipse 68% 68% at 50% 55%, rgba(180, 80, 40, 0.85) 0%, rgba(150, 65, 30, 0.5) 45%, transparent 78%)',
    overlayOpacity: 1
  },
  slate: {
    name: 'Nordic Slate',
    hex: '#5A6E82',
    bgClass: 'bg-[#5A6E82]',
    borderClass: 'border-[#5A6E82]',
    textClass: 'text-[#5A6E82]',
    ringClass: 'ring-[#5A6E82]',
    imageFilter: 'none',
    overlayGradient: 'radial-gradient(ellipse 68% 68% at 50% 55%, rgba(70, 95, 125, 0.85) 0%, rgba(55, 75, 105, 0.5) 45%, transparent 78%)',
    overlayOpacity: 1
  },
  greige: {
    name: 'Limestone Greige',
    hex: '#A89F91',
    bgClass: 'bg-[#A89F91]',
    borderClass: 'border-[#A89F91]',
    textClass: 'text-[#A89F91]',
    ringClass: 'ring-[#A89F91]',
    imageFilter: 'none',
    overlayGradient: 'radial-gradient(ellipse 68% 68% at 50% 55%, rgba(185, 175, 160, 0.85) 0%, rgba(165, 155, 140, 0.5) 45%, transparent 78%)',
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
  const maskStyle = {
    maskImage: 'radial-gradient(ellipse 68% 68% at 50% 55%, black 15%, transparent 78%)',
    WebkitMaskImage: 'radial-gradient(ellipse 68% 68% at 50% 55%, black 15%, transparent 78%)'
  };

  return (
    <>
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-[1]"
        style={{ 
          background: config.overlayGradient, 
          mixBlendMode: 'color',
          opacity: config.overlayOpacity,
          ...maskStyle
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out z-[1]"
        style={{ 
          background: config.overlayGradient, 
          mixBlendMode: 'soft-light',
          opacity: 0.6,
          ...maskStyle
        }}
      />
    </>
  );
};
