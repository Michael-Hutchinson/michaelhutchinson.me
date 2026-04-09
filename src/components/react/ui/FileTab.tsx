import React from 'react';
import Badge from './Badge';

interface FileTabProps {
  label: string;
  path: string;
  color?: string;
}

export default function FileTab({
  label,
  path,
  color = 'var(--color-accent)',
}: FileTabProps) {
  return (
    <div className='flex items-center gap-2 px-3.5 py-2 border-b border-border text-[0.6875rem] text-text-muted tracking-wide'>
      <Badge color={color}>{label}</Badge> {path}
    </div>
  );
}
