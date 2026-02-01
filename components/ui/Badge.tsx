import React from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'accent' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ tone = 'default', className, children, ...props }) => {
  const toneStyles = {
    default: 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]',
    accent: 'bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]',
    success: 'bg-[rgba(5,150,105,0.12)] text-[var(--success)]',
    warning: 'bg-[rgba(180,83,9,0.12)] text-[var(--warning)]'
  };

  return (
    <span
      className={cn('px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide', toneStyles[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
};
