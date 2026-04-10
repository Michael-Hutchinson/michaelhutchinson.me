import React from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Badge from './ui/Badge';
import Tag from './ui/Tag';
import { ease } from './ui/constants';

const impacts = [
  {
    metric: '60%',
    metricLabel: 'faster CI/CD',
    title: 'DevEx Overhaul',
    description:
      'Migrated from Bitbucket to GitHub and rebuilt all pipelines in GitHub Actions, cutting build times from 20 minutes to 8 minutes.',
    tags: ['GitHub Actions', 'CI/CD', 'DevEx'],
    file: 'src/impact/devex.ts',
    accent: 'var(--color-accent-cyan)',
  },
  {
    metric: '100+',
    metricLabel: 'components shipped',
    title: 'Design System Migration',
    description:
      'Replaced three legacy systems (custom + MUI) with a unified Shadcn/ui library across the entire platform, with WCAG compliance and RTL support.',
    tags: ['Shadcn/ui', 'TypeScript', 'Accessibility'],
    file: 'src/impact/design-system.ts',
    accent: 'var(--color-accent)',
  },
  {
    metric: '500+',
    metricLabel: 'enterprise customers',
    title: 'Social Learning Platform',
    description:
      'Built a social feature (posts, comments, feeds) now used as a core platform capability by all enterprise customers including Google and Emirates.',
    tags: ['React', 'Node.js', 'GraphQL'],
    file: 'src/impact/social.ts',
    accent: 'var(--color-accent-2)',
  },
];

function ImpactSection() {
  return (
    <ConversationBlock
      prompt="show me Michael's impact"
      thinkingMessage="Running metrics..."
      thinkingDuration={1100}
    >
      {(visible) => (
        <>
          <motion.p
            className="mb-6 max-w-xl text-[0.9375rem]"
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Selected work and measurable outcomes from the past few years:
          </motion.p>

          {/* Impact cards */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {impacts.map((item, i) => (
              <motion.article
                key={item.title}
                className="group bg-bg-terminal border-border relative overflow-hidden rounded-lg border"
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 right-0 left-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: item.accent }}
                />

                {/* File tab */}
                <div className="border-border text-text-muted flex items-center gap-2 border-b px-3.5 py-2 text-[0.6875rem] tracking-wide">
                  <Badge color={item.accent}>Run</Badge> {item.file}
                </div>

                <div className="p-5">
                  {/* Metric */}
                  <div className="mb-3">
                    <span
                      className="text-[2rem] leading-none font-extrabold tracking-tight"
                      style={{ color: item.accent }}
                    >
                      {item.metric}
                    </span>
                    <span
                      className="ml-2 text-[0.75rem]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.metricLabel}
                    </span>
                  </div>

                  <h2 className="text-text mb-2 font-sans text-[0.9375rem] font-semibold">
                    {item.title}
                  </h2>
                  <p
                    className="mb-4 text-[0.8125rem] leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Tag key={tag} color={item.accent}>
                        {tag}
                      </Tag>
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

export default withErrorBoundary(ImpactSection, 'ImpactSection');
