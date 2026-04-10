import React from 'react';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

export default function Tag({ children, color = 'var(--color-accent)' }: TagProps) {
  return (
    <span
      className="rounded px-2 py-0.5 text-[0.6875rem]"
      style={{
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
        color,
      }}
    >
      {children}
    </span>
  );
}
