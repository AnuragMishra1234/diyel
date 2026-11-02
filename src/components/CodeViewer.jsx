import React, { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import { Copy, Check, FileCode } from 'lucide-react';

export default function CodeViewer({
  code,
  filename = 'program.py',
  onCopy,
  copied = false,
  copyError = null
}) {
  // Highlight code with Prism Python grammar
  const { highlightedCode, lineCount } = useMemo(() => {
    const highlighted = Prism.highlight(code, Prism.languages.python, 'python');
    const lines = code.split('\n');
    return {
      highlightedCode: highlighted,
      lineCount: lines.length,
    };
  }, [code]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [lineCount]);

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl transition-colors duration-200 light:bg-white light:border-zinc-200 light:shadow-md">
      {/* Editor Window Chrome / Header */}
      <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between gap-4 select-none light:bg-zinc-100 light:border-zinc-200">
        <div className="flex items-center gap-3">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs font-mono text-zinc-300 light:bg-white light:border-zinc-300 light:text-zinc-800 shadow-xs">
            <FileCode className="w-3.5 h-3.5 text-violet-400 light:text-violet-600" />
            <span>{filename}</span>
          </div>

          <span className="hidden sm:inline text-xs font-mono text-zinc-500 light:text-zinc-500">
            {lineCount} lines • Python 3
          </span>
        </div>

        {/* Header Copy Button */}
        <div className="flex items-center gap-2">
          {copyError && (
            <span className="text-xs text-rose-400 font-mono hidden sm:inline">
              {copyError}
            </span>
          )}
          <button
            onClick={onCopy}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:text-white light:bg-white light:hover:bg-zinc-50 light:text-zinc-700 light:border-zinc-300 light:hover:text-zinc-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 light:text-emerald-600" />
                <span className="text-emerald-400 light:text-emerald-600 font-bold">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400 light:text-zinc-500" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative flex overflow-x-auto custom-scrollbar font-mono text-xs sm:text-sm bg-zinc-950 light:bg-slate-50 transition-colors duration-200">
        {/* Sticky Line Number Gutter */}
        <div
          aria-hidden="true"
          className="sticky left-0 z-10 select-none py-4 pl-3 pr-4 text-right text-zinc-600 bg-zinc-950/95 border-r border-zinc-800/80 shrink-0 font-mono text-xs sm:text-sm light:bg-slate-100/95 light:text-slate-400 light:border-slate-200"
          style={{ minWidth: '3.5rem' }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6 text-zinc-600 light:text-slate-400 text-right select-none">
              {num}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="py-4 px-4 sm:px-6 leading-6 whitespace-pre font-mono text-zinc-100 light:text-slate-800 flex-1 overflow-visible">
          <code
            className="language-python block"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 py-2 bg-zinc-950/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            UTF-8
          </span>
          <span>Python 3.x</span>
          <span className="hidden sm:inline">Spaces: 4</span>
        </div>
        <div>
          <span>{code.length} characters</span>
        </div>
      </div>
    </div>
  );
}
