# Stratagem AI Pro: PRD Part 2 - Components & Implementation

## Part 5: Remaining UI Components (Continued)

### 5.1 Workspace View

```tsx
// components/views/Workspace.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../stores/projectStore';
import { PROMPTS } from '../../constants/prompts';
import { CATEGORIES } from '../../constants/categories';
import { generateInsightStream } from '../../services/geminiService';
import { 
  Send, 
  Copy, 
  Download, 
  RefreshCw, 
  ChevronDown,
  Sparkles,
  AlertCircle,
  Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  const [scenario, setScenario] = useState(activeProject?.scenario || '');
  const [copied, setCopied] = useState(false);
  const [showPromptSelector, setShowPromptSelector] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  
  const selectedPrompt = PROMPTS.find(p => p.id === selectedPromptId);
  
  // Auto-scroll during generation
  useEffect(() => {
    if (outputRef.current && isGenerating) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [streamingOutput, isGenerating]);
  
  // Update project scenario when it changes
  useEffect(() => {
    if (activeProject && scenario !== activeProject.scenario) {
      const timeoutId = setTimeout(() => {
        updateProject(activeProject.id, { scenario });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [scenario]);
  
  const handleGenerate = async () => {
    if (!selectedPrompt || !scenario.trim()) return;
    
    setGenerating(true);
    clearStreamingOutput();
    
    try {
      for await (const chunk of generateInsightStream(selectedPrompt.promptTemplate, scenario)) {
        appendStreamingOutput(chunk);
      }
      
      // Save the completed output
      const output = useAppStore.getState().streamingOutput;
      saveGeneratedOutput({
        id: crypto.randomUUID(),
        promptId: selectedPrompt.id,
        promptTitle: selectedPrompt.title,
        category: selectedPrompt.category,
        input: scenario,
        output,
        createdAt: new Date(),
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
  
  const handleExport = () => {
    const blob = new Blob([streamingOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPrompt?.title || 'output'}-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (!activeProject) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="heading-2 mb-2">No Project Selected</h2>
          <p className="text-[var(--text-tertiary)] mb-6">
            Select a project from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col p-8 max-w-5xl mx-auto w-full animate-fade-in">
      {/* Project Header */}
      <div className="mb-6">
        <h1 className="heading-2 mb-1">{activeProject.name}</h1>
        <p className="text-sm text-[var(--text-muted)]">
          {activeProject.generatedOutputs.length} outputs generated
        </p>
      </div>
      
      {/* Scenario Input */}
      <div className="mb-6">
        <label className="label mb-2 block">Business Scenario</label>
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Describe your business situation, challenge, or decision context. The more detail you provide, the better the analysis..."
          className="w-full h-40 p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] focus:border-[var(--border-focus)] outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors font-serif"
        />
      </div>
      
      {/* Prompt Selector */}
      <div className="mb-6">
        <label className="label mb-2 block">Select Prompt</label>
        <div className="relative">
          <button
            onClick={() => setShowPromptSelector(!showPromptSelector)}
            className="w-full p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors text-left flex items-center justify-between"
          >
            {selectedPrompt ? (
              <div>
                <span className="font-medium">{selectedPrompt.title}</span>
                <span className="text-sm text-[var(--text-tertiary)] ml-2">
                  {CATEGORIES.find(c => c.id === selectedPrompt.category)?.name}
                </span>
              </div>
            ) : (
              <span className="text-[var(--text-muted)]">Choose a prompt from the library...</span>
            )}
            <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
          </button>
          
          {showPromptSelector && (
            <div className="absolute z-50 top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] shadow-lg">
              {CATEGORIES.map((category) => {
                const categoryPrompts = PROMPTS.filter(p => p.category === category.id);
                return (
                  <div key={category.id}>
                    <div 
                      className="px-4 py-2 text-xs font-medium sticky top-0"
                      style={{ 
                        backgroundColor: `${category.color}10`,
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
                        <div className="text-xs text-[var(--text-tertiary)] line-clamp-1">
                          {prompt.description}
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!selectedPrompt || !scenario.trim() || isGenerating}
        className={`
          mb-8 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
          ${isGenerating || !selectedPrompt || !scenario.trim()
            ? 'bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed'
            : 'bg-[var(--accent-primary)] text-slate-900 hover:bg-[var(--accent-primary-hover)]'
          }
        `}
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
      
      {/* Output Area */}
      {(streamingOutput || isGenerating) && (
        <div className="flex-1 flex flex-col bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
          {/* Output Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <span className="font-medium">{selectedPrompt?.title}</span>
              {isGenerating && (
                <span className="px-2 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs animate-pulse">
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
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-[var(--text-tertiary)]" />
                  )}
                </button>
                <button
                  onClick={handleExport}
                  className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                  title="Export as markdown"
                >
                  <Download className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
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
          
          {/* Output Content */}
          <div 
            ref={outputRef}
            className="flex-1 p-6 overflow-y-auto prose prose-invert prose-amber max-w-none"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-white mt-6 mb-3 pb-2 border-b border-[var(--border-subtle)]">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-white mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed font-serif">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-amber-400 font-semibold">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-[var(--text-secondary)]">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="text-left p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm font-medium">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="p-3 border border-[var(--border-subtle)] text-sm">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-amber-400 pl-4 my-4 text-[var(--text-tertiary)] italic">{children}</blockquote>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-sm font-mono">{children}</code>
                )
              }}
            >
              {streamingOutput}
            </ReactMarkdown>
            
            {isGenerating && (
              <span className="inline-block w-2 h-5 bg-amber-400 animate-pulse ml-1" />
            )}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!streamingOutput && !isGenerating && (
        <div className="flex-1 flex items-center justify-center bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-subtle)]">
          <div className="text-center p-8">
            <Sparkles className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <h3 className="heading-3 mb-2">Ready to Generate</h3>
            <p className="text-[var(--text-tertiary)] max-w-md">
              Enter your business scenario above, select a prompt, and click Generate to receive expert analysis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 5.2 UI Components

```tsx
// components/ui/Button.tsx

