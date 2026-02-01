import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { WORKFLOW_TEMPLATES } from '../../constants/workflows';
import { useAppStore } from '../../stores/projectStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { generateInsightStream } from '../../services/geminiService';
import { DynamicChart, type ChartType } from '../visualizations/DynamicChart';
import type { Matrix2x2Data } from '../visualizations/Matrix2x2';
import type { RadarChartData } from '../visualizations/RadarChart';
import type { WaterfallChartData } from '../visualizations/WaterfallChart';
import type { PyramidData } from '../visualizations/Pyramid';

const chartData: Record<
  string,
  { chartType: ChartType; data: Matrix2x2Data | RadarChartData | WaterfallChartData | PyramidData }
> = {
  'five-forces': {
    chartType: 'radar',
    data: {
      title: 'Industry Force Intensity',
      metrics: [
        { label: 'New Entrants', value: 2.4 },
        { label: 'Supplier Power', value: 3.2 },
        { label: 'Buyer Power', value: 4.1 },
        { label: 'Substitutes', value: 2.6 },
        { label: 'Rivalry', value: 4.5 }
      ]
    }
  },
  swot: {
    chartType: 'matrix-2x2',
    data: {
      title: 'BCG Portfolio',
      xAxis: { label: 'Relative Market Share', low: 'Low', high: 'High' },
      yAxis: { label: 'Market Growth', low: 'Low', high: 'High' },
      quadrants: {
        topLeft: { label: 'Question Marks', color: '#93c5fd' },
        topRight: { label: 'Stars', color: '#22c55e' },
        bottomLeft: { label: 'Dogs', color: '#e2e8f0' },
        bottomRight: { label: 'Cash Cows', color: '#facc15' }
      },
      items: [
        { id: 'a', label: 'A', x: 28, y: 78, size: 32, color: '#1d4ed8' },
        { id: 'b', label: 'B', x: 68, y: 62, size: 36, color: '#15803d' },
        { id: 'c', label: 'C', x: 70, y: 26, size: 28, color: '#a16207' }
      ]
    }
  },
  options: {
    chartType: 'waterfall',
    data: {
      title: 'Margin Bridge',
      items: [
        { label: 'Base', value: 28, type: 'start' },
        { label: 'Pricing', value: 2.5, type: 'increase' },
        { label: 'Procurement', value: 1.5, type: 'increase' },
        { label: 'Labor', value: -1.2, type: 'decrease' },
        { label: 'Net', value: 30.8, type: 'total' }
      ]
    }
  },
  recommendation: {
    chartType: 'pyramid',
    data: {
      title: 'Recommendation Stack',
      levels: [
        { label: 'Strategic North Star', value: 'Profitability + Focused Growth', color: '#e7e5e4' },
        { label: 'Priority Levers', value: 'Cost Reset + Two Growth Bets', color: '#f5f5f4' },
        { label: 'Execution', value: 'PMO + KPI Cadence', color: '#fafaf9' }
      ]
    }
  }
};

export const Workflow: React.FC = () => {
  const {
    getActiveProject,
    setWorkflowTemplate,
    setWorkflowCurrentStep,
    saveWorkflowStepOutput
  } = useAppStore();
  const activeProject = getActiveProject();

  const persistedTemplateId = activeProject?.workflowState?.templateId ?? WORKFLOW_TEMPLATES[0].id;
  const persistedStepId =
    activeProject?.workflowState?.currentStepId ?? WORKFLOW_TEMPLATES[0].steps[0].id;

  const [templateId, setTemplateId] = useState(persistedTemplateId);
  const [currentStepId, setCurrentStepId] = useState(persistedStepId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputs, setOutputs] = useState<Record<string, string>>({});

  const template = useMemo(
    () => WORKFLOW_TEMPLATES.find((item) => item.id === templateId) ?? WORKFLOW_TEMPLATES[0],
    [templateId]
  );

  const currentStep = template.steps.find((step) => step.id === currentStepId) ?? template.steps[0];
  const progressCount = template.steps.findIndex((step) => step.id === currentStepId) + 1;

  useEffect(() => {
    if (!activeProject) return;
    setWorkflowTemplate(templateId, currentStepId);
    const persistedOutputs = activeProject.workflowState?.stepOutputs ?? [];
    if (persistedOutputs.length) {
      const nextOutputs = persistedOutputs.reduce<Record<string, string>>((acc, item) => {
        acc[item.stepId] = item.output;
        return acc;
      }, {});
      setOutputs(nextOutputs);
    }
  }, [activeProject?.id]);

  useEffect(() => {
    if (!activeProject) return;
    setWorkflowCurrentStep(currentStepId);
  }, [currentStepId, activeProject?.id]);

  const handleGenerate = async () => {
    if (!activeProject) return;
    setIsGenerating(true);
    let output = '';
    try {
      for await (const chunk of generateInsightStream(currentStep.promptTemplate, activeProject.scenario)) {
        output += chunk;
        setOutputs((prev) => ({ ...prev, [currentStep.id]: output }));
      }
      saveWorkflowStepOutput({
        stepId: currentStep.id,
        title: currentStep.title,
        output,
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Workflow</div>
          <h1 className="heading-1">{template.name}</h1>
          <p className="text-[var(--text-secondary)] max-w-xl">{template.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone="accent">{template.duration}</Badge>
          <select
            value={templateId}
            onChange={(event) => {
              const nextTemplateId = event.target.value;
              const nextTemplate =
                WORKFLOW_TEMPLATES.find((item) => item.id === nextTemplateId) ??
                WORKFLOW_TEMPLATES[0];
              setTemplateId(nextTemplateId);
              setCurrentStepId(nextTemplate.steps[0].id);
              setWorkflowTemplate(nextTemplateId, nextTemplate.steps[0].id);
            }}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)]"
          >
            {WORKFLOW_TEMPLATES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-6">
        <Card variant="elevated" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="heading-3">Step Progress</h3>
            <Badge tone="accent">
              {progressCount}/{template.steps.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {template.steps.map((step) => {
              const isActive = step.id === currentStepId;
              const isCompleted = Boolean(outputs[step.id]);
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepId(step.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                    isActive
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-muted)]'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-default)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</div>
                      <div className="text-xs text-[var(--text-tertiary)]">{step.framework}</div>
                    </div>
                    <span className="ml-auto text-[10px] text-[var(--text-tertiary)]">
                      {step.estimatedMinutes}m
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card variant="elevated" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="heading-2">{currentStep.title}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{currentStep.description}</p>
              </div>
              <Button
                onClick={handleGenerate}
                icon={<Sparkles className="w-4 h-4" />}
                loading={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Run Step'}
              </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
              <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-tertiary)]">
                <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em]">Output</div>
                <div className="mt-3 text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                  {outputs[currentStep.id]
                    ? outputs[currentStep.id]
                    : 'Run this step to generate a structured output.'}
                </div>
              </div>

              <div className="border border-[var(--border-subtle)] rounded-xl p-4 bg-[var(--bg-tertiary)]">
                <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em]">Visualization</div>
                <div className="mt-4">
                  {chartData[currentStep.id as keyof typeof chartData] ? (
                    <DynamicChart
                      chartType={chartData[currentStep.id as keyof typeof chartData].chartType}
                      data={chartData[currentStep.id as keyof typeof chartData].data}
                    />
                  ) : (
                    <div className="text-sm text-[var(--text-tertiary)]">
                      No chart for this step yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card variant="bordered" className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em]">Next Step</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {template.steps[progressCount]?.title ?? 'Workflow complete'}
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                const next = template.steps[progressCount];
                if (next) setCurrentStepId(next.id);
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Advance
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
