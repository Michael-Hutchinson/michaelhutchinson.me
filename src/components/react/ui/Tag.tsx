import React from 'react';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

export default function Tag({
  children,
  color = 'var(--color-accent)',
}: TagProps) {
  return (
    <span
      className='px-2 py-0.5 rounded text-[0.6875rem]'
      style={{
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
        color,
      }}
    >
      {children}
    </span>
  );
}
