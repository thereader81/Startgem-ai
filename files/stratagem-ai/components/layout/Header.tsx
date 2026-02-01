import React from 'react';
import { ChevronDown, MessageSquare, Plus, UserCircle } from 'lucide-react';
import { useAppStore } from '../../stores/projectStore';
import { Button } from '../ui/Button';

interface HeaderProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ chatOpen, onToggleChat }) => {
  const { projects, activeProjectId, setActiveProject, createProject, setView } = useAppStore();
  const activeProject = projects.find((project) => project.id === activeProjectId);

  return (
    <header className="h-[var(--header-height)] border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Active Project
          </div>
          <div className="relative">
            <select
              value={activeProjectId ?? ''}
              onChange={(event) => {
                setActiveProject(event.target.value);
                setView('workspace');
              }}
              className="appearance-none bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] rounded-lg pl-4 pr-9 py-2 focus:outline-none focus:border-[var(--border-focus)]"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => createProject('New Strategic Review')}
          icon={<Plus className="w-4 h-4" />}
        >
          New Project
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleChat}
          className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border transition-all ${
            chatOpen
              ? 'bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--accent-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {chatOpen ? 'Hide Advisor' : 'AI Advisor'}
        </button>
        <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
          <UserCircle className="w-8 h-8" />
          <span>{activeProject ? 'Partner View' : 'Guest'}</span>
        </div>
      </div>
    </header>
  );
};
