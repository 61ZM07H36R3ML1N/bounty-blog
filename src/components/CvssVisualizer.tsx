import React, { useState } from 'react';

interface MetricItem {
  label: string;
  key: string;
  options: { label: string; value: string; desc: string }[];
}

const METRICS: MetricItem[] = [
  {
    label: 'Attack Vector (AV)',
    key: 'av',
    options: [
      { label: 'Network', value: 'N', desc: 'Remotely exploitable across the internet' },
      { label: 'Adjacent', value: 'A', desc: 'Requires shared local network / intranet' },
      { label: 'Local', value: 'L', desc: 'Requires local access or user interaction' },
    ],
  },
  {
    label: 'Attack Complexity (AC)',
    key: 'ac',
    options: [
      { label: 'Low', value: 'L', desc: 'No specialized condition or race window' },
      { label: 'High', value: 'H', desc: 'Depends on timing conditions or bypasses' },
    ],
  },
  {
    label: 'Privileges Required (PR)',
    key: 'pr',
    options: [
      { label: 'None', value: 'N', desc: 'Unauthenticated attacker' },
      { label: 'Low', value: 'L', desc: 'Standard registered user / basic tenant' },
      { label: 'High', value: 'H', desc: 'Administrative / elevated operator' },
    ],
  },
  {
    label: 'User Interaction (UI)',
    key: 'ui',
    options: [
      { label: 'None', value: 'N', desc: 'Exploit succeeds with zero user action' },
      { label: 'Required', value: 'R', desc: 'Victim must click link or perform action' },
    ],
  },
];

export const CvssVisualizer: React.FC<{
  score: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  vectorString?: string;
  initialValues?: { av?: string; ac?: string; pr?: string; ui?: string };
}> = ({ score, severity, vectorString = 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N', initialValues = { av: 'N', ac: 'L', pr: 'N', ui: 'N' } }) => {
  const [selected, setSelected] = useState(initialValues);

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'Critical': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'High': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    }
  };

  return (
    <div className="my-6 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 space-y-4 font-mono">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-zinc-200 font-bold text-sm">Severity Metric Breakdown</span>
          <span className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${getSeverityColor(severity)}`}>
            {severity} ({score.toFixed(1)})
          </span>
        </div>
        <div className="text-xs text-zinc-500 truncate max-w-xs">{vectorString}</div>
      </div>

      {/* Metric Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {METRICS.map((metric) => (
          <div key={metric.key} className="space-y-1.5">
            <span className="text-xs text-zinc-400">{metric.label}</span>
            <div className="flex gap-1.5">
              {metric.options.map((opt) => {
                const isActive = (selected as any)[metric.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    title={opt.desc}
                    onClick={() => setSelected({ ...selected, [metric.key]: opt.value })}
                    className={`flex-1 py-1 px-2 rounded text-xs transition border ${
                      isActive
                        ? 'bg-zinc-800 text-emerald-400 border-emerald-500/40 font-bold'
                        : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};