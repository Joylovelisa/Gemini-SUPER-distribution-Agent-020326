import React from 'react';
import { Search, Globe, Palette, Zap, Check, Dna, LayoutDashboard, Share2 } from 'lucide-react';
import { PainterStyle, Translations } from '../types';
import { PAINTER_STYLES } from '../constants';

interface HeaderProps {
  translations: Translations;
  currentStyle: PainterStyle;
  onStyleChange: (style: PainterStyle) => void;
  language: 'en' | 'zh-TW';
  onLanguageToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  view: 'dashboard' | 'distribution';
  onViewChange: (view: 'dashboard' | 'distribution') => void;
}

export const Header: React.FC<HeaderProps> = ({
  translations,
  currentStyle,
  onStyleChange,
  language,
  onLanguageToggle,
  searchTerm,
  onSearchChange,
  view,
  onViewChange
}) => {
  const handleJackpot = () => {
    const randomIndex = Math.floor(Math.random() * PAINTER_STYLES.length);
    onStyleChange(PAINTER_STYLES[randomIndex]);
  };

  return (
    <header className="max-w-7xl mx-auto mb-8 animate-[fadeIn_0.5s_ease-out]">
      <div 
        className="rounded-2xl p-6 md:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] font-display flex items-center gap-3">
             <Dna className="w-8 h-8 md:w-10 md:h-10 text-[var(--accent-color)]" />
            {translations.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-medium flex items-center gap-2">
            {translations.subtitle} <span className="text-[var(--accent-color)] font-bold">"{searchTerm || 'device'}"</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
           {/* Navigation Toggle */}
           <div className="bg-[rgba(0,0,0,0.1)] p-1 rounded-xl border border-[var(--glass-border)] flex">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${view === 'dashboard' ? 'bg-[var(--accent-color)] text-[var(--bg-gradient-start)]' : 'hover:bg-[rgba(255,255,255,0.1)]'}`}
              >
                 <LayoutDashboard size={16} />
                 Dashboard
              </button>
              <button
                onClick={() => onViewChange('distribution')}
                className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${view === 'distribution' ? 'bg-[var(--accent-color)] text-[var(--bg-gradient-start)]' : 'hover:bg-[rgba(255,255,255,0.1)]'}`}
              >
                 <Share2 size={16} />
                 Distribution
              </button>
           </div>

          {/* Controls */}
          <div className="flex items-center gap-2 bg-[rgba(0,0,0,0.1)] p-1 rounded-xl border border-[var(--glass-border)]">
             <button 
                onClick={onLanguageToggle}
                className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors flex items-center gap-2 text-sm font-medium"
                title="Toggle Language"
             >
               <Globe size={18} />
               {language === 'en' ? 'EN' : '繁中'}
             </button>
             
             <div className="h-6 w-px bg-[var(--glass-border)]"></div>

             <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors flex items-center gap-2 text-sm font-medium">
                  <Palette size={18} />
                  <span className="hidden md:inline">{currentStyle.name}</span>
                </button>
                {/* Style Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 max-h-64 overflow-y-auto rounded-xl border border-[var(--glass-border)] backdrop-blur-xl bg-[var(--glass-bg)] shadow-xl p-2 hidden group-hover:block z-50 custom-scrollbar">
                  {PAINTER_STYLES.map(style => (
                    <button
                      key={style.id}
                      onClick={() => onStyleChange(style)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-between"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {style.name}
                      {currentStyle.id === style.id && <Check size={14} className="text-[var(--accent-color)]" />}
                    </button>
                  ))}
                </div>
             </div>

             <button 
                onClick={handleJackpot}
                className="px-3 py-2 rounded-lg bg-[var(--accent-color)] text-[var(--bg-gradient-start)] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[var(--accent-color)]/20"
             >
               <Zap size={16} fill="currentColor" />
               {translations.controls.jackpot}
             </button>
          </div>

          {/* Search Bar - Only show in Dashboard view */}
          {view === 'dashboard' && (
            <div className="relative group">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={translations.searchPlaceholder}
                className="w-full md:w-64 bg-[rgba(0,0,0,0.2)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] placeholder-[var(--text-secondary)] transition-all"
                style={{ color: 'var(--text-primary)' }}
              />
              <Search className="absolute left-3 top-2.5 text-[var(--text-secondary)]" size={18} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};