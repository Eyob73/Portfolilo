"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "./Icon";

interface CodeToken {
  text: string;
  className: string;
}

interface CodeLine {
  indentClass?: string;
  tokens: CodeToken[];
}

const SERVICE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: "// Clean Architecture • Transactional CQRS", className: "text-outline text-[11px] italic" },
    ],
  },
  {
    tokens: [
      { text: "public sealed class ", className: "text-secondary font-semibold" },
      { text: "ProcessStockCommand ", className: "text-primary font-bold" },
      { text: ": ", className: "text-on-surface" },
      { text: "IRequest", className: "text-tertiary" },
      { text: "<", className: "text-outline" },
      { text: "Result", className: "text-tertiary" },
      { text: ">", className: "text-outline" },
    ],
  },
  {
    tokens: [{ text: "{", className: "text-on-surface" }],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "public ", className: "text-secondary" },
      { text: "Guid ", className: "text-tertiary" },
      { text: "ProductId ", className: "text-on-surface" },
      { text: "{ get; init; }", className: "text-on-surface-variant" },
    ],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "public int ", className: "text-secondary" },
      { text: "Quantity ", className: "text-on-surface" },
      { text: "{ get; init; }", className: "text-on-surface-variant" },
    ],
  },
  {
    tokens: [{ text: "}", className: "text-on-surface" }],
  },
  {
    tokens: [
      { text: "public async Task", className: "text-secondary font-semibold" },
      { text: "<Result> ", className: "text-tertiary" },
      { text: "Handle", className: "text-primary font-bold" },
      { text: "(", className: "text-on-surface" },
      { text: "ProcessStockCommand ", className: "text-tertiary" },
      { text: "cmd, ", className: "text-on-surface" },
      { text: "CancellationToken ", className: "text-tertiary" },
      { text: "ct)", className: "text-on-surface" },
    ],
  },
  {
    tokens: [{ text: "{", className: "text-on-surface" }],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "await ", className: "text-secondary font-semibold" },
      { text: "_db.", className: "text-on-surface" },
      { text: "ExecuteTransactionAsync", className: "text-primary font-medium" },
      { text: "(async () => {", className: "text-on-surface" },
    ],
  },
  {
    indentClass: "pl-8",
    tokens: [
      { text: "return await ", className: "text-secondary font-semibold" },
      { text: "_inventory.", className: "text-on-surface" },
      { text: "DeductAsync", className: "text-primary font-medium" },
      { text: "(cmd.ProductId, cmd.Quantity, ct);", className: "text-on-surface" },
    ],
  },
  {
    indentClass: "pl-4",
    tokens: [{ text: "});", className: "text-on-surface" }],
  },
  {
    tokens: [{ text: "}", className: "text-on-surface" }],
  },
];

const REPO_LINES: CodeLine[] = [
  {
    tokens: [
      { text: "// Relational Data Access Contract for PostgreSQL", className: "text-outline text-[11px] italic" },
    ],
  },
  {
    tokens: [
      { text: "public interface ", className: "text-secondary font-semibold" },
      { text: "IInventoryRepository", className: "text-primary font-bold" },
    ],
  },
  {
    tokens: [{ text: "{", className: "text-on-surface" }],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "Task", className: "text-tertiary" },
      { text: "<StockEntity?> ", className: "text-tertiary" },
      { text: "GetByIdAsync", className: "text-primary font-medium" },
      { text: "(Guid id, CancellationToken ct = default);", className: "text-on-surface" },
    ],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "Task", className: "text-tertiary" },
      { text: "<bool> ", className: "text-secondary font-semibold" },
      { text: "DeductAsync", className: "text-primary font-medium" },
      { text: "(Guid productId, int qty, CancellationToken ct = default);", className: "text-on-surface" },
    ],
  },
  {
    indentClass: "pl-4",
    tokens: [
      { text: "Task", className: "text-tertiary" },
      { text: "<int> ", className: "text-secondary font-semibold" },
      { text: "ExecuteTransactionAsync", className: "text-primary font-medium" },
      { text: "(Func<Task<int>> action);", className: "text-on-surface" },
    ],
  },
  {
    tokens: [{ text: "}", className: "text-on-surface" }],
  },
];

function computeFullText(lines: CodeLine[]): string {
  return lines.map((line) => line.tokens.map((t) => t.text).join("")).join("\n");
}

function computeLineRanges(lines: CodeLine[]) {
  const ranges: { start: number; end: number; length: number }[] = [];
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    const length = lines[i].tokens.reduce((acc, t) => acc + t.text.length, 0);
    const start = offset;
    const end = offset + length;
    ranges.push({ start, end, length });
    offset = end + 1; // +1 for newline
  }
  return ranges;
}

const SERVICE_FULL_TEXT = computeFullText(SERVICE_LINES);
const REPO_FULL_TEXT = computeFullText(REPO_LINES);

