import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export default function Badge({ children, color = 'var(--color-accent)' }: BadgeProps) {
  return (
    <span
      className="rounded px-1.5 py-0.5 text-[0.625rem] font-medium"
      style={{
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        color,
      }}
    >
      {children}
    </span>
  );
}
