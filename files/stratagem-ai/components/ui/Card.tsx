import React from 'react';
import { cn } from '../../lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: 'lift' | 'glow' | 'border' | 'none';
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = 'none',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl',
    elevated: 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-card',
    bordered: 'bg-transparent border border-[var(--border-default)] rounded-2xl',
    glass: 'bg-[rgba(255,255,255,0.7)] border border-[var(--border-subtle)] rounded-2xl backdrop-blur'
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = {
    none: '',
    lift: 'transition-transform duration-200 hover:-translate-y-1',
    glow: 'transition-shadow duration-200 hover:shadow-soft',
    border: 'transition-colors duration-200 hover:border-[var(--border-strong)]'
  };

  return (
    <div
      className={cn(variantStyles[variant], paddingStyles[padding], hoverStyles[hover], className)}
      {...props}
    >
      {children}
    </div>
  );
};
