import React from 'react';
import type { SeverityLevel } from '../types/post';

const SEVERITY_STYLES: Record<SeverityLevel, string> = {
  Low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const SeverityBadge: React.FC<{ severity: SeverityLevel; cvss?: number }> = ({ severity, cvss }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${SEVERITY_STYLES[severity]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity} {cvss ? `(${cvss.toFixed(1)})` : ''}
    </span>
  );
};