import React from 'react';
import { SITE_CONFIG } from '../config/site';

export const Header: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="text-zinc-100 font-mono font-bold tracking-tight hover:text-emerald-400 transition"
        >
          ~/bounty-writeups$
        </button>

        <nav className="flex items-center gap-5 text-sm text-zinc-400">
          {/* GitHub Link */}
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 hover:text-zinc-100 transition"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline font-mono">GitHub</span>
          </a>

          {/* HackerOne Link */}
          <a
            href={SITE_CONFIG.socials.hackerone}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 hover:text-zinc-100 transition"
            aria-label="HackerOne Profile"
          >
            {/* HackerOne H1 Monogram */}
            <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              h1
            </span>
            <span className="hidden sm:inline font-mono">HackerOne</span>
          </a>
        </nav>
      </div>
    </header>
  );
};