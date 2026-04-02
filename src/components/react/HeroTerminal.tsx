import React, { useEffect, useState } from 'react';
import useTypingEffect from './hooks/useTypingEffect';

const gradientStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'gradient-shift 4s ease infinite',
};

const nameGradientStyle: React.CSSProperties = {
  ...gradientStyle,
  animation: 'gradient-shift 6s ease infinite',
};

const PHASE = {
  TYPING_CMD1: 0, THINKING: 1, THINKING_EXIT: 2,
  OUTPUT: 3, NAME_REVEAL: 4, TYPING_CMD2: 5, STATUS: 6, IDLE: 7,
};

const phaseDelays: Record<number, number> = {
  [PHASE.THINKING]: 1400,
  [PHASE.THINKING_EXIT]: 350,
  [PHASE.OUTPUT]: 100,
  [PHASE.NAME_REVEAL]: 800,
  [PHASE.STATUS]: 600,
};

const statusRows = [
  { key: 'role:', value: 'Staff Engineer' },
  { key: 'focus:', value: 'AI + Engineering Leadership' },
  { key: 'stack:', value: 'TypeScript, React, Node.js, AWS' },
  { key: 'tools:', value: 'Claude Code, MCP, AI Agents' },
];

export default function HeroTerminal() {
  const [phase, setPhase] = useState(PHASE.TYPING_CMD1);

  const cmd1 = useTypingEffect({ text: 'whoami', speed: 70, delay: 800, enabled: phase >= PHASE.TYPING_CMD1 });
  const cmd2 = useTypingEffect({ text: 'cat status.yml', speed: 55, delay: 200, enabled: phase >= PHASE.TYPING_CMD2 });

  useEffect(() => {
    if (cmd1.isDone && phase === PHASE.TYPING_CMD1) setTimeout(() => setPhase(PHASE.THINKING), 250);
    if (cmd2.isDone && phase === PHASE.TYPING_CMD2) setTimeout(() => setPhase(PHASE.STATUS), 350);
  }, [cmd1.isDone, cmd2.isDone, phase]);

  useEffect(() => {
    const delay = phaseDelays[phase];
    if (delay == null) return;
    const id = setTimeout(() => setPhase(phase + 1), delay);
    return () => clearTimeout(id);
  }, [phase]);

  const thinkingVisible = phase === PHASE.THINKING;
  const thinkingExiting = phase === PHASE.THINKING_EXIT;

  return (
    <div className="relative max-w-[52rem] animate-[terminal-enter_0.8s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]">
      {/* Rotating gradient border */}
      <div
        className="absolute -inset-px rounded-lg opacity-60 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'conic-gradient(from var(--border-angle, 0deg), transparent 40%, var(--color-accent) 50%, var(--color-accent-2) 55%, var(--color-accent-3) 60%, transparent 70%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
          animation: 'border-rotate 4s linear infinite',
        }}
      />

      {/* Terminal */}
      <div className="relative z-10 bg-bg-terminal rounded-lg overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-bg-card border-b border-border">
          {['#ff5f57', '#ffbd2e', '#28c840'].map((color, i) => (
            <span
              key={color}
              className="w-3 h-3 rounded-full opacity-0 animate-[terminal-enter_0.3s_ease_forwards]"
              style={{ background: color, animationDelay: `${0.9 + i * 0.08}s` }}
            />
          ))}
          <span className="text-[0.6875rem] text-text-muted mx-auto tracking-wide">
            claude — michael@hutchinson ~/portfolio
          </span>
        </div>

        {/* Body */}
        <div className="p-6 md:px-8 md:py-7">
          {/* whoami command */}
          <div className="flex items-baseline gap-2.5 text-[0.9375rem] leading-relaxed mb-1">
            <span className="font-bold text-base select-none shrink-0" style={gradientStyle}>❯</span>
            <span className="text-text">
              {cmd1.displayText}
              {!cmd1.isDone && phase === PHASE.TYPING_CMD1 && (
                <span className="inline-block w-2 h-4.5 bg-accent align-text-bottom ml-px animate-[blink_1s_step-end_infinite]" />
              )}
            </span>
          </div>

          {/* Thinking */}
          <div className={`
            items-center gap-2 px-4 py-3 my-3
            bg-bg-card border border-border rounded-md
            text-[0.8125rem] text-text-muted overflow-hidden
            ${!thinkingVisible && !thinkingExiting ? 'hidden' : 'flex'}
            ${thinkingVisible ? 'animate-[thinking-enter_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]' : ''}
            ${thinkingExiting ? 'animate-[thinking-exit_0.25s_ease_forwards]' : ''}
          `}>
            <span className="inline-flex gap-1">
              <span className="w-[5px] h-[5px] rounded-full bg-accent animate-[dot-bounce_1.2s_ease-in-out_infinite]" />
              <span className="w-[5px] h-[5px] rounded-full bg-accent animate-[dot-bounce_1.2s_ease-in-out_infinite_0.15s]" />
              <span className="w-[5px] h-[5px] rounded-full bg-accent animate-[dot-bounce_1.2s_ease-in-out_infinite_0.3s]" />
            </span>
            Searching files...
          </div>

          {/* Name + role output */}
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.OUTPUT ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <h1
              className={`
                text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold tracking-[-0.04em] mt-3 mb-1 font-sans
                transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${phase >= PHASE.NAME_REVEAL ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-[3px]'}
              `}
              style={nameGradientStyle}
            >
              Michael Hutchinson
            </h1>
            <p className={`
              text-base text-text-secondary mb-4 leading-relaxed
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150
              ${phase >= PHASE.NAME_REVEAL ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}
            `}>
              Staff Engineer building AI-powered engineering cultures.<br />
              Based in Manchester, UK.
            </p>
          </div>

          {/* cat status.yml command */}
          {phase >= PHASE.TYPING_CMD2 && (
            <div className="flex items-baseline gap-2.5 text-[0.9375rem] mb-1">
              <span className="font-bold text-base select-none shrink-0" style={gradientStyle}>❯</span>
              <span className="text-text">
                {cmd2.displayText}
                {phase === PHASE.TYPING_CMD2 && !cmd2.isDone && (
                  <span className="inline-block w-2 h-4.5 bg-accent align-text-bottom ml-px animate-[blink_1s_step-end_infinite]" />
                )}
              </span>
            </div>
          )}

          {/* Status grid */}
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className={`h-px bg-border my-4 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'scale-x-100' : 'scale-x-0'}`} />
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.8125rem]">
              {statusRows.map((row, i) => (
                <React.Fragment key={row.key}>
                  <span className={`text-text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`} style={{ transitionDelay: `${i * 0.07}s` }}>{row.key}</span>
                  <span className={`text-text transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`} style={{ transitionDelay: `${i * 0.07}s` }}>{row.value}</span>
                </React.Fragment>
              ))}
              <span className={`text-text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`} style={{ transitionDelay: '0.28s' }}>status:</span>
              <span className={`text-text transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.STATUS ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'}`} style={{ transitionDelay: '0.28s' }}>
                <span className="inline-block w-[7px] h-[7px] rounded-full bg-accent-green shadow-[0_0_8px_rgba(105,219,124,0.4)] mr-1.5 align-middle" />
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Idle cursor */}
          <div className={`flex items-center gap-2.5 mt-5 text-[0.9375rem] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= PHASE.IDLE ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}>
            <span className="font-bold text-base select-none" style={gradientStyle}>❯</span>
            <span className="inline-block w-2 h-4.5 bg-accent animate-[blink_1s_step-end_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