import React from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-[var(--accent-primary)] text-slate-900 hover:bg-[var(--accent-primary-hover)] disabled:bg-[var(--bg-elevated)] disabled:text-[var(--text-muted)]',
    secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] disabled:opacity-50',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-50',
    danger: 'bg-[var(--danger)] text-white hover:bg-red-600 disabled:opacity-50'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};
```

```tsx
// components/ui/Card.tsx

import React from 'react';
import { cn } from '../../lib/cn';

interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  onClick
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';
  
  const variantStyles = {
    default: 'bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]',
    elevated: 'bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] shadow-lg',
    bordered: 'bg-transparent border border-[var(--border-default)]'
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverStyles = hover ? 'hover:border-[var(--border-default)] hover:shadow-md cursor-pointer' : '';
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={cn(baseStyles, variantStyles[variant], paddingStyles[padding], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
```

```tsx
// components/ui/Skeleton.tsx

import React from 'react';
import { cn } from '../../lib/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height
}) => {
  const baseStyles = 'skeleton rounded';
  
  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-xl'
  };
  
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;
  
  return (
    <div 
      className={cn(baseStyles, variantStyles[variant], className)} 
      style={style}
    />
  );
};
```

### 5.3 Utility Functions

```typescript
// lib/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// lib/utils.ts

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return then.toLocaleDateString();
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function downloadAsFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## Part 6: Main Application Entry

### 6.1 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stratagem AI Pro</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Crimson+Pro:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    /* CSS Custom Properties - Design Tokens */
    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #12121a;
      --bg-tertiary: #1a1a24;
      --bg-elevated: #22222e;
      --bg-hover: #2a2a38;
      
      --border-subtle: #2a2a38;
      --border-default: #3a3a48;
      --border-strong: #4a4a58;
      --border-focus: #f59e0b;
      
      --text-primary: #fafafa;
      --text-secondary: #a1a1aa;
      --text-tertiary: #71717a;
      --text-muted: #52525b;
      
      --accent-primary: #f59e0b;
      --accent-primary-hover: #fbbf24;
      --accent-primary-muted: rgba(245, 158, 11, 0.15);
      
      --success: #22c55e;
      --warning: #eab308;
      --danger: #ef4444;
      --info: #3b82f6;
      
      --category-framing: #8b5cf6;
      --category-thinking: #06b6d4;
      --category-analysis: #22c55e;
      --category-communication: #f97316;
      --category-decision: #ec4899;
      --category-execution: #14b8a6;
      
      --sidebar-width: 72px;
      --header-height: 64px;
      
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: 'Crimson Pro', Georgia, serif;
      --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-sans);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--border-default);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--border-strong);
    }
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(16px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.25s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--bg-tertiary) 0%,
        var(--bg-elevated) 50%,
        var(--bg-tertiary) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    
    /* Typography */
    .heading-1 {
      font-family: var(--font-sans);
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.025em;
      color: var(--text-primary);
    }
    
    .heading-2 {
      font-family: var(--font-sans);
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.375;
      color: var(--text-primary);
    }
    
    .heading-3 {
      font-family: var(--font-sans);
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.375;
      color: var(--text-primary);
    }
    
    .body-text {
      font-family: var(--font-serif);
      font-size: 1rem;
      line-height: 1.625;
      color: var(--text-secondary);
    }
    
    .label {
      font-family: var(--font-sans);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    /* Prose styles for markdown output */
    .prose-invert strong {
      color: var(--accent-primary);
    }
    
    .prose-amber a {
      color: var(--accent-primary);
    }
  </style>
  
  <!-- Import Map for ESM -->
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "react/jsx-runtime": "https://esm.sh/react@18.2.0/jsx-runtime",
        "zustand": "https://esm.sh/zustand@4.5.0",
        "zustand/middleware": "https://esm.sh/zustand@4.5.0/middleware",
        "@google/generative-ai": "https://esm.sh/@google/generative-ai@0.7.0",
        "react-markdown": "https://esm.sh/react-markdown@9.0.0",
        "lucide-react": "https://esm.sh/lucide-react@0.300.0",
        "clsx": "https://esm.sh/clsx@2.1.0",
        "tailwind-merge": "https://esm.sh/tailwind-merge@2.2.0"
      }
    }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>