const SERVICE_RANGES = computeLineRanges(SERVICE_LINES);
const REPO_RANGES = computeLineRanges(REPO_LINES);

export const HeroIllustration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"service" | "repo">("service");
  const [typedChars, setTypedChars] = useState(0);

  const currentLines = activeTab === "service" ? SERVICE_LINES : REPO_LINES;
  const fullText = activeTab === "service" ? SERVICE_FULL_TEXT : REPO_FULL_TEXT;
  const lineRanges = activeTab === "service" ? SERVICE_RANGES : REPO_RANGES;
  const totalChars = fullText.length;

  // Typing animation effect with natural human typing pauses
  useEffect(() => {
    if (typedChars >= totalChars) {
      // Pause for 5 seconds when complete, then automatically cycle to the other tab
      const holdTimer = setTimeout(() => {
        setActiveTab((prev) => (prev === "service" ? "repo" : "service"));
        setTypedChars(0);
      }, 5000);
      return () => clearTimeout(holdTimer);
    }

    const currentChar = fullText[typedChars] || "";
    let delay = 18;

    if (currentChar === "\n") {
      delay = 140;
    } else if (currentChar === ";" || currentChar === "}") {
      delay = 180;
    } else if (currentChar === " ") {
      delay = 10;
    }

    const timer = setTimeout(() => {
      setTypedChars((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [typedChars, totalChars, fullText]);

  // Compute active line index for gutter highlight
  const activeLineIndex = useMemo(() => {
    for (let i = 0; i < lineRanges.length; i++) {
      if (typedChars <= lineRanges[i].end) {
        return i;
      }
    }
    return lineRanges.length - 1;
  }, [lineRanges, typedChars]);

  const handleTabClick = (tab: "service" | "repo") => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setTypedChars(0);
    }
  };

  const isTypingComplete = typedChars >= totalChars;

  return (
    <div
      className="relative w-full max-w-[580px] mx-auto flex flex-col items-center select-none py-4"
      aria-label="Code and Software Architecture Illustration"
    >
      {/* ================= 1. AMBIENT ATMOSPHERIC NEON GLOWS ================= */}
      <div
        className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-primary/20 dark:bg-primary/[0.12] blur-[80px] pointer-events-none -z-10 animate-pulse duration-[7000ms]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-secondary/20 dark:bg-secondary/[0.12] blur-[80px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* ================= 2. BACKGROUND TECHNICAL SCHEMATIC GRID & FLOW BEAMS ================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible"
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flowBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary, #4fdbc8)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-primary, #4fdbc8)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-secondary, #44e2cd)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wireGrid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary, #4fdbc8)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--color-primary, #4fdbc8)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary, #4fdbc8)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Perspective Grid Horizon Lines */}
        <line x1="20" y1="460" x2="580" y2="460" stroke="url(#wireGrid)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="40" y1="485" x2="560" y2="485" stroke="url(#wireGrid)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="80" y1="510" x2="520" y2="510" stroke="url(#wireGrid)" strokeWidth="1" strokeDasharray="3 6" />

        {/* Dynamic Data Rays connecting satellites to editor */}
        <path
          d="M 60 70 C 100 70, 110 120, 150 120"
          stroke="url(#flowBeam)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 540 65 C 500 65, 480 115, 440 115"
          stroke="url(#flowBeam)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 460 380 C 490 410, 500 430, 510 445"
          stroke="url(#flowBeam)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 140 380 C 110 410, 100 430, 90 445"
          stroke="url(#flowBeam)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* ================= 3. TOP ORBITING SATELLITE BADGES ================= */}
      <div className="w-full flex items-center justify-between px-2 sm:px-4 mb-3 relative z-20">
        {/* Left Badge: Clean Architecture Glyphs */}
        <div className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-surface-container/80 dark:bg-surface-container/70 backdrop-blur-md shadow-lg shadow-primary/5 transition-transform hover:-translate-y-0.5 duration-300">
          <span className="font-mono text-sm font-bold text-primary drop-shadow-[0_0_6px_rgba(79,219,200,0.6)]">
            {"{ }"}
          </span>
          <div className="flex flex-col">
            <span className="font-label-mono text-[10px] font-semibold text-on-surface tracking-wider uppercase">
              Clean Architecture
            </span>
            <span className="font-label-mono text-[9px] text-outline">
              CQRS • Domain Driven
            </span>
          </div>
        </div>

        {/* Right Badge: Type-Safe / ASP.NET 8 */}
        <div className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-secondary/30 bg-surface-container/80 dark:bg-surface-container/70 backdrop-blur-md shadow-lg shadow-secondary/5 transition-transform hover:-translate-y-0.5 duration-300">
          <span className="font-mono text-xs font-bold text-secondary drop-shadow-[0_0_6px_rgba(68,226,205,0.6)]">
            &lt;/&gt;
          </span>
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-mono text-[10px] font-semibold text-primary tracking-wide">
                Type-Safe
              </span>
            </div>
            <span className="font-label-mono text-[9px] text-outline">
              .NET 8.0 • C# Strict
            </span>
          </div>
        </div>
      </div>

      {/* ================= 4. THE CORE CODE EDITOR WINDOW ================= */}
      <div className="w-full rounded-2xl border border-primary/30 dark:border-primary/20 bg-surface-container-lowest/90 dark:bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden relative z-10 transition-all duration-300 hover:border-primary/50 group">
        {/* Editor Chrome Top Bar */}
        <div className="px-3 sm:px-4 py-2.5 bg-surface-container/90 border-b border-outline-variant/30 flex items-center justify-between gap-2">
          {/* Traffic Light Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors" />
          </div>

          {/* Interactive File Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
            <button
              type="button"
              onClick={() => handleTabClick("service")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                activeTab === "service"
                  ? "bg-surface-container-lowest text-primary border border-primary/30 shadow-sm"
                  : "text-outline hover:text-on-surface hover:bg-surface-container-high/50"
              }`}
            >
              <span className="text-[11px] text-primary font-bold">#</span>
              <span>OrderProcessingService.cs</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabClick("repo")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                activeTab === "repo"
                  ? "bg-surface-container-lowest text-primary border border-primary/30 shadow-sm"
                  : "text-outline hover:text-on-surface hover:bg-surface-container-high/50"
              }`}
            >
              <span className="text-[11px] text-secondary font-bold">#</span>
              <span>IInventoryRepository.cs</span>
            </button>
          </div>

          {/* Runtime Pill */}
          <div className="flex items-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/25">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isTypingComplete ? "bg-primary" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span>.NET 8</span>
            </div>
          </div>
        </div>

        {/* Code Canvas Body with rock-solid stable height */}
        <div className="p-3 sm:p-4 text-xs sm:text-[13px] font-mono leading-relaxed overflow-x-auto text-on-surface flex gap-3 sm:gap-4 min-h-[300px] sm:min-h-[320px]">
          {/* Line Numbers Gutter */}
          <div
            className="text-outline/40 select-none text-right flex flex-col space-y-0.5 text-xs font-mono pr-2 border-r border-outline-variant/20 min-w-[28px]"
            aria-hidden="true"
          >
            {currentLines.map((_, i) => {
              const numStr = String(i + 1).padStart(2, "0");
              const isCurrent = i === activeLineIndex && !isTypingComplete;
              const isEntered = i <= activeLineIndex;
              return (
                <span
                  key={i}
                  className={`min-h-[20px] flex items-center justify-end transition-all duration-200 ${
                    !isEntered
                      ? "opacity-0 select-none pointer-events-none"
                      : isCurrent
                      ? "text-primary font-bold drop-shadow-[0_0_6px_rgba(79,219,200,0.6)] scale-105"
                      : "text-on-surface-variant opacity-70"
                  }`}
                >
                  {numStr}
                </span>
              );
            })}
          </div>

          {/* Syntax Highlighted Lines rendered with live typing effect */}
          <div className="space-y-0.5 flex-1 min-w-[280px]">
            {currentLines.map((line, lineIndex) => {
              const range = lineRanges[lineIndex];
              const isCurrentActiveLine = lineIndex === activeLineIndex && !isTypingComplete;

              // 1. Line not reached yet
              if (typedChars < range.start) {
                return (
                  <div key={lineIndex} className="min-h-[20px] select-none opacity-0">
                    &nbsp;
                  </div>
                );
              }

              // 2. Line completely typed
              if (typedChars >= range.end) {
                const isVeryLastLine = lineIndex === currentLines.length - 1;
                return (
                  <div
                    key={lineIndex}
                    className={`min-h-[20px] whitespace-pre transition-colors ${
                      line.indentClass || ""
                    }`}
                  >
                    {line.tokens.map((token, tIdx) => (
                      <span key={tIdx} className={token.className}>
                        {token.text}
                      </span>
                    ))}
                    {isVeryLastLine && isTypingComplete && (
                      <span className="inline-block w-1.5 h-3.5 bg-primary align-middle ml-0.5 animate-pulse shadow-[0_0_8px_rgba(79,219,200,0.8)]" />
                    )}
                  </div>
                );
              }

              // 3. Line actively typing
              let charsRemaining = typedChars - range.start;
              const elements: React.ReactNode[] = [];

              for (let tIdx = 0; tIdx < line.tokens.length; tIdx++) {
                const token = line.tokens[tIdx];
                if (charsRemaining <= 0) break;

                if (charsRemaining >= token.text.length) {
                  elements.push(
                    <span key={tIdx} className={token.className}>
                      {token.text}
                    </span>
                  );
                  charsRemaining -= token.text.length;
                } else {
                  elements.push(
                    <span key={tIdx} className={token.className}>
                      {token.text.slice(0, charsRemaining)}
                    </span>
                  );
                  charsRemaining = 0;
                  break;
                }
              }

              return (
                <div
                  key={lineIndex}
                  className={`min-h-[20px] whitespace-pre transition-colors ${
                    line.indentClass || ""
                  } ${isCurrentActiveLine ? "bg-primary/[0.06] -mx-2 px-2 rounded border-l-2 border-primary" : ""}`}
                >
                  {elements}
                  <span className="inline-block w-1.5 h-3.5 bg-primary align-middle ml-0.5 animate-pulse shadow-[0_0_8px_rgba(79,219,200,0.8)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal Status Bar Footer */}
        <div className="px-3 sm:px-4 py-2 bg-surface-container-low/90 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span
              className={`w-2 h-2 rounded-full ${
                isTypingComplete ? "bg-primary" : "bg-amber-400 animate-pulse"
              }`}
            />
            <span className="text-outline">
              {isTypingComplete
                ? "All 48 Integration Tests Passing"
                : `Writing ${activeTab === "service" ? "OrderProcessingService" : "IInventoryRepository"}...`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-outline">P99: 14ms</span>
            <span className="text-outline/40">|</span>
            <span className="text-primary font-semibold">
              {isTypingComplete ? "0 errors • 0 warnings" : "type-check ok"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= 5. BOTTOM ARCHITECTURAL INFRASTRUCTURE ================= */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 relative z-20">
        {/* Left Card: Git Commit Branching Tree */}
        <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container/70 dark:bg-surface-container/60 backdrop-blur-md flex flex-col justify-between transition-transform hover:-translate-y-0.5 duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-label-mono text-[10px] text-outline uppercase tracking-wider">
              <Icon name="commit" className="text-primary text-[14px]" />
              <span>Git Graph • main</span>
            </div>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
              v2.6.0-prod
            </span>
          </div>

          {/* Visual SVG Git Tree */}
          <div className="flex items-center gap-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 240 32" fill="none">
              {/* Main Line */}
              <line x1="10" y1="16" x2="230" y2="16" stroke="var(--color-primary, #4fdbc8)" strokeWidth="2" strokeOpacity="0.8" />
              {/* Feature Branch Arc */}
              <path
                d="M 60 16 C 80 16, 90 28, 110 28 L 150 28 C 170 28, 180 16, 200 16"
                stroke="var(--color-secondary, #44e2cd)"
                strokeWidth="1.8"
                strokeDasharray="2 2"
              />
              {/* Commits on Main */}
              <circle cx="20" cy="16" r="4.5" fill="var(--color-surface, #111317)" stroke="var(--color-primary, #4fdbc8)" strokeWidth="2" />
              <circle cx="60" cy="16" r="4" fill="var(--color-primary, #4fdbc8)" />
              <circle cx="200" cy="16" r="5" fill="var(--color-primary, #4fdbc8)" />
              <circle cx="200" cy="16" r="2" fill="#fff" />
              {/* Commits on Feature */}
              <circle cx="110" cy="28" r="3.5" fill="var(--color-secondary, #44e2cd)" />
              <circle cx="150" cy="28" r="3.5" fill="var(--color-secondary, #44e2cd)" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-outline mt-1 pt-1 border-t border-outline-variant/20">
            <span className="text-secondary font-medium">feat: stock-cqrs</span>
            <span className="text-outline">#c7e2b19</span>
          </div>
        </div>

        {/* Right Card: PostgreSQL Persistence Cluster */}
        <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container/70 dark:bg-surface-container/60 backdrop-blur-md flex flex-col justify-between transition-transform hover:-translate-y-0.5 duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-label-mono text-[10px] text-outline uppercase tracking-wider">
              <Icon name="database" className="text-secondary text-[14px]" />
              <span>PostgreSQL Cluster</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-[9px] text-primary">Connected</span>
            </div>
          </div>

          {/* Database Disk Tier Graphic */}
          <div className="flex items-center justify-between py-1 px-1">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] font-bold text-on-surface">
                PRIMARY_DB // WAL
              </span>
              <span className="font-mono text-[10px] text-outline">
                Connection Pool: 32 / 32
              </span>
            </div>
            <div className="px-2 py-1 rounded bg-surface-container-high border border-outline-variant/30 text-right">
              <div className="font-mono text-[11px] font-bold text-primary">
                14ms
              </div>
              <div className="font-mono text-[9px] text-outline">
                P99 Latency
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-outline mt-1 pt-1 border-t border-outline-variant/20">
            <span>Isolation: ReadCommitted</span>
            <span className="text-primary font-medium">TLS 1.3 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
