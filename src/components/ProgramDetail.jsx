import React, { useState, useEffect, useCallback } from 'react';
import CodeViewer from './CodeViewer';
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  FileCode2,
  Share2,
  Terminal,
  Layers,
  AlertCircle
} from 'lucide-react';

export default function ProgramDetail({
  program,
  totalPrograms = 8,
  onBack,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(null);

  // Copy full source code using Clipboard API
  const handleCopyCode = useCallback(async () => {
    if (!program || !program.code) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(program.code);
      } else {
        // Fallback for non-secure / older browser contexts
        const textArea = document.createElement('textarea');
        textArea.value = program.code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) {
          throw new Error('Fallback clipboard copy failed.');
        }
      }

      setCopied(true);
      setCopyError(null);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      setCopyError('Could not copy automatically. Please select the code and copy manually.');
      setTimeout(() => setCopyError(null), 4000);
    }
  }, [program]);

  // Keyboard navigation: Escape -> Back, ArrowLeft -> Prev, ArrowRight -> Next
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, onPrev, onNext, hasPrev, hasNext]);

  // Scroll to top when program changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopied(false);
    setCopyError(null);
  }, [program.id]);

  const filename = `program_${program.number.toLowerCase()}_${program.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 20)}.py`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-zinc-800/80 light:border-zinc-200">
        {/* BACK TO PROGRAMS Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all shadow-sm light:bg-white light:text-zinc-700 light:hover:text-zinc-900 light:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PROGRAMS</span>
        </button>

        {/* Center Progress Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-xs text-zinc-400 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-600">
          <span>PROGRAM</span>
          <span className="font-bold text-violet-400 light:text-violet-700">{program.number}</span>
          <span>OF</span>
          <span>{String(totalPrograms).padStart(2, '0')}</span>
        </div>

        {/* PREV / NEXT Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Previous Program"
            title="Previous Program (Left Arrow)"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              hasPrev
                ? 'bg-zinc-900/80 text-zinc-200 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white light:bg-white light:text-zinc-700 light:border-zinc-300 light:hover:bg-zinc-100'
                : 'bg-zinc-900/30 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50 light:bg-zinc-100 light:text-zinc-400 light:border-zinc-200'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PREVIOUS</span>
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next Program"
            title="Next Program (Right Arrow)"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              hasNext
                ? 'bg-zinc-900/80 text-zinc-200 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white light:bg-white light:text-zinc-700 light:border-zinc-300 light:hover:bg-zinc-100'
                : 'bg-zinc-900/30 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50 light:bg-zinc-100 light:text-zinc-400 light:border-zinc-200'
            }`}
          >
            <span className="hidden sm:inline">NEXT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Program Header Info & Action */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 light:bg-white light:border-zinc-200 shadow-sm">
        <div className="space-y-3">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wider bg-violet-500/15 text-violet-300 border border-violet-500/30 light:bg-violet-100 light:text-violet-700 light:border-violet-300">
              <FileCode2 className="w-3.5 h-3.5 text-violet-400 light:text-violet-600" />
              PROGRAM {program.number}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {program.language || 'Python'} 3
            </span>

            {program.tags?.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 light:bg-zinc-100 light:text-zinc-600 light:border-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white light:text-zinc-900">
            {program.title}
          </h1>

          {/* Description */}
          {program.description && (
            <p className="text-sm text-zinc-400 light:text-zinc-600 max-w-3xl leading-relaxed">
              {program.description}
            </p>
          )}
        </div>

        {/* PROMINENT COPY FULL CODE BUTTON */}
        <div className="shrink-0 flex flex-col sm:items-end gap-2">
          <button
            onClick={handleCopyCode}
            aria-label="Copy Full Code to Clipboard"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold font-mono text-sm tracking-wide transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-950/40 focus:ring-emerald-500 scale-102'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/40 hover:shadow-violet-950/60 focus:ring-violet-500 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPY FULL CODE</span>
              </>
            )}
          </button>

          {copyError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{copyError}</span>
            </div>
          )}

          <div className="text-[11px] font-mono text-zinc-500 light:text-zinc-400 text-right">
            Copies complete Python script with exact indentation
          </div>
        </div>
      </div>

      {/* Complete Code Viewer */}
      <div className="mb-8">
        <CodeViewer
          code={program.code}
          filename={filename}
          onCopy={handleCopyCode}
          copied={copied}
          copyError={copyError}
        />
      </div>

      {/* Bottom Navigation & Fast Jumps */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80 light:border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all light:bg-white light:text-zinc-700 light:border-zinc-300 light:hover:bg-zinc-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL PROGRAMS</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {hasPrev && (
            <button
              onClick={onPrev}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900/80 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white transition-all light:bg-white light:text-zinc-700 light:border-zinc-300 light:hover:bg-zinc-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-md focus:ring-2 focus:ring-violet-500"
            >
              <span>NEXT PROGRAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
