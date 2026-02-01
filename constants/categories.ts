import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'framing',
    name: 'Framing',
    description: 'Clarify the problem, scope, and success criteria.',
    color: 'var(--category-framing)'
  },
  {
    id: 'thinking',
    name: 'Structured Thinking',
    description: 'MECE decomposition and hypothesis-driven logic.',
    color: 'var(--category-thinking)'
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description: 'Market, competitive, and financial diagnostics.',
    color: 'var(--category-analysis)'
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Executive-ready narratives and storylines.',
    color: 'var(--category-communication)'
  },
  {
    id: 'decision',
    name: 'Decision',
    description: 'Option evaluation and decision support.',
    color: 'var(--category-decision)'
  },
  {
    id: 'execution',
    name: 'Execution',
    description: 'Roadmaps, initiatives, and change execution.',
    color: 'var(--category-execution)'
  }
];
