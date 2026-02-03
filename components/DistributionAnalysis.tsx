import React, { useState, useMemo, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Treemap
} from 'recharts';
import { Upload, FileText, Filter, Activity, Share2, Layers, Map, Calendar, Box } from 'lucide-react';
import { PainterStyle, Translations, DistributionRecord } from '../types';
import { DEFAULT_DISTRIBUTION_CSV } from '../constants';

interface DistributionAnalysisProps {
  style: PainterStyle;
  translations: Translations;
}

export const DistributionAnalysis: React.FC<DistributionAnalysisProps> = ({ style, translations }) => {
  const [inputText, setInputText] = useState('');
  const [records, setRecords] = useState<DistributionRecord[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [instructions, setInstructions] = useState('');
  
  // Filters
  const [filterSupplier, setFilterSupplier] = useState('');
  const [filterLicense, setFilterLicense] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadDefault = () => {
    setInputText(DEFAULT_DISTRIBUTION_CSV);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setInputText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text: string): DistributionRecord[] => {
    const lines = text.trim().split('\n');
    const result: DistributionRecord[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      // Regex to handle quoted strings containing commas
      const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      // Fallback simple split if regex fails or for simple lines
      const row = matches ? matches.map(m => m.replace(/^"|"$/g, '').trim()) : lines[i].split(',');
      
      if (row.length >= 10) {
        result.push({
          SupplierID: row[0],
          Deliverdate: row[1],
          CustomerID: row[2],
          LicenseNo: row[3],
          Category: row[4],
          UDID: row[5],
          DeviceNAME: row[6],
          LotNO: row[7],
          SerNo: row[8] || '',
          Model: row[9],
          Number: parseInt(row[10] || '1', 10)
        });
      }
    }
    return result;
  };

  const handleAnalyze = () => {
    const parsed = parseCSV(inputText);
    setRecords(parsed);
    setIsAnalyzed(true);
  };

  const filteredRecords = useMemo(() => {
    return records.filter(r => 
      (filterSupplier ? r.SupplierID.includes(filterSupplier) : true) &&
      (filterLicense ? r.LicenseNo.includes(filterLicense) : true) &&
      (filterModel ? r.Model.includes(filterModel) : true) &&
      (filterCustomer ? r.CustomerID.includes(filterCustomer) : true)
    );
  }, [records, filterSupplier, filterLicense, filterModel, filterCustomer]);

  // Derived Data for Charts
  const summaryStats = useMemo(() => {
    const totalUnits = filteredRecords.reduce((acc, r) => acc + r.Number, 0);
    const uniqueCustomers = new Set(filteredRecords.map(r => r.CustomerID)).size;
    
    const modelCounts: Record<string, number> = {};
    filteredRecords.forEach(r => modelCounts[r.Model] = (modelCounts[r.Model] || 0) + 1);
    const topModel = Object.entries(modelCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return { totalUnits, uniqueCustomers, topModel };
  }, [filteredRecords]);

  // Chart 1: Timeline
  const timelineData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredRecords.forEach(r => {
      grouped[r.Deliverdate] = (grouped[r.Deliverdate] || 0) + r.Number;
    });
    return Object.keys(grouped).sort().map(k => ({ date: k, quantity: grouped[k] }));
  }, [filteredRecords]);

  // Chart 2: Model Distribution
  const modelData = useMemo(() => {
     const grouped: Record<string, number> = {};
     filteredRecords.forEach(r => {
        grouped[r.Model] = (grouped[r.Model] || 0) + r.Number;
     });
     return Object.keys(grouped).map(k => ({ name: k, value: grouped[k] }));
  }, [filteredRecords]);

  // Chart 3: Customer Volume
  const customerData = useMemo(() => {
      const grouped: Record<string, number> = {};
      filteredRecords.forEach(r => {
          grouped[r.CustomerID] = (grouped[r.CustomerID] || 0) + r.Number;
      });
      return Object.keys(grouped).slice(0, 10).map(k => ({ name: k, value: grouped[k] }));
  }, [filteredRecords]);
  
  // Chart 4: License Usage
  const licenseData = useMemo(() => {
      const grouped: Record<string, number> = {};
      filteredRecords.forEach(r => {
        // Shorten license for display
        const short = r.LicenseNo.substring(0, 10) + '...';
        grouped[short] = (grouped[short] || 0) + r.Number;
      });
      return Object.keys(grouped).map(k => ({ name: k, value: grouped[k] }));
  }, [filteredRecords]);

  // Network Graph Data Construction
  const networkData = useMemo(() => {
     // We will build a hierarchical tree: Supplier -> License -> Model
     const tree: Record<string, any> = {};
     filteredRecords.forEach(r => {
        if (!tree[r.SupplierID]) tree[r.SupplierID] = {};
        if (!tree[r.SupplierID][r.LicenseNo]) tree[r.SupplierID][r.LicenseNo] = {};
        if (!tree[r.SupplierID][r.LicenseNo][r.Model]) tree[r.SupplierID][r.LicenseNo][r.Model] = 0;
        tree[r.SupplierID][r.LicenseNo][r.Model] += r.Number;
     });
     return tree;
  }, [filteredRecords]);


  const FOLLOW_UP_QUESTIONS = [
    "What is the trend of delivery volume over the last quarter?",
    "Which supplier has the highest defect rate based on LotNo returns?",
    "Are there specific models frequently associated with specific customers?",
    "What is the geographic concentration of CustomerIDs?",
    "How does license expiry correlation with product distribution?",
    "Is there a seasonality in the order volume?",
    "Which lot numbers have the widest distribution?",
    "Are high-volume customers purchasing high-risk class devices?",
    "What is the average lead time between manufacture and delivery?",
    "Which product category has the highest growth rate?",
    "Are there gaps in serial number sequences indicating data loss?",
    "What is the ratio of Class II to Class III devices distributed?",
    "Which customers solely rely on a single supplier?",
    "Are there duplicates in UDID entries across different deliveries?",
    "How many unique medical facilities are represented?",
    "What is the frequency of 'urgent' deliveries vs standard?",
    "Which device models have been discontinued but still distributed?",
    "Is there a correlation between larger lot sizes and quality issues?",
    "What percentage of distribution is for implantable devices?",
    "Can we predict next month's demand based on this data?"
  ];

  if (!isAnalyzed) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
         <div 
            className="rounded-2xl p-8 backdrop-blur-xl border transition-all duration-500"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderColor: 'var(--glass-border)',
            }}
         >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
               <Share2 className="text-[var(--accent-color)]" />
               {translations.distribution.title}
            </h2>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">{translations.distribution.inputLabel}</label>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-64 bg-[rgba(0,0,0,0.2)] border border-[var(--glass-border)] rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] placeholder-[var(--text-secondary)] transition-all custom-scrollbar"
                    placeholder="SupplierID,Deliverdate,CustomerID..."
                    style={{ color: 'var(--text-primary)' }}
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">{translations.distribution.instructions}</label>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full h-24 bg-[rgba(0,0,0,0.2)] border border-[var(--glass-border)] rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
                    placeholder="e.g. Focus analysis on cardiac devices..."
                    style={{ color: 'var(--text-primary)' }}
                  />
               </div>

               <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                     onClick={handleLoadDefault}
                     className="px-4 py-2 rounded-lg border border-[var(--glass-border)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-sm font-bold flex items-center gap-2"
                  >
                     <FileText size={16} /> {translations.distribution.loadDefault}
                  </button>
                  <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="px-4 py-2 rounded-lg border border-[var(--glass-border)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-sm font-bold flex items-center gap-2"
                  >
                     <Upload size={16} /> {translations.distribution.upload}
                  </button>
                  <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     accept=".csv,.txt,.json"
                     onChange={handleFileUpload}
                  />
                  <div className="flex-grow"></div>
                  <button 
                     onClick={handleAnalyze}
                     disabled={!inputText}
                     className="px-8 py-2 rounded-lg bg-[var(--accent-color)] text-[var(--bg-gradient-start)] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Activity size={18} fill="currentColor" /> {translations.distribution.analyze}
                  </button>
               </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
        {/* Filters */}
        <div 
          className="rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
          }}
        >
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70 flex items-center gap-2">
             <Filter size={16} /> {translations.distribution.filters}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {['Supplier', 'License', 'Model', 'Customer'].map((f) => (
                <div key={f} className="relative">
                   <input 
                      placeholder={`Filter ${f}...`}
                      value={f === 'Supplier' ? filterSupplier : f === 'License' ? filterLicense : f === 'Model' ? filterModel : filterCustomer}
                      onChange={(e) => {
                         const v = e.target.value;
                         if(f === 'Supplier') setFilterSupplier(v);
                         if(f === 'License') setFilterLicense(v);
                         if(f === 'Model') setFilterModel(v);
                         if(f === 'Customer') setFilterCustomer(v);
                      }}
                      className="w-full bg-[rgba(0,0,0,0.2)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
                      style={{ color: 'var(--text-primary)' }}
                   />
                </div>
             ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
              { label: translations.distribution.totalUnits, val: summaryStats.totalUnits, icon: <Box className="text-[var(--accent-color)]" /> },
              { label: translations.distribution.uniqueCustomers, val: summaryStats.uniqueCustomers, icon: <Map className="text-blue-400" /> },
              { label: translations.distribution.topModel, val: summaryStats.topModel, icon: <Layers className="text-purple-400" /> }
           ].map((stat, i) => (
              <div 
                key={i}
                className="rounded-2xl p-6 backdrop-blur-xl border flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                }}
              >
                 <div>
                    <p className="text-sm opacity-70 font-bold uppercase">{stat.label}</p>
                    <p className="text-3xl font-display font-bold mt-1">{stat.val}</p>
                 </div>
                 <div className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--glass-border)]">
                    {stat.icon}
                 </div>
              </div>
           ))}
        </div>

        {/* Network Graph (Flow Visualization) */}
        <div 
           className="rounded-2xl p-6 backdrop-blur-xl border min-h-[400px]"
           style={{
             backgroundColor: 'var(--glass-bg)',
             borderColor: 'var(--glass-border)',
           }}
        >
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-70 flex items-center gap-2">
               <Share2 size={16} /> {translations.distribution.networkGraph}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
               {/* Column 1: Suppliers */}
               <div className="flex-1 min-w-[200px] space-y-2">
                  <div className="text-xs font-bold opacity-50 mb-2 uppercase border-b pb-1">Supplier</div>
                  {Object.keys(networkData).map(supplier => (
                     <div key={supplier} className="p-3 rounded-lg bg-[rgba(0,0,0,0.2)] border border-[var(--glass-border)] hover:border-[var(--accent-color)] transition-colors relative group cursor-pointer">
                        <span className="font-bold text-sm">{supplier}</span>
                        {/* Connecting Lines would go here in a full SVG implementation */}
                        <div className="absolute right-0 top-1/2 w-4 h-px bg-[var(--glass-border)] translate-x-full"></div>
                     </div>
                  ))}
               </div>
               
               {/* Column 2: Licenses */}
               <div className="flex-1 min-w-[200px] space-y-2">
                  <div className="text-xs font-bold opacity-50 mb-2 uppercase border-b pb-1">License No</div>
                  {Object.keys(networkData).flatMap(s => Object.keys(networkData[s])).filter((v, i, a) => a.indexOf(v) === i).map((lic, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[rgba(0,0,0,0.1)] border border-[var(--glass-border)] text-xs truncate" title={lic}>
                         {lic}
                      </div>
                  ))}
               </div>

               {/* Column 3: Models */}
               <div className="flex-1 min-w-[200px] space-y-2">
                  <div className="text-xs font-bold opacity-50 mb-2 uppercase border-b pb-1">Model</div>
                  {Object.keys(networkData).flatMap(s => Object.keys(networkData[s]).flatMap(l => Object.keys(networkData[s][l]))).filter((v, i, a) => a.indexOf(v) === i).map((mod, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[rgba(0,0,0,0.1)] border border-[var(--glass-border)] text-xs font-mono">
                         {mod}
                      </div>
                  ))}
               </div>

                {/* Column 4: Customers (Derived from filtered records for simplicity in this view) */}
               <div className="flex-1 min-w-[200px] space-y-2">
                  <div className="text-xs font-bold opacity-50 mb-2 uppercase border-b pb-1">Customer</div>
                  {Array.from(new Set(filteredRecords.map(r => r.CustomerID))).slice(0, 10).map((cust, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[rgba(0,0,0,0.1)] border border-[var(--glass-border)] text-xs">
                         {cust}
                      </div>
                  ))}
                  {new Set(filteredRecords.map(r => r.CustomerID)).size > 10 && <div className="text-xs opacity-50 p-2">...and more</div>}
               </div>
            </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Chart 1: Timeline */}
           <div className="h-80 rounded-2xl p-4 backdrop-blur-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <h4 className="text-xs font-bold uppercase mb-4 opacity-70 flex items-center gap-2"><Calendar size={14}/> Delivery Timeline</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={timelineData}>
                    <XAxis dataKey="date" tick={{fontSize: 10, fill: style.colors.textSecondary}} stroke={style.colors.glassBorder} />
                    <YAxis tick={{fontSize: 10, fill: style.colors.textSecondary}} stroke={style.colors.glassBorder} />
                    <Tooltip contentStyle={{backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary}} />
                    <Area type="monotone" dataKey="quantity" stroke={style.colors.accent} fill={style.colors.accent} fillOpacity={0.3} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           {/* Chart 2: Model Distribution */}
           <div className="h-80 rounded-2xl p-4 backdrop-blur-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <h4 className="text-xs font-bold uppercase mb-4 opacity-70">Model Distribution</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={modelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill={style.colors.accent}>
                       {modelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={style.colors.chartColors[index % style.colors.chartColors.length]} />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary}} />
                    <Legend iconSize={8} wrapperStyle={{fontSize: '10px'}} />
                 </PieChart>
              </ResponsiveContainer>
           </div>

           {/* Chart 3: Customer Volume */}
           <div className="h-80 rounded-2xl p-4 backdrop-blur-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <h4 className="text-xs font-bold uppercase mb-4 opacity-70">Top Customers</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={customerData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 10, fill: style.colors.textSecondary}} stroke={style.colors.glassBorder} />
                    <Tooltip contentStyle={{backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary}} />
                    <Bar dataKey="value" fill={style.colors.chartColors[1]} radius={[0, 4, 4, 0]} barSize={20} />
                 </BarChart>
              </ResponsiveContainer>
           </div>

           {/* Chart 4: License Usage */}
           <div className="h-80 rounded-2xl p-4 backdrop-blur-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <h4 className="text-xs font-bold uppercase mb-4 opacity-70">License Usage</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={licenseData}>
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{fontSize: 10, fill: style.colors.textSecondary}} stroke={style.colors.glassBorder} />
                    <Tooltip contentStyle={{backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary}} />
                    <Bar dataKey="value" fill={style.colors.chartColors[2]} radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Follow-up Questions */}
        <div className="rounded-2xl p-8 backdrop-blur-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-[var(--accent-color)]">?</span> {translations.distribution.followUp}
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FOLLOW_UP_QUESTIONS.map((q, i) => (
                 <div key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <span className="text-xs font-bold opacity-50 mt-1">{(i + 1).toString().padStart(2, '0')}</span>
                    <p className="text-sm font-medium leading-relaxed opacity-90">{q}</p>
                 </div>
              ))}
           </div>
        </div>
    </div>
  );
};