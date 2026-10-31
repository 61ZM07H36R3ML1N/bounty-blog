import { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PostView } from './pages/PostView';

export function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Header onNavigateHome={() => setActiveSlug(null)} />
      <main className="max-w-4xl mx-auto px-4">
        {activeSlug ? (
          <PostView slug={activeSlug} onBack={() => setActiveSlug(null)} />
        ) : (
          <Home onSelectPost={(slug) => setActiveSlug(slug)} />
        )}
      </main>
    </div>
  );
}

export default App;