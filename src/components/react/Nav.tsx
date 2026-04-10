import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
];

function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-6 transition-all duration-300 md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      } `}
      style={{
        zIndex: 9999,
        background: 'var(--color-bg)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="text-text-secondary absolute top-4 right-4 flex h-10 w-10 items-center justify-center"
      >
        <X size={24} />
      </button>

      {/* Nav links */}
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="px-4 py-2 font-mono text-lg transition-colors duration-150"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          {item.label}
        </a>
      ))}
      <a
        href="/CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded px-5 py-2 font-mono text-sm transition-all duration-150"
        style={{
          color: 'var(--color-accent)',
          border: '1px solid var(--color-border)',
        }}
      >
        cv.pdf
      </a>
    </div>,
    document.body,
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
      <nav className="flex w-full items-center justify-between">
        <a
          href="/#home"
          className="font-mono text-[0.9375rem] font-bold"
          style={{
            background:
              'linear-gradient(135deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift 4s ease infinite',
          }}
        >
          mh
          <span style={{ WebkitTextFillColor: 'var(--color-text-muted)' }}>~$</span>
        </a>

        <div className="flex items-center gap-1">
          {/* Desktop links */}
          <div className="hidden items-center gap-0 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-text-muted hover:text-text rounded px-2.5 py-1.5 font-mono text-[0.8125rem] transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-border-hover ml-1.5 rounded border px-2.5 py-1 font-mono text-xs transition-all duration-150"
              style={{ color: 'var(--color-accent)' }}
            >
              cv.pdf
            </a>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="border-border text-text-muted hover:text-text hover:border-border-hover flex h-8 w-8 items-center justify-center rounded border text-sm transition-all duration-150"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center p-1.5 text-lg md:hidden"
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
