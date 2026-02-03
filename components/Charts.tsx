import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2'; // Wait, I should use Recharts as per instruction.
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar as RechartsBar, XAxis, YAxis
} from 'recharts';
import { PainterStyle, Translations } from '../types';

interface ChartsProps {
  style: PainterStyle;
  translations: Translations;
}

const dataDistribution = [
  { name: '510(k)', value: 1 },
  { name: 'ADR', value: 1 },
  { name: 'Recall', value: 1 },
  { name: 'GUDID', value: 2 },
];

const dataTimeline = [
  { date: '2023-04-05', event: 'Recall: Mock Ventilator, Class I', type: 'recall' },
  { date: '2023-03-10', event: 'ADR: Stent Fracture (Mock Stent)', type: 'adr' },
  { date: '2023-01-15', event: '510(k): Mock Syringe Pump', type: '510k' },
];

const dataDeviceClass = [
  { name: 'Class II', value: 100 },
];
const dataRecallSeverity = [
  { name: 'Class I', value: 100 },
];

export const ChartsSection: React.FC<ChartsProps> = ({ style, translations }) => {
  const COLORS = style.colors.chartColors;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Record Type Donut */}
      <div 
        className="rounded-2xl p-5 md:col-span-1 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{translations.recordTypeDist}</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {dataDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary }}
                itemStyle={{ color: style.colors.textPrimary }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline */}
      <div 
        className="rounded-2xl p-5 md:col-span-1 backdrop-blur-xl border transition-all duration-500 overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{translations.timeline}</h3>
        <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {dataTimeline.map((item, idx) => (
            <div key={idx} className="border-l-2 pl-4 py-1 relative" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div 
                className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-2 ring-opacity-20"
                style={{ backgroundColor: style.colors.accent, ringColor: style.colors.accent }}
              ></div>
              <p className="text-[10px] font-bold uppercase opacity-80" style={{ color: style.colors.accent }}>{item.date}</p>
              <p className="text-xs mt-0.5">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Small Bars */}
      <div 
        className="rounded-2xl p-5 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{translations.deviceClass}</h3>
        <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
                <span>Class II</span>
                <span style={{ color: style.colors.accent }}>100%</span>
            </div>
            <div className="w-full bg-[rgba(0,0,0,0.3)] h-2 rounded-full overflow-hidden">
                <div className="h-full w-full rounded-full" style={{ backgroundColor: style.colors.accent }}></div>
            </div>
        </div>
      </div>

       <div 
        className="rounded-2xl p-5 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{translations.recallSeverity}</h3>
        <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
                <span>Class I</span>
                <span style={{ color: style.colors.accent }}>100%</span>
            </div>
            <div className="w-full bg-[rgba(0,0,0,0.3)] h-2 rounded-full overflow-hidden">
                <div className="h-full w-full rounded-full" style={{ backgroundColor: style.colors.accent }}></div>
            </div>
        </div>
      </div>

      {/* Decision Chart */}
      <div 
        className="rounded-2xl p-5 md:col-span-2 backdrop-blur-xl border transition-all duration-500"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">{translations.decisionCode}</h3>
        <div className="h-32 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{name: 'Substantially Equivalent', value: 1}]} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={150} tick={{fill: style.colors.textSecondary, fontSize: 10}} interval={0} />
              <Tooltip 
                 cursor={{fill: 'rgba(255,255,255,0.05)'}}
                 contentStyle={{ backgroundColor: style.colors.bgGradientStart, borderColor: style.colors.glassBorder, color: style.colors.textPrimary }}
              />
              <RechartsBar dataKey="value" fill={style.colors.accent} barSize={20} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};