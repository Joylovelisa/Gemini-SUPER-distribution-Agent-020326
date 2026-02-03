import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ChartsSection } from './components/Charts';
import { ResultsSection } from './components/ResultsSection';
import { DistributionAnalysis } from './components/DistributionAnalysis';
import { PAINTER_STYLES, TRANSLATIONS_DICT } from './constants';
import { PainterStyle, Theme, Language } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [style, setStyle] = useState<PainterStyle>(PAINTER_STYLES.find(s => s.id === 'tech-noir') || PAINTER_STYLES[0]);
  const [language, setLanguage] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'dashboard' | 'distribution'>('dashboard');

  const translations = TRANSLATIONS_DICT[language];

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'zh-TW' : 'en');
  };

  return (
    <Layout style={style} theme={theme}>
      <Header 
        translations={translations}
        currentStyle={style}
        onStyleChange={setStyle}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        view={view}
        onViewChange={setView}
      />

      <main className="max-w-7xl mx-auto">
        {view === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Section: Visualizations */}
            <section className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 font-display">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: style.colors.accent }}></span>
                  {translations.keyDistributions}
                </h2>
              </div>
              <ChartsSection style={style} translations={translations} />
            </section>

            {/* Right Section: Search Results */}
            <section className="lg:col-span-5 h-full">
               <ResultsSection 
                 style={style} 
                 translations={translations} 
                 searchTerm={searchTerm} 
                />
            </section>
          </div>
        ) : (
          <DistributionAnalysis style={style} translations={translations} />
        )}
      </main>
    </Layout>
  );
}

export default App;