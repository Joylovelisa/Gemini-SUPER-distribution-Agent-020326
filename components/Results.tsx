import React, { useState, useMemo } from 'react';
import { FdaRecord, PainterStyle, Translations } from '../types';
import { MOCK_DATA } from '../constants';
import { Activity, AlertTriangle, FileText, Database, ArrowRight } from 'lucide-react';

interface ResultsProps {
  style: PainterStyle;
  translations: Translations;
  searchTerm: string;
}

export const ResultsSection: React.FC<ResultsProps> = ({ style, translations, searchTerm }) => {
  const [activeTab, setActiveTab] = useState<'all' | '510k' | 'recall' | 'adr' | 'gudid'>('all');

  const allRecords = useMemo(() => {
    const records: FdaRecord[] = [];
    Object.keys(MOCK_DATA).forEach(key => {
        records.push(...MOCK_DATA[key]);
    });
    return records;
  }, []);

  const filteredRecords = useMemo(() => {
    let filtered = activeTab === 'all' 
      ? allRecords 
      : allRecords.filter(r => r.source === activeTab);
    
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(r => 
        (r.device_name?.toLowerCase() || '').includes(lower) ||
        (r.k_number?.toLowerCase() || '').includes(lower) ||
        (r.applicant?.toLowerCase() || '').includes(lower) ||
        (r.narrative?.toLowerCase() || '').includes(lower) ||
        (r.reason_for_recall?.toLowerCase() || '').includes(lower)
      );
    }
    return filtered;
  }, [allRecords, activeTab, searchTerm]);

  const getIcon = (source: string) => {
    switch(source) {
      case '510k': return <FileText size={16} />;
      case 'recall': return <AlertTriangle size={16} />;
      case 'adr': return <Activity size={16} />;
      default: return <Database size={16} />;
    }
  };

  const getColor = (source: string) => {
     switch(source) {
      case '510k': return style.colors.chartColors[0];
      case 'recall': return style.colors.chartColors[2]; // usually red-ish in default
      case 'adr': return style.colors.chartColors[1];
      default: return style.colors.chartColors[3];
    }
  };

  const renderCard = (record: FdaRecord, idx: number) => {
    const cardColor = getColor(record.source);
    
    return (
      <div 
        key={`${record.source}-${idx}`}
        className="rounded-xl p-5 mb-4 border transition-all duration-300 hover:scale-[1.01] animate-[fadeIn_0.5s_ease-out_forwards]"
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderColor: 'rgba(255,255,255,0.05)',
          animationDelay: `${idx * 0.1}s`,
          opacity: 0
        }}
      >
        <div className="flex justify-between items-start mb-3">
            <span 
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border flex items-center gap-2"
              style={{ 
                color: cardColor, 
                backgroundColor: `${cardColor}15`,
                borderColor: `${cardColor}30`
              }}
            >
              {getIcon(record.source)}
              {record.source === '510k' ? '510(k) Approval' : 
               record.source === 'recall' ? 'Class I Recall' :
               record.source === 'adr' ? 'Adverse Event' : 'GUDID Registration'}
            </span>
            <span className="text-xs opacity-50 font-mono">
              {record.k_number || record.recall_number || record.adverse_event_id || record.primary_di}
            </span>
        </div>

        <h4 className="text-lg font-bold mb-2 leading-tight">
          {record.device_name || record.product_description || record.brand_name || record.device_problem}
        </h4>

        {record.source === '510k' && (
           <div className="grid grid-cols-2 gap-y-2 text-xs opacity-70 mb-4">
              <div><span className="block opacity-50 uppercase text-[9px]">Applicant</span>{record.applicant}</div>
              <div><span className="block opacity-50 uppercase text-[9px]">Decision</span>{record.decision}</div>
              <div><span className="block opacity-50 uppercase text-[9px]">Date</span>{record.decision_date}</div>
              <div><span className="block opacity-50 uppercase text-[9px]">Class</span>{record.device_class}</div>
           </div>
        )}

        {record.source === 'recall' && (
           <div className="bg-[rgba(0,0,0,0.2)] p-3 rounded-lg border-l-2 mb-4" style={{borderLeftColor: cardColor}}>
              <p className="text-[10px] uppercase font-bold mb-1 opacity-80" style={{color: cardColor}}>Reason for Recall</p>
              <p className="text-xs opacity-70">{record.reason_for_recall}</p>
           </div>
        )}

        {record.source === 'adr' && (
          <p className="text-xs opacity-70 mb-4 leading-relaxed">
            {record.narrative}
          </p>
        )}

        {record.source === 'gudid' && (
          <div className="text-xs opacity-70 mb-4">
             <p className="mb-1">{record.device_description}</p>
             <p>Manuf: {record.manufacturer_name}</p>
          </div>
        )}

        <div className="flex gap-2">
            <button 
              className="flex-1 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1 group"
              style={{ 
                backgroundColor: `${style.colors.accent}15`, 
                color: style.colors.accent,
                borderColor: `${style.colors.accent}30`
              }}
            >
              {translations.actions.analyze} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="flex-1 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] border border-[var(--glass-border)] text-xs font-bold hover:bg-[rgba(255,255,255,0.1)] transition-all"
            >
              {translations.actions.workspace}
            </button>
        </div>
      </div>
    );
  };

  const getTabCount = (tab: string) => {
    if (tab === 'all') return allRecords.length;
    return allRecords.filter(r => r.source === tab).length;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 font-display">
            <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: style.colors.chartColors[1] }}></span>
            {translations.searchResults}
        </h2>

        <div 
          className="rounded-2xl overflow-hidden flex flex-col flex-grow backdrop-blur-xl border transition-all duration-500 h-[600px]"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
          }}
        >
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b no-scrollbar" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
               {Object.entries(translations.tabs).map(([key, label]) => {
                 const tabKey = key === 'k510' ? '510k' : key === 'recalls' ? 'recall' : key;
                 const isActive = activeTab === tabKey;
                 return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(tabKey as any)}
                      className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all hover:bg-[rgba(255,255,255,0.05)] relative`}
                      style={{ 
                        color: isActive ? style.colors.accent : 'var(--text-secondary)'
                      }}
                    >
                      {label}
                      <span 
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                        style={{
                          backgroundColor: isActive ? style.colors.accent : 'rgba(0,0,0,0.3)',
                          color: isActive ? '#fff' : 'var(--text-secondary)'
                        }}
                      >
                        {getTabCount(tabKey)}
                      </span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: style.colors.accent }}></div>
                      )}
                    </button>
                 );
               })}
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                {filteredRecords.length === 0 ? (
                  <div className="h-full flex items-center justify-center opacity-50">
                    No records found matching "{searchTerm}"
                  </div>
                ) : (
                  filteredRecords.map((record, i) => renderCard(record, i))
                )}
            </div>
        </div>
    </div>
  );
};