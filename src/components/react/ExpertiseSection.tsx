import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Card from './ui/Card';
import FileTab from './ui/FileTab';
import Tag from './ui/Tag';
import { ease } from './ui/constants';

const areas = [
  {
    badge: 'Read',
    badgeColor: 'var(--color-accent)',
    file: 'src/expertise/ai-engineering.ts',
    accent: 'linear-gradient(90deg, #b197fc, #da77f2)',
    title: 'AI-Powered Engineering',
    description:
      'Integrating AI into development workflows — from code generation and review to testing and deployment. Building the tools and culture for AI-first engineering.',
    tags: ['Claude Code', 'MCP', 'LLMs', 'AI Agents', 'Prompt Engineering'],
  },
  {
    badge: 'Edit',
    badgeColor: 'var(--color-accent-2)',
    file: 'src/expertise/tech-leadership.ts',
    accent: 'linear-gradient(90deg, #da77f2, #ffa07a)',
    title: 'Technical Leadership',
    description:
      'Driving architecture decisions, setting technical direction, and mentoring engineers across teams. Translating business goals into technical strategy.',
    tags: ['Architecture', 'Strategy', 'Mentoring', 'Code Review', 'RFCs'],
  },
  {
    badge: 'Bash',
    badgeColor: 'var(--color-accent-green)',
    file: 'npm run full-stack --scale',
    accent: 'linear-gradient(90deg, #66d9e8, #b197fc)',
    title: 'Full-Stack Development',
    description:
      'Building and scaling web applications end-to-end. Strong in modern React, TypeScript, and cloud-native backends with a focus on developer experience.',
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  },
  {
    badge: 'Grep',
    badgeColor: 'var(--color-accent-cyan)',
    file: 'src/expertise/platform-dx.ts',
    accent: 'linear-gradient(90deg, #69db7c, #66d9e8)',
    title: 'Platform & DX',
    description:
      'Designing CI/CD pipelines, developer tooling, and platform infrastructure that lets teams ship with confidence and speed.',
    tags: ['CI/CD', 'Testing', 'DevOps', 'Observability', 'Performance'],
  },
];

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
              <Card
                key={area.title}
                accent={area.accent}
                hover
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                onMouseMove={handleMouseMove}
                className="cursor-default"
              >
                <div
                  data-glow
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <FileTab label={area.badge} path={area.file} color={area.badgeColor} />

                <div className="p-5">
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
              </Card>
            ))}
          </div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ExpertiseSection, 'ExpertiseSection');
