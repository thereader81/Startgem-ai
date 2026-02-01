import React, { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { PROMPTS } from '../../constants/prompts';
import { CATEGORIES } from '../../constants/categories';
import { useAppStore } from '../../stores/projectStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const PromptLibrary: React.FC = () => {
  const { setSelectedPrompt, setView } = useAppStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredPrompts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROMPTS.filter((prompt) => {
      const matchesCategory = category === 'all' || prompt.category === category;
      const matchesQuery =
        !query ||
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags?.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [search, category]);

  return (
    <div className="p-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
            Prompt Library
          </div>
          <h1 className="heading-1">Consulting Prompt Library</h1>
          <p className="text-[var(--text-secondary)]">
            Curated prompts for framing, analysis, decision, and execution.
          </p>
        </div>
        <div className="w-full lg:w-96">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search prompts"
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="elevated">
          <div className="text-xs text-[var(--text-tertiary)]">Total prompts</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)]">{PROMPTS.length}</div>
        </Card>
        <Card variant="elevated">
          <div className="text-xs text-[var(--text-tertiary)]">Categories</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)]">{CATEGORIES.length}</div>
        </Card>
        <Card variant="elevated">
          <div className="text-xs text-[var(--text-tertiary)]">Results shown</div>
          <div className="text-2xl font-semibold text-[var(--text-primary)]">{filteredPrompts.length}</div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            category === 'all'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary-muted)]'
              : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors flex items-center gap-2 ${
              category === cat.id
                ? 'bg-[rgba(15,23,42,0.04)]'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            style={category === cat.id ? { color: cat.color, borderColor: cat.color } : undefined}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredPrompts.map((prompt) => {
          const categoryData = CATEGORIES.find((cat) => cat.id === prompt.category);
          return (
            <Card key={prompt.id} variant="elevated" hover="lift" className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <Badge tone="accent" style={{ color: categoryData?.color }}>
                  {categoryData?.name}
                </Badge>
                <Sparkles className="w-4 h-4 text-[var(--text-tertiary)]" />
              </div>
              <h3 className="heading-3 mb-2">{prompt.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">{prompt.description}</p>
              <div className="mt-auto">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedPrompt(prompt.id);
                    setView('workspace');
                  }}
                >
                  Use Prompt
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
