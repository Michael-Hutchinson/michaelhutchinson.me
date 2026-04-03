import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTypingEffect from './hooks/useTypingEffect';

const ease = [0.16, 1, 0.3, 1] as const;

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

function BlinkingCursor() {
  return (
    <span
      className="inline-block w-2 h-4.5 align-text-bottom ml-px"
      style={{ background: 'var(--color-accent)', animation: 'blink 1s step-end infinite' }}
    />
  );
}

const PHASE = {
  TYPING_CMD1: 0, THINKING: 1, OUTPUT: 2,
  TYPING_CMD2: 3, STATUS: 4, IDLE: 5,
};

const phaseDelays: Record<number, number> = {
  [PHASE.THINKING]: 1400,
  [PHASE.OUTPUT]: 100,
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
    if (cmd1.isDone && phase === PHASE.TYPING_CMD1) {
      const id = setTimeout(() => setPhase(PHASE.THINKING), 250);
      return () => clearTimeout(id);
    }
    if (cmd2.isDone && phase === PHASE.TYPING_CMD2) {
      const id = setTimeout(() => setPhase(PHASE.STATUS), 350);
      return () => clearTimeout(id);
    }
  }, [cmd1.isDone, cmd2.isDone, phase]);

  useEffect(() => {
    const delay = phaseDelays[phase];
    if (delay == null) return;
    const id = setTimeout(() => setPhase(phase + 1), delay);
    return () => clearTimeout(id);
  }, [phase]);

  // OUTPUT → TYPING_CMD2 after name reveals
  useEffect(() => {
    if (phase === PHASE.OUTPUT) {
      const id = setTimeout(() => setPhase(PHASE.TYPING_CMD2), 800);
      return () => clearTimeout(id);
    }
    if (phase === PHASE.STATUS) {
      const id = setTimeout(() => setPhase(PHASE.IDLE), 600);
      return () => clearTimeout(id);
    }
  }, [phase]);

  return (
    <motion.div
      className="relative max-w-208"
      initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease, delay: 0.15 }}
    >
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
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border" style={{ background: 'var(--color-bg-card)' }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((color, i) => (
            <motion.span
              key={color}
              className="w-3 h-3 rounded-full"
              style={{ background: color }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.9 + i * 0.08 }}
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
              {!cmd1.isDone && phase === PHASE.TYPING_CMD1 && <BlinkingCursor />}
            </span>
          </div>

          {/* Thinking */}
          <AnimatePresence>
            {phase === PHASE.THINKING && (
              <motion.div
                initial={{ opacity: 0, x: -8, height: 0, marginTop: 0, marginBottom: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto', marginTop: 12, marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease }}
                className="flex items-center gap-2 px-4 py-3 rounded-md text-[0.8125rem] overflow-hidden"
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
                </span>{' '}Searching files...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name + role output */}
          <motion.div
            animate={phase >= PHASE.OUTPUT ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.h1
              className="text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold tracking-[-0.04em] mt-3 mb-1 font-sans"
              style={nameGradientStyle}
              animate={phase >= PHASE.OUTPUT
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 8, filter: 'blur(3px)' }
              }
              transition={{ duration: 0.6, ease }}
            >
              Michael Hutchinson
            </motion.h1>
            <motion.p
              className="text-base mb-4 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
              animate={phase >= PHASE.OUTPUT ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
            >
              Staff Engineer building AI-powered engineering cultures.
              <br />
              Based in Manchester, UK.
            </motion.p>
          </motion.div>

          {/* cat status.yml command */}
          <AnimatePresence>
            {phase >= PHASE.TYPING_CMD2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, ease }}
                className="flex items-baseline gap-2.5 text-[0.9375rem] mb-1"
              >
                <span className="font-bold text-base select-none shrink-0" style={gradientStyle}>❯</span>
                <span className="text-text">
                  {cmd2.displayText}
                  {phase === PHASE.TYPING_CMD2 && !cmd2.isDone && <BlinkingCursor />}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status grid */}
          <motion.div
            animate={phase >= PHASE.STATUS ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.div
              className="h-px my-4 origin-left"
              style={{ background: 'var(--color-border)' }}
              animate={{ scaleX: phase >= PHASE.STATUS ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.8125rem]">
              {statusRows.map((row, i) => (
                <React.Fragment key={row.key}>
                  <motion.span
                    className="text-text-muted"
                    animate={phase >= PHASE.STATUS ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                  >{row.key}</motion.span>
                  <motion.span
                    className="text-text"
                    animate={phase >= PHASE.STATUS ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                  >{row.value}</motion.span>
                </React.Fragment>
              ))}
              <motion.span
                className="text-text-muted"
                animate={phase >= PHASE.STATUS ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease, delay: 0.28 }}
              >status:</motion.span>
              <motion.span
                className="text-text"
                animate={phase >= PHASE.STATUS ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease, delay: 0.28 }}
              >
                <span className="inline-block w-[7px] h-[7px] rounded-full mr-1.5 align-middle" style={{ background: 'var(--color-accent-green)', boxShadow: '0 0 8px rgba(105,219,124,0.4)' }} />{' '}Open to opportunities
              </motion.span>
            </div>
          </motion.div>

          {/* Idle cursor */}
          <motion.div
            className="flex items-center gap-2.5 mt-5 text-[0.9375rem]"
            animate={phase >= PHASE.IDLE ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="font-bold text-base select-none" style={gradientStyle}>❯</span>
            <BlinkingCursor />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
