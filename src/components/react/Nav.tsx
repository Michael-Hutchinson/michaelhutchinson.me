import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpenState] = useState(false);
  const setMobileOpen = (open: boolean) => {
    setMobileOpenState(open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.dataset.theme || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500);

    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <nav className="flex items-center justify-between w-full">
      <a
        href="/#home"
        className="font-mono font-bold text-[0.9375rem]"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-shift 4s ease infinite',
        }}
      >
        mh<span style={{ WebkitTextFillColor: 'var(--color-text-muted)' }}>~$</span>
      </a>

      <div className="flex items-center gap-1">
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[0.8125rem] font-mono text-text-muted px-2.5 py-1.5 rounded transition-colors duration-150 hover:text-text">
              {item.label}
            </a>
          ))}
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent border border-border rounded px-2.5 py-1 ml-1.5 transition-all duration-150 hover:bg-accent/8 hover:border-border-hover">
            cv.pdf
          </a>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-8 h-8 border border-border rounded text-text-muted text-sm transition-all duration-150 hover:text-text hover:border-border-hover"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="flex md:hidden items-center justify-center text-text-secondary p-1.5 text-lg"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div className={`
        fixed top-14 left-0 right-0 bottom-0 bg-bg backdrop-blur-xl
        flex flex-col items-center justify-center gap-5
        transition-opacity duration-200 md:hidden z-50
        ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-base font-mono text-text-secondary py-2 px-4 hover:text-accent transition-colors">
            {item.label}
          </a>
        ))}
        <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent border border-border rounded px-4 py-2 hover:bg-accent/8">
          cv.pdf
        </a>
      </div>
    </nav>
  );
}
