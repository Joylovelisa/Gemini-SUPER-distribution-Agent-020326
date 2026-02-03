import React, { ReactNode } from 'react';
import { PainterStyle } from '../types';

interface LayoutProps {
  children: ReactNode;
  style: PainterStyle;
  theme: 'light' | 'dark';
}

export const Layout: React.FC<LayoutProps> = ({ children, style, theme }) => {
  const { colors, pattern, fontDisplay } = style;

  return (
    <div 
      className="min-h-screen transition-all duration-700 ease-in-out"
      style={{
        background: `linear-gradient(to bottom right, ${colors.bgGradientStart}, ${colors.bgGradientEnd})`,
        color: colors.textPrimary,
        '--glass-bg': colors.glassBg,
        '--glass-border': colors.glassBorder,
        '--accent-color': colors.accent,
        '--accent-hover': colors.accentHover,
        '--text-primary': colors.textPrimary,
        '--text-secondary': colors.textSecondary,
        fontFamily: fontDisplay ? `${fontDisplay}, sans-serif` : 'inherit',
      } as React.CSSProperties}
    >
      {pattern && (
         <div 
           className="fixed inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: pattern,
             backgroundSize: style.id === 'klimt' ? '20px 20px' : style.id === 'lichtenstein' ? '10px 10px' : 'cover'
           }}
         />
      )}
      <div className="relative z-10 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};