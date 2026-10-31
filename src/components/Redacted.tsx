import React, { useState } from 'react';

interface RedactedProps {
  label?: string;
  value?: string;
}

export const Redacted: React.FC<RedactedProps> = ({
  label = 'REDACTED',
  value = 'uuid_88420_secret',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => setIsRevealed(!isRevealed)}
      onKeyDown={(e) => e.key === 'Enter' && setIsRevealed(!isRevealed)}
      title="Click to toggle redacted value"
      className="inline-flex items-center cursor-pointer select-none font-mono text-xs px-2 py-0.5 mx-1 rounded border transition-all duration-200 border-zinc-700 bg-zinc-900 group"
    >
      <span className="text-zinc-500 mr-1.5 font-semibold text-[10px] tracking-wide uppercase">
        {label}:
      </span>
      <span
        className={`transition-all duration-200 ${
          isRevealed
            ? 'filter-none text-emerald-400 font-bold'
            : 'filter blur-[3.5px] opacity-70 text-zinc-300 group-hover:blur-[1.5px]'
        }`}
      >
        {isRevealed ? value : '••••••••••••'}
      </span>
    </span>
  );
};