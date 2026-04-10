import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Badge from './ui/Badge';
import Tag from './ui/Tag';
import { ease } from './ui/constants';

const areas = [
  {
    badge: 'Read',
    variant: 'accent',
    file: 'src/expertise/ai-engineering.ts',
    accent: 'linear-gradient(90deg, #b197fc, #da77f2)',
    title: 'AI-Powered Engineering',
    description:
      'Integrating AI into development workflows — from code generation and review to testing and deployment. Building the tools and culture for AI-first engineering.',
    tags: ['Claude Code', 'MCP', 'LLMs', 'AI Agents', 'Prompt Engineering'],
  },
  {
    badge: 'Edit',
    variant: 'purple',
    file: 'src/expertise/tech-leadership.ts',
    accent: 'linear-gradient(90deg, #da77f2, #ffa07a)',
    title: 'Technical Leadership',
    description:
      'Driving architecture decisions, setting technical direction, and mentoring engineers across teams. Translating business goals into technical strategy.',
    tags: ['Architecture', 'Strategy', 'Mentoring', 'Code Review', 'RFCs'],
  },
  {
    badge: 'Bash',
    variant: 'green',
    file: 'npm run full-stack --scale',
    accent: 'linear-gradient(90deg, #66d9e8, #b197fc)',
    title: 'Full-Stack Development',
    description:
      'Building and scaling web applications end-to-end. Strong in modern React, TypeScript, and cloud-native backends with a focus on developer experience.',
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  },
  {
    badge: 'Grep',
    variant: 'cyan',
    file: 'src/expertise/platform-dx.ts',
    accent: 'linear-gradient(90deg, #69db7c, #66d9e8)',
    title: 'Platform & DX',
    description:
      'Designing CI/CD pipelines, developer tooling, and platform infrastructure that lets teams ship with confidence and speed.',
    tags: ['CI/CD', 'Testing', 'DevOps', 'Observability', 'Performance'],
  },
];

const badgeStyles: Record<string, React.CSSProperties> = {
  accent: {
    background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
    color: 'var(--color-accent)',
  },
  purple: {
    background: 'color-mix(in srgb, var(--color-accent-2) 10%, transparent)',
    color: 'var(--color-accent-2)',
  },
  green: {
    background: 'color-mix(in srgb, var(--color-accent-green) 10%, transparent)',
    color: 'var(--color-accent-green)',
  },
  cyan: {
    background: 'color-mix(in srgb, var(--color-accent-cyan) 10%, transparent)',
    color: 'var(--color-accent-cyan)',
  },
};

function ExpertiseSection() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const glow = card.querySelector('[data-glow]') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(300px circle at ${
        e.clientX - rect.left
      }px ${e.clientY - rect.top}px, rgba(177,151,252,0.08), transparent 60%)`;
    }
  }, []);

  return (
    <ConversationBlock
      prompt="what does Michael specialise in?"
      thinkingMessage="Analyzing codebase..."
      thinkingDuration={1200}
    >
      {(visible) => (
        <>
          <motion.p
            className="mb-6 max-w-xl text-[0.9375rem]"
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Here are the areas where Michael focuses his energy — from AI integration to technical
            strategy:
          </motion.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {areas.map((area, i) => (
              <motion.article
                key={area.title}
                className="group bg-bg-terminal border-border hover:border-border-hover hover:shadow-accent-hover relative cursor-default overflow-hidden rounded-lg border"
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseMove={handleMouseMove}
              >
                <div
                  data-glow
                  className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div
                  className="absolute top-0 right-0 left-0 z-2 h-0.5 opacity-0 transition-opacity duration-300 group-hover:animate-[shimmer_2s_linear_infinite] group-hover:opacity-100"
                  style={{
                    background: area.accent,
                    backgroundSize: '200% 100%',
                  }}
                />

                <div className="border-border text-text-muted relative z-2 flex items-center gap-2 border-b px-3.5 py-2 text-[0.6875rem] tracking-wide">
                  <Badge color={badgeStyles[area.variant].color as string}>{area.badge}</Badge>{' '}
                  {area.file}
                </div>

                <div className="relative z-2 p-5">
                  <h2 className="text-text mb-2.5 font-sans text-[1.0625rem] font-semibold">
                    {area.title}
                  </h2>
                  <p
                    className="mb-4 text-[0.8125rem] leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
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
