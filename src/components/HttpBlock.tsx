import React, { useState } from 'react';

interface HttpBlockProps {
  method?: string;
  url?: string;
  raw: string;
  title?: string;
}

export const HttpBlock: React.FC<HttpBlockProps> = ({
  method = 'POST',
  url = 'https://api.target.com/endpoint',
  raw,
  title = 'HTTP Request PoC',
}) => {
  const [copiedType, setCopiedType] = useState<'raw' | 'curl' | null>(null);

  // Converts standard HTTP raw capture into an executable cURL command
  const generateCurl = (): string => {
    const lines = raw.trim().split('\n');
    const firstLine = lines[0] || '';
    const [reqMethod, path] = firstLine.split(' ');

    const headers: string[] = [];
    const bodyLines: string[] = [];
    let isBody = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '' && !isBody) {
        isBody = true;
        continue;
      }
      if (isBody) {
        bodyLines.push(line);
      } else if (line.includes(':')) {
        headers.push(`-H "${line.trim().replace(/"/g, '\\"')}"`);
      }
    }

    const targetUrl = url.startsWith('http') ? url : `https://${url}${path || ''}`;
    let curlCmd = `curl -X ${reqMethod || method} "${targetUrl}" \\\n  ${headers.join(' \\\n  ')}`;

    if (bodyLines.length > 0) {
      const data = bodyLines.join('\n').replace(/"/g, '\\"');
      curlCmd += ` \\\n  --data "${data}"`;
    }

    return curlCmd;
  };

  const handleCopy = (text: string, type: 'raw' | 'curl') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs overflow-hidden shadow-lg">
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-zinc-300 font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(raw.trim(), 'raw')}
            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
          >
            {copiedType === 'raw' ? '✓ Copied Raw' : 'Copy HTTP'}
          </button>
          <button
            onClick={() => handleCopy(generateCurl(), 'curl')}
            className="px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/50 transition"
          >
            {copiedType === 'curl' ? '✓ Copied cURL' : 'Copy as cURL'}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed font-mono selection:bg-emerald-900 selection:text-emerald-200">
        <code>{raw.trim()}</code>
      </pre>
    </div>
  );
};