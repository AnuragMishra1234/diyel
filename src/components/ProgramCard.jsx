import React, { useState } from 'react';
import { ArrowRight, Code2, Copy, Check, FileCode2, Layers } from 'lucide-react';

export default function ProgramCard({ program, onSelect }) {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(program.code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = program.code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Quick copy error:', err);
    }
  };

  const lineCount = program.code.split('\n').length;

  return (
    <div
      onClick={() => onSelect(program)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(program);
        }
      }}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-violet-500/50 transition-all duration-200 cursor-pointer text-left shadow-sm hover:shadow-xl hover:shadow-violet-950/20 light:bg-white light:border-zinc-200 light:hover:border-violet-400 light:hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Top Bar: Program Number & Quick Copy */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wider bg-zinc-800/80 text-violet-400 border border-zinc-700/60 light:bg-violet-50 light:text-violet-700 light:border-violet-200">
            <FileCode2 className="w-3.5 h-3.5 text-violet-400 light:text-violet-600" />
            PROGRAM {program.number}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 light:text-zinc-400 hidden sm:inline">
            {lineCount} lines
          </span>
        </div>

        {/* Quick Copy Button */}
        <button
          onClick={handleQuickCopy}
          aria-label={`Copy source code for Program ${program.number}`}
          title="Quick Copy Code"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/40 transition-colors light:bg-zinc-100 light:text-zinc-600 light:hover:text-zinc-900 light:border-zinc-300"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 px-1">
              <Check className="w-3.5 h-3.5" />
              Copied
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Program Title */}
      <div className="mb-4 flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-100 light:text-zinc-900 group-hover:text-violet-300 light:group-hover:text-violet-700 transition-colors line-clamp-2">
          {program.title}
        </h3>
        {program.description && (
          <p className="mt-1.5 text-xs text-zinc-400 light:text-zinc-600 line-clamp-2 leading-relaxed">
            {program.description}
          </p>
        )}
      </div>

      {/* Tags & Action Indicator */}
      <div className="pt-3 border-t border-zinc-800/60 light:border-zinc-100 flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1.5">
          {program.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 light:bg-zinc-100 light:text-zinc-600 light:border-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-violet-400 group-hover:text-violet-300 light:text-violet-600 font-medium text-xs group-hover:translate-x-0.5 transition-transform">
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
