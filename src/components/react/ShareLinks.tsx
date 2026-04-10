import React from 'react';
import { LinkedinIcon } from './icons';

interface ShareLinksProps {
  title: string;
  url: string;
}

const XIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ShareLinks({ title, url }: Readonly<ShareLinksProps>) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-muted font-mono text-xs">share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border-border text-text-muted hover:border-border-hover hover:text-text flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-150"
        aria-label="Share on X"
      >
        <XIcon />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border-border text-text-muted hover:border-border-hover hover:text-text flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-150"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
}
