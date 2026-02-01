import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Copy,
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../stores/projectStore';
import { PROMPTS } from '../../constants/prompts';
import { CATEGORIES } from '../../constants/categories';
import { generateInsightStream } from '../../services/geminiService';
import { downloadAsFile } from '../../lib/utils';
import { exportToDocx, exportToPdf, exportToPptx } from '../../services/exportService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const Workspace: React.FC = () => {
  const {
    getActiveProject,
    updateProject,
    selectedPromptId,
    setSelectedPrompt,
    isGenerating,
    setGenerating,
    streamingOutput,
    appendStreamingOutput,
    clearStreamingOutput,
    saveGeneratedOutput
  } = useAppStore();

  const activeProject = getActiveProject();
  const [scenario, setScenario] = useState(activeProject?.scenario ?? '');
  const [copied, setCopied] = useState(false);
  const [showPromptSelector, setShowPromptSelector] = useState(false);
  const [exportFormat, setExportFormat] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const selectedPrompt = PROMPTS.find((prompt) => prompt.id === selectedPromptId) ?? null;
  const selectedCategory = selectedPrompt
    ? CATEGORIES.find((category) => category.id === selectedPrompt.category)
    : null;

  useEffect(() => {
    setScenario(activeProject?.scenario ?? '');
  }, [activeProject?.id]);

  useEffect(() => {
    if (!activeProject) return;
    if (scenario === activeProject.scenario) return;
    const timeoutId = setTimeout(() => {
      updateProject(activeProject.id, { scenario });
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [scenario, activeProject, updateProject]);

  useEffect(() => {
    if (outputRef.current && isGenerating) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [streamingOutput, isGenerating]);

  const handleGenerate = async () => {
    if (!selectedPrompt || !scenario.trim()) return;
    setGenerating(true);
    clearStreamingOutput();

    try {
      for await (const chunk of generateInsightStream(selectedPrompt.promptTemplate, scenario)) {
        appendStreamingOutput(chunk);
      }

      const output = useAppStore.getState().streamingOutput;
      saveGeneratedOutput({
        id: crypto.randomUUID ? crypto.randomUUID() : `output-${Date.now()}`,
        promptId: selectedPrompt.id,
        promptTitle: selectedPrompt.title,
        category: selectedPrompt.category,
        input: scenario,
        output,
        createdAt: new Date().toISOString(),
        isFavorite: false
      });
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(streamingOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async (format: string) => {
    if (!streamingOutput) return;
    const title = selectedPrompt?.title || 'output';

    if (format === 'md') {
      const fileName = `${title}-${new Date().toISOString().split('T')[0]}.md`;
      downloadAsFile(streamingOutput, fileName, 'text/markdown');
    }

    if (format === 'pdf') {
      exportToPdf(title, streamingOutput);
    }

    if (format === 'pptx') {
      await exportToPptx(title, streamingOutput);
    }

    if (format === 'docx') {
      await exportToDocx(title, streamingOutput);
    }
  };

  const handleExportChange = async (value: string) => {
    setExportFormat(value);
    if (!value) return;
    await handleExport(value);
    setExportFormat('');
  };

  if (!activeProject) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="heading-2 mb-2">No Project Selected</h2>
          <p className="text-[var(--text-tertiary)] mb-6">
            Select a project from the header or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-10 max-w-6xl mx-auto w-full animate-fade-in">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Workspace</div>
        <h1 className="heading-2 mb-1">{activeProject.name}</h1>
        <p className="text-sm text-[var(--text-tertiary)]">
          {activeProject.generatedOutputs.length} outputs generated
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mb-8">
        <Card variant="elevated" className="space-y-3">
          <label className="label">Business Scenario</label>
          <textarea
            value={scenario}
            onChange={(event) => setScenario(event.target.value)}
            placeholder="Describe the situation, constraints, and decision context."
            className="w-full h-44 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--border-focus)] outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors font-serif"
          />
          <div className="text-xs text-[var(--text-tertiary)]">
            Tip: include timeline, stakeholders, constraints, and success metrics.
          </div>
        </Card>

        <Card variant="elevated" className="space-y-3 relative">
          <label className="label">Select Prompt</label>
          <div className="relative">
            <button
              onClick={() => setShowPromptSelector((prev) => !prev)}
              className="w-full p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors text-left flex items-center justify-between"
            >
              {selectedPrompt ? (
                <div>
                  <span className="font-medium">{selectedPrompt.title}</span>
                  <span className="text-sm text-[var(--text-tertiary)] ml-2">
                    {selectedCategory?.name}
                  </span>
                </div>
              ) : (
                <span className="text-[var(--text-muted)]">Choose a prompt from the library...</span>
              )}
              <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
            </button>

            {showPromptSelector ? (
              <div className="absolute z-50 top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] shadow-soft">
                {CATEGORIES.map((category) => {
                  const categoryPrompts = PROMPTS.filter((prompt) => prompt.category === category.id);
                  return (
                    <div key={category.id}>
                      <div
                        className="px-4 py-2 text-xs font-medium sticky top-0"
                        style={{
                          backgroundColor: `${category.color}15`,
                          color: category.color
                        }}
                      >
                        {category.name}
                      </div>
                      {categoryPrompts.map((prompt) => (
                        <button
                          key={prompt.id}
                          onClick={() => {
                            setSelectedPrompt(prompt.id);
                            setShowPromptSelector(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-[var(--bg-hover)] transition-colors ${
                            selectedPromptId === prompt.id ? 'bg-[var(--accent-primary-muted)]' : ''
                          }`}
                        >
                          <div className="font-medium text-sm">{prompt.title}</div>
                          <div className="text-xs text-[var(--text-tertiary)] truncate">
                            {prompt.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {selectedPrompt ? (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-4 space-y-2">
              <div className="flex items-center gap-2">
                {selectedCategory ? (
                  <Badge tone="accent" style={{ color: selectedCategory.color }}>
                    {selectedCategory.name}
                  </Badge>
                ) : null}
                <span className="text-xs text-[var(--text-tertiary)]">Prompt details</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{selectedPrompt.description}</p>
            </div>
          ) : null}
        </Card>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleGenerate}
          disabled={!selectedPrompt || !scenario.trim() || isGenerating}
          className={`px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isGenerating || !selectedPrompt || !scenario.trim()
              ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
              : 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Analysis
            </>
          )}
        </button>
      </div>

      {(streamingOutput || isGenerating) && (
        <div className="flex-1 flex flex-col bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <span className="font-medium">{selectedPrompt?.title}</span>
              {selectedCategory ? (
                <Badge tone="accent" style={{ color: selectedCategory.color }}>
                  {selectedCategory.name}
                </Badge>
              ) : null}
              {isGenerating && (
                <span className="px-2 py-1 rounded-full bg-[rgba(15,23,42,0.08)] text-[var(--accent-primary)] text-xs animate-pulse">
                  Generating...
                </span>
              )}
            </div>

            {!isGenerating && streamingOutput && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[var(--success)]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--text-tertiary)]" />
                  )}
                </button>
                <div className="relative">
                  <select
                    value={exportFormat}
                    onChange={(event) => handleExportChange(event.target.value)}
                    className="appearance-none bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-[var(--border-focus)]"
                  >
                    <option value="">Export</option>
                    <option value="md">Markdown</option>
                    <option value="pdf">PDF</option>
                    <option value="pptx">PPTX</option>
                    <option value="docx">DOCX</option>
                  </select>
                  <Download className="w-3.5 h-3.5 text-[var(--text-tertiary)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  onClick={handleGenerate}
                  className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
              </div>
            )}
          </div>

          <div ref={outputRef} className="flex-1 p-6 overflow-y-auto prose max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-3 pb-2 border-b border-[var(--border-subtle)]">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-[var(--text-primary)] mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed font-serif">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-[var(--text-primary)] font-semibold">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-[var(--text-secondary)]">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">-</span>
                    <span>{children}</span>
                  </li>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="text-left p-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-sm font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-3 border border-[var(--border-subtle)] text-sm">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[var(--accent-primary)] pl-4 my-4 text-[var(--text-tertiary)] italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-sm font-mono">
                    {children}
                  </code>
                )
              }}
            >
              {streamingOutput}
            </ReactMarkdown>

            {isGenerating && <span className="inline-block w-2 h-5 bg-[var(--accent-primary)] animate-pulse ml-1" />}
          </div>
        </div>
      )}

      {!streamingOutput && !isGenerating && (
        <div className="flex-1 flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)]">
          <div className="text-center p-8">
            <Sparkles className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <h3 className="heading-3 mb-2">Ready to Generate</h3>
            <p className="text-[var(--text-tertiary)] max-w-md">
              Provide your scenario, choose a prompt, and generate a structured consulting analysis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
