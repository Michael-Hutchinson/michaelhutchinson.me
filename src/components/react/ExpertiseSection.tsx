import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const areas = [
  {
    badge: 'Read', variant: 'accent', file: 'src/expertise/ai-engineering.ts',
    accent: 'linear-gradient(90deg, #b197fc, #da77f2)',
    title: 'AI-Powered Engineering',
    description: 'Integrating AI into development workflows — from code generation and review to testing and deployment. Building the tools and culture for AI-first engineering.',
    tags: ['Claude Code', 'MCP', 'LLMs', 'AI Agents', 'Prompt Engineering'],
  },
  {
    badge: 'Edit', variant: 'purple', file: 'src/expertise/tech-leadership.ts',
    accent: 'linear-gradient(90deg, #da77f2, #ffa07a)',
    title: 'Technical Leadership',
    description: 'Driving architecture decisions, setting technical direction, and mentoring engineers across teams. Translating business goals into technical strategy.',
    tags: ['Architecture', 'Strategy', 'Mentoring', 'Code Review', 'RFCs'],
  },
  {
    badge: 'Bash', variant: 'green', file: 'npm run full-stack --scale',
    accent: 'linear-gradient(90deg, #66d9e8, #b197fc)',
    title: 'Full-Stack Development',
    description: 'Building and scaling web applications end-to-end. Strong in modern React, TypeScript, and cloud-native backends with a focus on developer experience.',
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  },
  {
    badge: 'Grep', variant: 'cyan', file: 'src/expertise/platform-dx.ts',
    accent: 'linear-gradient(90deg, #69db7c, #66d9e8)',
    title: 'Platform & DX',
    description: 'Designing CI/CD pipelines, developer tooling, and platform infrastructure that lets teams ship with confidence and speed.',
    tags: ['CI/CD', 'Testing', 'DevOps', 'Observability', 'Performance'],
  },
];

const badgeStyles: Record<string, React.CSSProperties> = {
  accent: { background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)' },
  purple: { background: 'color-mix(in srgb, var(--color-accent-2) 10%, transparent)', color: 'var(--color-accent-2)' },
  green: { background: 'color-mix(in srgb, var(--color-accent-green) 10%, transparent)', color: 'var(--color-accent-green)' },
  cyan: { background: 'color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)', color: 'var(--color-accent-cyan)' },
};

function ExpertiseSection() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const glow = card.querySelector('[data-glow]') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(300px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(177,151,252,0.08), transparent 60%)`;
    }
  }, []);

  return (
    <ConversationBlock prompt="what does Michael specialise in?" thinkingMessage="Analyzing codebase..." thinkingDuration={1200}>
      {(visible) => (
        <>
          <motion.p
            className="text-[0.9375rem] mb-6 max-w-xl"
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Here are the areas where Michael focuses his energy — from AI integration to technical strategy:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {areas.map((area, i) => (
              <motion.article
                key={area.title}
                className="group relative bg-bg-terminal border border-border rounded-lg overflow-hidden cursor-default hover:border-border-hover hover:shadow-[0_0_40px_rgba(177,151,252,0.08)]"
                animate={visible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseMove={handleMouseMove}
              >
                <div data-glow className="absolute inset-0 pointer-events-none z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_linear_infinite] transition-opacity duration-300 z-2"
                  style={{ background: area.accent, backgroundSize: '200% 100%' }}
                />

                <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide relative z-2">
                  <span className="text-[0.625rem] px-1.5 py-0.5 rounded font-medium" style={badgeStyles[area.variant]}>
                    {area.badge}
                  </span>{' '}{area.file}
                </div>

                <div className="p-5 relative z-2">
                  <h3 className="text-[1.0625rem] font-semibold mb-2.5 font-sans text-text">{area.title}</h3>
                  <p className="text-[0.8125rem] leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>{area.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span key={tag} className="px-[7px] py-0.5 rounded text-[0.6875rem]" style={{ background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)', color: 'var(--color-accent)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ExpertiseSection, 'ExpertiseSection');
