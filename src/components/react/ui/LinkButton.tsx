import React from 'react';

interface LinkButtonProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

export default function LinkButton({
  href,
  external = false,
  children,
}: Readonly<LinkButtonProps>) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="border-border hover:border-border-hover inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[0.8125rem] transition-colors duration-200"
      style={{ color: 'var(--color-accent)' }}
    >
      {children}
    </a>
  );
}
