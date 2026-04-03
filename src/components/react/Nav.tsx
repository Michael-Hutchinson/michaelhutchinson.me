import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
];

function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`
        fixed inset-0
        flex flex-col items-center justify-center gap-6
        transition-all duration-300 md:hidden
        ${open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
        }
      `}
      style={{
        zIndex: 9999,
        background: 'var(--color-bg)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 text-text-secondary"
      >
        <X size={24} />
      </button>

      {/* Nav links */}
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="text-lg font-mono py-2 px-4 transition-colors duration-150"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
        >
          {item.label}
        </a>
      ))}
      <a
        href="/CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-mono px-5 py-2 rounded transition-all duration-150"
        style={{
          color: 'var(--color-accent)',
          border: '1px solid var(--color-border)',
        }}
      >
        cv.pdf
      </a>
    </div>,
    document.body
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <>
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
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-mono border border-border rounded px-2.5 py-1 ml-1.5 transition-all duration-150 hover:border-border-hover" style={{ color: 'var(--color-accent)' }}>
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
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex md:hidden items-center justify-center p-1.5 text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <MobileOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
