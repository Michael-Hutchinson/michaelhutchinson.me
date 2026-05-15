import React from 'react';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

interface CardProps {
  accent?: string;
  href?: string;
  hover?: boolean;
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  onMouseMove?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}

const base =
  'group bg-bg-terminal border-border hover:border-border-hover relative overflow-hidden rounded-lg border transition-colors duration-200';

export default function Card({
  accent,
  href,
  hover = false,
  initial,
  animate,
  transition,
  onMouseMove,
  children,
  className,
}: CardProps) {
  const motionProps = {
    className: className ? `${base} ${className}` : base,
    initial,
    animate,
    transition,
    ...(hover ? { whileHover: { y: -3 } } : {}),
    onMouseMove,
  };

  const content = (
    <>
      {accent && (
        <div
          className="absolute top-0 right-0 left-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: accent }}
        />
      )}
      {children}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <motion.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return <motion.div {...motionProps}>{content}</motion.div>;
}
