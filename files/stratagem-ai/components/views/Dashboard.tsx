import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import { useAppStore } from '../../stores/projectStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { formatRelative } from '../../lib/formatters';
import { truncate } from '../../lib/utils';

const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Strategy Brief',
    description: 'Start with a clean slate and define the problem from scratch.',
    scenario: ''
  },
  {
    id: 'strategic-assessment',
    name: 'Strategic Assessment',
    description: 'Comprehensive assessment across market, capabilities, and options.',
    scenario:
      'Assess strategic position, competitive intensity, and viable growth paths for the next 24 months.'
  },
  {
    id: 'market-entry',
    name: 'Market Entry',
    description: 'Evaluate market size, entry modes, and risk-adjusted returns.',
    scenario: 'Assess whether to enter a new market and identify the optimal entry approach.'
  }
];

export const Dashboard: React.FC = () => {
  const { projects, createProject, setActiveProject, setView } = useAppStore();
  const [templateId, setTemplateId] = useState('strategic-assessment');
  const [projectName, setProjectName] = useState('');

  const selectedTemplate = useMemo(
    () => TEMPLATES.find((template) => template.id === templateId) ?? TEMPLATES[0],
    [templateId]
  );

  const totalOutputs = projects.reduce((total, project) => total + project.generatedOutputs.length, 0);
  const latestUpdate = projects
    .map((project) => project.updatedAt)
    .sort((a, b) => (a > b ? -1 : 1))[0];

  const handleCreate = () => {
    const name = projectName.trim() || selectedTemplate.name;
    createProject(name, selectedTemplate.scenario ?? '');
    setProjectName('');
  };

  return (
    <div className="p-10 space-y-10">
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              Executive Dashboard
            </div>
            <h1 className="heading-1">Stratagem AI Pro</h1>
            <p className="text-[var(--text-secondary)] max-w-xl">
              A consulting-grade workbench for structured analysis, decision support, and client-ready outputs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="accent">{projects.length} active projects</Badge>
            <Button onClick={() => createProject('New Strategic Review')} icon={<Plus className="w-4 h-4" />}>
              New Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6">
          <Card variant="elevated" className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="heading-2">Quick Start</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Create a new engagement with a guided template.
                </p>
              </div>
              <Badge tone="accent">Template</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label mb-2 block">Project Name</label>
                <Input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder={selectedTemplate.name}
                />
              </div>
              <div>
                <label className="label mb-2 block">Template</label>
                <select
                  value={templateId}
                  onChange={(event) => setTemplateId(event.target.value)}
                  className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)]"
                >
                  {TEMPLATES.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-[var(--text-tertiary)]">
                {selectedTemplate.description}
              </div>
              <Button icon={<Sparkles className="w-4 h-4" />} onClick={handleCreate}>
                Create Project
              </Button>
            </div>
          </Card>

          <Card variant="elevated" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="heading-3">Engagement Pulse</h3>
              <Badge tone="warning">Live</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-[var(--text-tertiary)]">Total outputs</div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">{totalOutputs}</div>
              </div>
              <div>
                <div className="text-xs text-[var(--text-tertiary)]">Latest activity</div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {latestUpdate ? formatRelative(latestUpdate) : 'No activity yet'}
                </div>
              </div>
              <div>
                <div className="text-xs text-[var(--text-tertiary)]">Active projects</div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {projects.length} engagements in motion
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-2">Recent Projects</h2>
            <Badge tone="accent">{projects.length} active</Badge>
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProject(project.id);
                  setView('workspace');
                }}
                className="w-full text-left border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--border-default)] transition-colors bg-[var(--bg-tertiary)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[var(--text-primary)]">
                      {project.name}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)] mt-1">
                      {truncate(project.scenario || 'No scenario yet.', 120)}
                    </div>
                  </div>
                  <div className="text-xs text-[var(--text-tertiary)] flex items-center gap-2">
                    {formatRelative(project.updatedAt)}
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                  <span>{project.generatedOutputs.length} outputs</span>
                  <span>Last updated {formatRelative(project.updatedAt)}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-2">Workflow Progress</h2>
            <Badge tone="warning">In motion</Badge>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => {
              const progress = Math.min(project.generatedOutputs.length / 7, 1);
              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                    <span>{project.name}</span>
                    <span>{Math.round(progress * 7)}/7 steps</span>
                  </div>
                  <div className="mt-2 h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-primary)]"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
};
