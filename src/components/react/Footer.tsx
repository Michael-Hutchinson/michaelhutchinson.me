import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className="border-border text-text-muted sticky bottom-0 z-50 flex items-center justify-between overflow-x-auto border-t px-4 py-1.5 font-mono text-[0.6875rem] whitespace-nowrap backdrop-blur-sm md:px-10"
      style={{
        background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
      }}
    >
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-medium"
          style={{
            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            color: 'var(--color-accent)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: 'var(--color-accent-green)',
              boxShadow: 'var(--shadow-glow-green)',
            }}
          />{' '}
          claude-opus-4.6
        </span>{' '}
        <span className="hidden sm:inline" style={{ color: 'var(--color-border)' }}>
          |
        </span>
        <a
          href="mailto:michael-hutchinson@hotmail.co.uk"
          className="hover:text-text hidden transition-colors sm:inline"
        >
          michael-hutchinson@hotmail.co.uk
        </a>
      </div>
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <div className="hidden items-center gap-2 md:flex">
          <span>context</span>
          <div
            className="h-[3px] w-20 overflow-hidden rounded-full"
            style={{ background: 'var(--color-border)' }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150"
              style={{
                width: `${Math.max(5, scrollPercent)}%`,
                background:
                  'linear-gradient(90deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))',
              }}
            />
          </div>
          <span>{scrollPercent}%</span>
        </div>
        <span style={{ color: 'var(--color-border)' }}>|</span>
        <a
          href="https://github.com/Michael-Hutchinson"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text transition-colors"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/mhutchinson4"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text transition-colors"
        >
          linkedin
        </a>
      </div>
    </footer>
  );
}
