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
    <footer className="sticky bottom-0 border-t border-border backdrop-blur-sm px-4 md:px-10 py-1.5 flex items-center justify-between font-mono text-[0.6875rem] text-text-muted z-50 whitespace-nowrap overflow-x-auto" style={{ background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)' }}>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-medium" style={{ background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent-green)', boxShadow: '0 0 6px rgba(105,219,124,0.4)' }} />{' '}claude-opus-4.6
        </span>{' '}
        <span className="hidden sm:inline" style={{ color: 'var(--color-border)' }}>|</span>
        <a href="mailto:michael-hutchinson@hotmail.co.uk" className="hidden sm:inline hover:text-text transition-colors">michael-hutchinson@hotmail.co.uk</a>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <div className="hidden md:flex items-center gap-2">
          <span>context</span>
          <div className="w-20 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
            <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${Math.max(5, scrollPercent)}%`, background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))' }} />
          </div>
          <span>{scrollPercent}%</span>
        </div>
        <span style={{ color: 'var(--color-border)' }}>|</span>
        <a href="https://github.com/Michael-Hutchinson" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">github</a>
        <a href="https://www.linkedin.com/in/mhutchinson4" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">linkedin</a>
      </div>
    </footer>
  );
}
