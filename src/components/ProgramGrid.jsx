import React, { useState, useMemo } from 'react';
import ProgramCard from './ProgramCard';
import { Search, X, Sparkles, Code, Cpu, BookOpen, Layers } from 'lucide-react';

export default function ProgramGrid({ programs, onSelectProgram }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter programs by title, number, or tags
  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return programs;

    // Direct program number matching (e.g. "1", "01", "8", "08")
    if (/^0?[1-8]$/.test(q)) {
      const targetId = parseInt(q, 10);
      return programs.filter((p) => p.id === targetId);
    }

    return programs.filter((p) => {
      const matchNumber = p.number.toLowerCase().includes(q) || `program ${p.number}`.toLowerCase().includes(q);
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
      const matchDesc = p.description?.toLowerCase().includes(q);
      return matchNumber || matchTitle || matchTags || matchDesc;
    });
  }, [programs, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero / Intro section */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800/80 light:border-zinc-200 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-3 light:bg-violet-100 light:text-violet-700 light:border-violet-200">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Complete Practical Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white light:text-zinc-900">
            Deep Learning Lab Programs
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 light:text-zinc-600 max-w-2xl">
            Quickly access, inspect, understand, and copy all 8 Python deep learning experiments. Formatted with clean syntax highlighting and 100% verified Python 3 source code.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono text-zinc-400 light:text-zinc-500 shrink-0">
          <div className="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 light:bg-white light:border-zinc-200 text-center">
            <div className="text-lg font-bold text-white light:text-zinc-900">8</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Programs</div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 light:bg-white light:border-zinc-200 text-center">
            <div className="text-lg font-bold text-violet-400 light:text-violet-600">Python 3</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">TensorFlow/Keras</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by program number or title (e.g., CNN, LSTM, 01)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900/80 text-zinc-100 placeholder-zinc-500 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-sm transition-all light:bg-white light:text-zinc-900 light:placeholder-zinc-400 light:border-zinc-300 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-white light:hover:text-zinc-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Programs */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onSelect={onSelectProgram}
            />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="text-center py-16 px-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 light:bg-zinc-50 light:border-zinc-200">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-zinc-800/60 text-zinc-400 mb-4 light:bg-zinc-200 light:text-zinc-600">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-zinc-200 light:text-zinc-900">
            No programs found
          </h3>
          <p className="mt-1 text-sm text-zinc-400 light:text-zinc-600 max-w-sm mx-auto">
            No matching lab programs found for "{searchQuery}". Try searching by program number (e.g. 01, 02) or keywords like CNN, LSTM, Word2Vec.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
