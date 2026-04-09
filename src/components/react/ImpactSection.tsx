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

const projects = [
  {
    name: 'strava-mcp-server',
    stat: '7',
    statLabel: 'MCP tools',
    description:
      'Open-source MCP server connecting Claude to Strava. Published on npm with an interactive OAuth setup flow.',
    tags: ['MCP', 'Claude Code', 'Strava API', 'TypeScript'],
    url: 'https://www.npmjs.com/package/@michaelhutchinson/strava-mcp-server',
    file: 'strava-mcp-server/src/index.ts',
    accent: 'var(--color-accent)',
  },
  {
    name: 'ukrunner.com',
    stat: '5,800+',
    statLabel: 'km tracked',
    description:
      "Personal side project tracking every kilometre I've run. Next.js, Sanity CMS, Strava webhooks, and Neon Postgres.",
    tags: ['Next.js', 'Sanity CMS', 'Strava API', 'Neon'],
    url: 'https://ukrunner.com',
    file: 'projects/ukrunner/src/app/page.tsx',
    accent: 'var(--color-accent-green)',
  },
];

function ImpactSection() {
  return (
    <ConversationBlock
      prompt="show me Michael's impact"
      thinkingMessage='Running metrics...'
      thinkingDuration={1100}
    >
      {(visible) => (
        <>
          <motion.p
            className='text-[0.9375rem] mb-6 max-w-xl'
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Selected work and measurable outcomes from the past few years:
          </motion.p>

          {/* Impact cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            {impacts.map((item, i) => (
              <motion.article
                key={item.title}
                className='group relative bg-bg-terminal border border-border rounded-lg overflow-hidden'
                animate={
                  visible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {/* Top accent bar */}
                <div
                  className='absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300'
                  style={{ background: item.accent }}
                />

                {/* File tab */}
                <div className='flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide'>
                  <Badge color={item.accent}>Run</Badge> {item.file}
                </div>

                <div className='p-5'>
                  {/* Metric */}
                  <div className='mb-3'>
                    <span
                      className='text-[2rem] font-extrabold tracking-tight leading-none'
                      style={{ color: item.accent }}
                    >
                      {item.metric}
                    </span>
                    <span
                      className='text-[0.75rem] ml-2'
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.metricLabel}
                    </span>
                  </div>

                  <h2 className='text-[0.9375rem] font-semibold mb-2 text-text font-sans'>
                    {item.title}
                  </h2>
                  <p
                    className='text-[0.8125rem] leading-relaxed mb-4'
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.description}
                  </p>

                  <div className='flex flex-wrap gap-1.5'>
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

          {/* Project cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative bg-bg-terminal border border-border rounded-lg overflow-hidden hover:border-border-hover transition-colors duration-200'
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease, delay: 0.55 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {/* Top accent */}
                <div
                  className='absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300'
                  style={{ background: project.accent }}
                />

                {/* File tab */}
                <div className='flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide'>
                  <Badge color={project.accent}>Open</Badge> {project.file}
                </div>

                <div className='p-5'>
                  {/* Metric */}
                  <div className='mb-3'>
                    <span
                      className='text-[2rem] font-extrabold tracking-tight leading-none'
                      style={{ color: project.accent }}
                    >
                      {project.stat}
                    </span>
                    <span
                      className='text-[0.75rem] ml-2'
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {project.statLabel}
                    </span>
                  </div>

                  <div className='flex items-center gap-2 mb-1'>
                    <h2 className='text-[0.9375rem] font-semibold text-text font-sans'>
                      {project.name}
                    </h2>
                    <svg
                      className='w-3.5 h-3.5 opacity-40 group-hover:opacity-80 transition-opacity'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </div>
                  <p
                    className='text-[0.8125rem] leading-relaxed mb-4'
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-1.5'>
                    {project.tags.map((tag) => (
                      <Tag key={tag} color={project.accent}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ImpactSection, 'ImpactSection');
