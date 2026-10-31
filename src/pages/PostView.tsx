import React, { Suspense, lazy } from 'react';

export const PostView: React.FC<{ slug: string; onBack: () => void }> = ({ slug, onBack }) => {
  const PostComponent = lazy(() => import(`../../content/posts/${slug}.mdx`));

  return (
    <article className="py-8">
      <button
        onClick={onBack}
        className="text-sm font-mono text-zinc-400 hover:text-emerald-400 mb-6 flex items-center gap-1.5 transition"
      >
        ← cd ..
      </button>

      <Suspense fallback={<div className="text-zinc-500 font-mono">Loading writeup...</div>}>
        <div className="prose prose-invert prose-zinc max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
          <PostComponent />
        </div>
      </Suspense>
    </article>
  );
};