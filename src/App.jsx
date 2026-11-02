import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgramGrid from './components/ProgramGrid';
import ProgramDetail from './components/ProgramDetail';
import { programs } from './data/programs';
import { Terminal } from 'lucide-react';

export default function App() {
  // Theme state: 'dark' by default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dl_lab_theme') || 'dark';
  });

  // Selected program ID (1..8 or null for home)
  const [selectedId, setSelectedId] = useState(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      const match = programs.find(
        (p) => p.number === hash || String(p.id) === hash || p.number === hash.padStart(2, '0')
      );
      if (match) return match.id;
    }
    return null;
  });

  // Synchronize theme with HTML document class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('dl_lab_theme', theme);
  }, [theme]);

  // Synchronize URL hash with selected program
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setSelectedId(null);
        return;
      }
      const match = programs.find(
        (p) => p.number === hash || String(p.id) === hash || p.number === hash.padStart(2, '0')
      );
      if (match) {
        setSelectedId(match.id);
      } else {
        setSelectedId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectProgram = (program) => {
    setSelectedId(program.id);
    window.location.hash = program.number;
  };

  const handleBackToHome = () => {
    setSelectedId(null);
    window.location.hash = '';
  };

  // Find active program object
  const activeProgram = programs.find((p) => p.id === selectedId) || null;
  const activeIndex = activeProgram ? programs.findIndex((p) => p.id === selectedId) : -1;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < programs.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      const prevProgram = programs[activeIndex - 1];
      setSelectedId(prevProgram.id);
      window.location.hash = prevProgram.number;
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextProgram = programs[activeIndex + 1];
      setSelectedId(nextProgram.id);
      window.location.hash = nextProgram.number;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 selection:text-violet-200 transition-colors duration-200 light:bg-zinc-50 light:text-zinc-900">
      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onHomeClick={handleBackToHome}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeProgram ? (
          <ProgramDetail
            program={activeProgram}
            totalPrograms={programs.length}
            onBack={handleBackToHome}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        ) : (
          <ProgramGrid
            programs={programs}
            onSelectProgram={handleSelectProgram}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/60 light:bg-white light:border-zinc-200 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 light:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300 light:text-zinc-800 tracking-tight">
              DEEP LEARNING LAB
            </span>
            <span>•</span>
            <span>8 Essential Practical Programs</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500 light:text-zinc-600">
            <span>Static Client-Side Only</span>
            <span>•</span>
            <span>Zero Backend</span>
            <span>•</span>
            <span className="text-violet-400 light:text-violet-600">Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
