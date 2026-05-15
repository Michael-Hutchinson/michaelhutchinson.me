import React from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Card from './ui/Card';
import FileTab from './ui/FileTab';
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
    name: 'appkettle',
    stat: '9',
    statLabel: 'MCP tools',
    description:
      'Reverse-engineered a dead smart kettle back to life. Decoded the proprietary protocol from the Android APK and built an MCP server and React Native app on top.',
    tags: ['Reverse Engineering', 'IoT', 'React Native', 'TypeScript'],
    url: '/blog/reverse-engineering-a-dead-smart-kettle',
    file: 'appkettle/src/mcp-tools.ts',
    accent: 'var(--color-accent-green)',
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
    accent: 'var(--color-accent-3)',
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Card
                key={project.name}
                href={project.url}
                accent={project.accent}
                hover
                animate={
                  visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.1 }}
              >
                <FileTab label="Open" path={project.file} color={project.accent} />

                <div className="p-5">
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
              </Card>
            ))}
          </div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ProjectsSection, 'ProjectsSection');
