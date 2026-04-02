import React from 'react';
import ConversationBlock, { stagger, staggerStyle } from './ConversationBlock';

const dailyTech = [
  'TypeScript', 'React', 'Node.js', 'GraphQL',
  'AWS', 'Docker', 'Terraform', 'PostgreSQL', 'Redis',
  'Claude Code', 'MCP', 'AI Agents', 'CI/CD', 'Observability',
];

const stats = [
  { k: 'level', v: 'Staff Engineer' },
  { k: 'experience', v: '10+ years' },
  { k: 'location', v: 'Manchester, UK' },
  { k: 'education', v: 'MSc IT, Leeds' },
  { k: 'approach', v: 'AI-first' },
];

const bios = [
  <>I'm a <strong className="text-text font-medium">Staff Engineer</strong> with over a decade of experience building software across the full stack — from React frontends to cloud-native backends. I hold a <span style={{ color: 'var(--color-accent)' }}>Master's in IT from Leeds University</span>.</>,
  <>Right now, I'm all-in on the intersection of <strong className="text-text font-medium">AI and software engineering</strong>. I use Claude Code, MCP servers, and custom AI agents every day to multiply team velocity and ship better software, faster.</>,
  <>As a Staff Engineer, I operate across the entire organisation: defining technical strategy, mentoring engineers, driving architectural decisions, and <strong className="text-text font-medium">keeping my hands in the code every day</strong>.</>,
];

export default function AboutSection() {
  return (
    <ConversationBlock prompt="tell me about Michael" thinkingMessage="Reading context..." thinkingDuration={1400}>
      {(visible) => (
        <>
          {/* Bio paragraphs — staggered */}
          {bios.map((content, i) => (
            <p
              key={`bio-${i}`}
              className={`text-[0.9375rem] leading-relaxed text-text-secondary mb-3.5 ${stagger(visible, i)}`}
              style={staggerStyle(i, 0.05)}
            >{content}</p>
          ))}

          {/* Cards grid — staggered after bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {/* Profile card */}
            <div
              className={`bg-bg-terminal border border-border rounded-lg overflow-hidden ${stagger(visible, 0)} ${visible ? 'scale-100' : 'scale-[0.97]'}`}
              style={staggerStyle(0, 0.35)}
            >
              <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide">
                <span className="text-[0.625rem] px-1.5 py-0.5 rounded font-medium" style={{ background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)' }}>Read</span>{' '}~/about/profile.yml
              </div>
              <div className="p-4">
                {stats.map((row, i) => (
                  <div
                    key={row.k}
                    className={`flex justify-between items-baseline py-2 border-b border-border last:border-0 text-[0.8125rem] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                    style={{ transitionDelay: `${0.45 + i * 0.06}s` }}
                  >
                    <span className="text-text-muted">{row.k}</span>
                    <span className="text-text text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack card */}
            <div
              className={`bg-bg-terminal border border-border rounded-lg overflow-hidden ${stagger(visible, 0)} ${visible ? 'scale-100' : 'scale-[0.97]'}`}
              style={staggerStyle(1, 0.35)}
            >
              <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide">
                <span className="text-[0.625rem] px-1.5 py-0.5 rounded font-medium" style={{ background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)' }}>Read</span>{' '}~/about/stack.json
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  {dailyTech.map((tech, i) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 border border-transparent rounded text-[0.6875rem] hover:border-border-hover transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                      style={{ background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)', color: 'var(--color-accent)', transitionDelay: `${0.5 + i * 0.03}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ConversationBlock>
  );
}