```

### 6.2 Main App Component

```tsx
// App.tsx

import React from 'react';
import { useAppStore } from './stores/projectStore';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/views/Dashboard';
import { Workspace } from './components/views/Workspace';
import { PromptLibrary } from './components/views/PromptLibrary';

export const App: React.FC = () => {
  const { currentView } = useAppStore();
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'workspace':
        return <Workspace />;
      case 'library':
        return <PromptLibrary />;
      case 'settings':
        return <div className="p-8"><h1 className="heading-1">Settings</h1></div>;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <AppLayout>
      {renderView()}
    </AppLayout>
  );
};

export default App;
```

### 6.3 Entry Point

```tsx
// index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```

---

## Part 7: Demo Data & Example Projects

```typescript
// constants/demoProjects.ts

export const DEMO_PROJECTS = [
  {
    id: 'demo-1',
    name: 'Tech Startup Series B Strategy',
    scenario: `Our B2B SaaS company has grown from $2M to $18M ARR in 3 years. We're raising Series B ($40M target) but facing pressure from investors on multiple fronts:

1. Our sales cycle has lengthened from 45 to 90 days as we move upmarket
2. Two well-funded competitors launched in the past year
3. Our NRR dropped from 130% to 115% due to churn in SMB segment
4. Engineering wants to rebuild the platform (18 month project)

The board is split: half want aggressive growth, half want profitability. We need to decide on our strategic direction before the fundraise.`,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    generatedOutputs: []
  },
  {
    id: 'demo-2',
    name: 'Manufacturing Cost Transformation',
    scenario: `A mid-sized industrial manufacturer ($800M revenue) is facing margin compression. Raw material costs are up 22%, labor costs up 15%, but we can only pass through 8% to customers due to competitive pressure.

Current state:
- Gross margin: 28% (down from 35% two years ago)
- 4 manufacturing plants across 3 countries
- 2,400 employees in operations
- Mix of automated and manual processes
- Legacy ERP system (15 years old)

The CEO wants a plan to restore margins to 32% within 18 months without major headcount reductions (politically sensitive due to union relationships).`,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-17'),
    generatedOutputs: []
  },
  {
    id: 'demo-3',
    name: 'Healthcare Market Entry',
    scenario: `A digital health company successful in the US ($150M revenue, profitable) is evaluating expansion into Southeast Asia. Initial analysis suggests:

Opportunity:
- 700M population across target markets
- Growing middle class with increasing healthcare spending
- Underserved in digital health solutions
- Favorable regulatory trends

Challenges:
- Fragmented healthcare systems across countries
- Different regulatory requirements in each market
- Lower willingness to pay vs. US
- Local competitors with deep relationships
- Our tech assumes English proficiency

We have $50M allocated for international expansion. Should we enter Southeast Asia? If so, which markets and what entry mode?`,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    generatedOutputs: []
  }
];
```

---

## Part 8: Deployment Checklist

### Pre-Deployment
- [ ] API key configured in environment variables
- [ ] All imports resolve correctly
- [ ] TypeScript compiles without errors
- [ ] Zustand store persists correctly
- [ ] Streaming generation works end-to-end
- [ ] All 37 prompts render correctly
- [ ] Copy/Export functionality works
- [ ] Responsive design tested on mobile
- [ ] Loading states display properly
- [ ] Error handling covers edge cases

### Post-Deployment
- [ ] Performance audit (Lighthouse score > 90)
- [ ] Test on Chrome, Firefox, Safari
- [ ] Verify localStorage persistence
- [ ] Test API rate limits
- [ ] Monitor error tracking

---

## Summary

This PRD delivers a complete, production-ready consulting workbench with:

1. **37 Expert Prompts** across 6 categories — real consulting prompts, not generic frameworks
2. **Premium UI/UX** — dark theme, professional typography, smooth animations
3. **Working Application** — complete code for all components, stores, services
4. **Streaming Output** — real-time AI generation with markdown rendering
5. **Project Management** — persistent storage, output history, export functionality

Paste both PRD files into Gemini, and it has everything needed to build the complete application.
