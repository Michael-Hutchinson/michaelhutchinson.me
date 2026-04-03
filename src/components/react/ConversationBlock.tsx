import React, { useEffect, useState, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import useTypingEffect from './hooks/useTypingEffect';

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

const PHASE = { WAITING: 0, TYPING: 1, THINKING: 2, RESPONSE: 3 };

export default function ConversationBlock({
  prompt,
  thinkingMessage = 'Thinking...',
  typingSpeed = 45,
  thinkingDuration = 1200,
  autoStart = false,
  children,
}: Readonly<ConversationBlockProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [phase, setPhase] = useState(autoStart ? PHASE.TYPING : PHASE.WAITING);

  const cmd = useTypingEffect({
    text: prompt,
    speed: typingSpeed,
    delay: 200,
    enabled: phase >= PHASE.TYPING,
  });

  // Phase advancement
  useEffect(() => {
    if (inView && phase === PHASE.WAITING) setPhase(PHASE.TYPING);
    if (cmd.isDone && phase === PHASE.TYPING) {
      const id = setTimeout(() => setPhase(PHASE.THINKING), 300);
      return () => clearTimeout(id);
    }
  }, [inView, cmd.isDone, phase]);

  useEffect(() => {
    if (phase === PHASE.THINKING) {
      const id = setTimeout(() => setPhase(PHASE.RESPONSE), thinkingDuration);
      return () => clearTimeout(id);
    }
  }, [phase, thinkingDuration]);

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
      <AnimatePresence>
        {phase === PHASE.THINKING && (
          <motion.div
            initial={{ opacity: 0, x: -8, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto', marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-md text-[0.8125rem] overflow-hidden"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            <span className="inline-flex gap-1">
              {[0, 0.15, 0.3].map((d) => (
                <motion.span
                  key={d}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: 'var(--color-accent)' }}
                  animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: d }}
                />
              ))}
            </span>
            {thinkingMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response content */}
      <motion.div
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children(showContent)}
      </motion.div>
    </div>
  );
}

/** Stagger helper for children — returns motion props */
export function staggerItem(visible: boolean, index: number, baseDelay = 0.1) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: baseDelay + index * 0.08 },
  };
}
