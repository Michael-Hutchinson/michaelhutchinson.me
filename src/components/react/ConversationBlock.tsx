import React, { useEffect, useState, type ReactNode } from 'react';
import useTypingEffect from './hooks/useTypingEffect';
import useInView from './hooks/useInView';

const chevronStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'gradient-shift 4s ease infinite',
};

interface ConversationBlockProps {
  prompt: string;
  thinkingMessage?: string;
  typingSpeed?: number;
  thinkingDuration?: number;
  autoStart?: boolean;
  children: (visible: boolean) => ReactNode;
}

const PHASE = { WAITING: 0, TYPING: 1, THINKING: 2, THINKING_EXIT: 3, RESPONSE: 4 };

export default function ConversationBlock({
  prompt,
  thinkingMessage = 'Thinking...',
  typingSpeed = 45,
  thinkingDuration = 1200,
  autoStart = false,
  children,
}: ConversationBlockProps) {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState(autoStart ? PHASE.TYPING : PHASE.WAITING);

  const cmd = useTypingEffect({
    text: prompt,
    speed: typingSpeed,
    delay: 200,
    enabled: phase >= PHASE.TYPING,
  });

  useEffect(() => {
    if (inView && phase === PHASE.WAITING) setPhase(PHASE.TYPING);
    if (cmd.isDone && phase === PHASE.TYPING)
      setTimeout(() => setPhase(PHASE.THINKING), 300);
  }, [inView, cmd.isDone, phase]);

  useEffect(() => {
    const delays: Record<number, number> = {
      [PHASE.THINKING]: thinkingDuration,
      [PHASE.THINKING_EXIT]: 300,
    };
    const delay = delays[phase];
    if (delay == null) return;
    const id = setTimeout(() => setPhase(phase + 1), delay);
    return () => clearTimeout(id);
  }, [phase, thinkingDuration]);

  let thinkingState = 'hidden';
  if (phase === PHASE.THINKING) thinkingState = 'entering';
  else if (phase === PHASE.THINKING_EXIT) thinkingState = 'exiting';

  const showContent = phase >= PHASE.RESPONSE;

  return (
    <div ref={ref}>
      {/* Prompt line */}
      <div className="flex items-baseline gap-2.5 text-[0.9375rem] mb-5">
        <span className="font-bold text-base select-none shrink-0" style={chevronStyle}>❯</span>
        <span className="text-text">
          {cmd.displayText}
          {phase === PHASE.TYPING && !cmd.isDone && (
            <span
              className="inline-block w-2 h-4.5 align-text-bottom ml-px"
              style={{ background: 'var(--color-accent)', animation: 'blink 1s step-end infinite' }}
            />
          )}
        </span>
      </div>

      {/* Thinking block */}
      <div
        className={`
          items-center gap-2 px-3.5 py-2.5 mb-5
          rounded-md text-[0.8125rem] max-w-fit overflow-hidden
          ${thinkingState === 'hidden' ? 'hidden' : 'flex'}
          ${thinkingState === 'entering' ? 'animate-[thinking-enter_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]' : ''}
          ${thinkingState === 'exiting' ? 'animate-[thinking-exit_0.25s_ease_forwards]' : ''}
        `}
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
      >
        <span className="inline-flex gap-1">
          {[0, 0.15, 0.3].map((d) => (
            <span
              key={d}
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: 'var(--color-accent)', animation: `dot-bounce 1.2s ease-in-out infinite ${d}s` }}
            />
          ))}
        </span>
        {thinkingMessage}
      </div>

      {/* Response — children receive visible state for staggering */}
      {children(showContent)}
    </div>
  );
}

/** Helper: staggered reveal class generator */
export function stagger(visible: boolean, index: number, base = 0.1): string {
  return `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
  }`;
}

export function staggerStyle(index: number, base = 0.1): React.CSSProperties {
  return { transitionDelay: `${base + index * 0.08}s` };
}
