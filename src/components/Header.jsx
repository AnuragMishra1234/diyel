import React from 'react';
import { Terminal, Sun, Moon, BookOpen, Layers } from 'lucide-react';

export default function Header({ theme, onToggleTheme, onHomeClick }) {
  return (
    <header className="sticky top-0 z-30 border-b transition-colors duration-200 backdrop-blur-md bg-zinc-950/80 border-zinc-800/80 light:bg-white/80 light:border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-1 -ml-1 transition-all"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/30 text-violet-400 group-hover:scale-105 group-hover:bg-violet-500/20 group-hover:border-violet-500/50 transition-all shadow-sm">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg text-white light:text-zinc-900 group-hover:text-violet-400 transition-colors">
                DEEP LEARNING LAB
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet-500/15 text-violet-300 border border-violet-500/30 light:bg-violet-100 light:text-violet-700 light:border-violet-200">
                8 PROGRAMS
              </span>
            </div>
            <p className="text-xs text-zinc-400 light:text-zinc-500 hidden sm:block">
              Your 8 essential Python lab programs in one place.
            </p>
          </div>
        </button>

        {/* Actions / Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 transition-all light:bg-zinc-100 light:text-zinc-600 light:hover:text-zinc-900 light:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-violet-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
