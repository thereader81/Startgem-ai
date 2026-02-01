import React from 'react';
import { LayoutGrid, Layers3, BookOpen, Settings, Sparkles, Map } from 'lucide-react';
import { useAppStore } from '../../stores/projectStore';
import { cn } from '../../lib/cn';
import type { AppView } from '../../types';

const NAV_ITEMS: { id: AppView; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'workflow', label: 'Workflow', icon: <Map className="h-4 w-4" /> },
  { id: 'workspace', label: 'Workspace', icon: <Layers3 className="h-4 w-4" /> },
  { id: 'library', label: 'Prompt Library', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
];

export const Sidebar: React.FC = () => {
  const { currentView, setView } = useAppStore();

  return (
    <aside className="w-[var(--sidebar-width)] bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] px-5 py-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-2xl bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-soft">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide">Stratagem AI Pro</div>
          <div className="text-xs text-[var(--text-tertiary)]">Consulting Workbench</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all',
              currentView === item.id
                ? 'bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
            )}
          >
            <span className="text-[var(--text-tertiary)]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 text-xs text-[var(--text-tertiary)]">
        Built for senior consulting teams.
      </div>
    </aside>
  );
};
