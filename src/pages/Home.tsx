import React, { useMemo } from 'react';
import { SeverityBadge } from '../components/SeverityBadge';
import { getAllPosts } from '../utils/post';
import { SITE_CONFIG } from '../config/site';

export const Home: React.FC<{ onSelectPost: (slug: string) => void }> = ({ onSelectPost }) => {
  const posts = useMemo(() => getAllPosts(), []);

  return (
    <div className="py-10 space-y-10">
      {/* Researcher Bio Card */}
      <section className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              {SITE_CONFIG.author}
            </h1>
            {SITE_CONFIG.tagline && (
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                "{SITE_CONFIG.tagline}"
              </span>
            )}
          </div>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            {SITE_CONFIG.role}
          </p>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          {SITE_CONFIG.bio}
        </p>

        <div className="flex items-center gap-3 pt-2 text-xs font-mono">
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
          >
            GitHub ↗
          </a>
          <a
            href={SITE_CONFIG.socials.hackerone}
            target="_blank"
            rel="noreferrer noopener"
            className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
          >
            HackerOne ↗
          </a>
        </div>
      </section>

      {/* Write-ups List */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500">
          Disclosed Write-Ups ({posts.length})
        </h2>

        {posts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onSelectPost(post.slug)}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-zinc-100 hover:text-emerald-400 transition">
                {post.title}
              </h3>
              <SeverityBadge severity={post.severity} cvss={post.cvss} />
            </div>

            {post.summary && (
              <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                {post.summary}
              </p>
            )}

            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
                {post.target}
              </span>
              <span>•</span>
              <time>{post.date}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};