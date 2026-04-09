import React from 'react';
import { motion } from 'framer-motion';
import ConversationBlock, { staggerItem } from './ConversationBlock';
import withErrorBoundary from './withErrorBoundary';
import Badge from './ui/Badge';
import { ease } from './ui/constants';

const career = [
  {
    company: 'Thrive Learning Limited',
    location: 'Fully Remote',
    context: 'AI-powered learning platform, 5M+ users, 60+ countries',
    roles: [
      { title: 'Staff Engineer', period: 'Feb 2026 – Present', current: true },
      { title: 'Lead Frontend Engineer', period: 'Apr 2024 – Feb 2026' },
      { title: 'Senior Frontend Developer', period: 'Mar 2022 – Apr 2024' },
    ],
    file: 'career/thrive.yml',
    accent: 'var(--color-accent)',
  },
  {
    company: 'CDL Software',
    location: 'Stockport',
    context: 'Insurance technology, ~65% of UK price comparison sites',
    roles: [
      { title: 'Senior Web Developer', period: 'Apr 2021 – Feb 2022' },
      { title: 'Web Developer', period: 'Dec 2019 – Apr 2021' },
      { title: 'Junior Web Developer', period: 'Oct 2018 – Jul 2019' },
    ],
    file: 'career/cdl.yml',
    accent: 'var(--color-accent-2)',
  },
  {
    company: 'Boohoo Group PLC',
    location: 'Manchester',
    context: 'E-commerce, £1B+ revenue',
    roles: [{ title: 'UX Executive', period: 'Jul 2019 – Dec 2019' }],
    file: 'career/boohoo.yml',
    accent: 'var(--color-accent-3)',
  },
];

function ExperienceSection() {
  return (
    <ConversationBlock
      prompt="show me Michael's experience"
      thinkingMessage='Reading career data...'
      thinkingDuration={1100}
    >
      {(visible) => (
        <>
          <motion.p
            className='text-[0.9375rem] mb-6 max-w-xl'
            style={{ color: 'var(--color-text-secondary)' }}
            {...staggerItem(visible, 0, 0.05)}
          >
            10+ years across insurance tech, e-commerce, and enterprise SaaS:
          </motion.p>

          <div className='flex flex-col gap-4'>
            {career.map((entry, i) => (
              <motion.article
                key={entry.company}
                className='group relative bg-bg-terminal border border-border rounded-lg overflow-hidden'
                animate={
                  visible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.96 }
                }
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.12 }}
              >
                {/* Top accent */}
                <div
                  className='absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300'
                  style={{ background: entry.accent }}
                />

                {/* File tab */}
                <div className='flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide'>
                  <Badge color={entry.accent}>Read</Badge> {entry.file}
                </div>

                <div className='p-5'>
                  {/* Company header */}
                  <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1'>
                    <h2 className='text-[0.9375rem] font-semibold text-text font-sans'>
                      {entry.company}
                    </h2>
                    <span
                      className='text-[0.75rem]'
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {entry.location}
                    </span>
                  </div>
                  <p
                    className='text-[0.75rem] mb-3'
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {entry.context}
                  </p>

                  {/* Roles */}
                  <div className='flex flex-col gap-2'>
                    {entry.roles.map((role) => (
                      <div
                        key={role.title}
                        className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5'
                      >
                        <div className='flex items-center gap-2'>
                          {role.current && (
                            <span
                              className='w-[7px] h-[7px] rounded-full shrink-0'
                              style={{
                                background: 'var(--color-accent-green)',
                                boxShadow: 'var(--shadow-glow-green)',
                              }}
                            />
                          )}
                          <span
                            className='text-[0.8125rem]'
                            style={{
                              color: role.current
                                ? 'var(--color-text)'
                                : 'var(--color-text-secondary)',
                            }}
                          >
                            {role.title}
                          </span>
                        </div>
                        <span
                          className='text-[0.6875rem] font-mono'
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {role.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CV download */}
          <motion.div
            className='mt-4 text-center'
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease, delay: 0.6 }}
          >
            <a
              href='/CV.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-[0.8125rem] font-mono px-4 py-2 rounded border border-border hover:border-border-hover transition-colors duration-200'
              style={{ color: 'var(--color-accent)' }}
            >
              view full cv.pdf
            </a>
          </motion.div>
        </>
      )}
    </ConversationBlock>
  );
}

export default withErrorBoundary(ExperienceSection, 'ExperienceSection');
