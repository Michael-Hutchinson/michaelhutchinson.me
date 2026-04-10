import React from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Badge from './ui/Badge';
import Tag from './ui/Tag';
import { ease } from './ui/constants';

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
    name: 'parkrun-mcp-server',
    stat: '800+',
    statLabel: 'events worldwide',
    description:
      'Open-source MCP server for finding parkrun events globally. No API key needed, uses public parkrun data.',
    tags: ['MCP', 'Claude Code', 'parkrun', 'TypeScript'],
    url: 'https://www.npmjs.com/package/@michaelhutchinson/parkrun-mcp-server',
    file: 'parkrun-mcp-server/src/index.ts',
    accent: 'var(--color-accent-cyan)',
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

function ProjectsSection() {
  return (
    <ConversationBlock
      prompt="show me Michael's projects"
      thinkingMessage="Loading repositories..."
      thinkingDuration={1000}
    >
      {(visible) => (
        <>
          <motion.p
            className="mb-6 max-w-xl text-[0.9375rem]"
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            Open-source tools and side projects:
          </motion.p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-bg-terminal border-border hover:border-border-hover relative overflow-hidden rounded-lg border transition-colors duration-200"
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 right-0 left-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: project.accent }}
                />

                {/* File tab */}
                <div className="border-border text-text-muted flex items-center gap-2 border-b px-3.5 py-2 text-[0.6875rem] tracking-wide">
                  <Badge color={project.accent}>Open</Badge> {project.file}
                </div>

                <div className="p-5">
                  {/* Metric */}
                  <div className="mb-3">
                    <span
                      className="text-[2rem] leading-none font-extrabold tracking-tight"
                      style={{ color: project.accent }}
                    >
                      {project.stat}
                    </span>
                    <span
                      className="ml-2 text-[0.75rem]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {project.statLabel}
                    </span>
                  </div>

                  <div className="mb-1 flex items-center gap-2">
                    <h2 className="text-text font-sans text-[0.9375rem] font-semibold">
                      {project.name}
                    </h2>
                    <svg
                      className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                  <p
                    className="mb-4 text-[0.8125rem] leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
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

export default withErrorBoundary(ProjectsSection, 'ProjectsSection');
