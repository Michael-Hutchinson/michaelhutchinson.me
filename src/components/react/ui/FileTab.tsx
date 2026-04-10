import React from 'react';
import Badge from './Badge';

interface FileTabProps {
  label: string;
  path: string;
  color?: string;
}

export default function FileTab({ label, path, color = 'var(--color-accent)' }: FileTabProps) {
  return (
    <div className="border-border text-text-muted flex items-center gap-2 border-b px-3.5 py-2 text-[0.6875rem] tracking-wide">
      <Badge color={color}>{label}</Badge> {path}
    </div>
  );
}
