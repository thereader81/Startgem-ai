# Stratagem AI Pro: Complete Product Requirements Document

## Executive Summary

Transform Stratagem AI from a basic prompt-driven analysis tool into **Stratagem AI Pro** — the definitive AI-powered consulting workbench that senior partners at McKinsey, BCG, and Bain would actually use. This PRD details everything needed to build a demo-ready, production-grade application that showcases world-class consulting methodology, premium UI/UX, and practical integrations.

**Target Demo Audience**: Senior Partners, Managing Directors, and Engagement Managers at Tier-1 consulting firms

**Core Value Proposition**: Compress 40 hours of junior analyst work into 4 hours of senior-quality output

---

## Part 1: Design System & Visual Identity

### 1.1 Typography System

**Philosophy**: Consulting is about precision and authority. The typography must convey both.

```css
/* Primary Display Font */
--font-display: 'Söhne', 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;

/* Body Font */
--font-body: 'Spectral', 'Charter', Georgia, serif;

/* Monospace for Data */
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;

/* Font Scale (Major Third - 1.25) */
--text-xs: 0.64rem;    /* 10.24px - labels */
--text-sm: 0.8rem;     /* 12.8px - captions */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.25rem;    /* 20px - lead */
--text-xl: 1.563rem;   /* 25px - h4 */
--text-2xl: 1.953rem;  /* 31.25px - h3 */
--text-3xl: 2.441rem;  /* 39px - h2 */
--text-4xl: 3.052rem;  /* 48.83px - h1 */
--text-5xl: 3.815rem;  /* 61px - display */
```

**Google Fonts Fallback** (if custom fonts unavailable):
- Display: `DM Sans` (700, 600)
- Body: `Source Serif 4` (400, 500, 600)
- Mono: `JetBrains Mono` (400)

### 1.2 Color Palette

**Primary Theme: "Midnight Consulting"**

```css
/* Core Colors */
--slate-950: #020617;      /* Primary background */
--slate-900: #0f172a;      /* Card backgrounds */
--slate-800: #1e293b;      /* Secondary surfaces */
--slate-700: #334155;      /* Borders */
--slate-400: #94a3b8;      /* Secondary text */
--slate-200: #e2e8f0;      /* Primary text */
--white: #ffffff;          /* Headings */

/* Accent Colors */
--amber-400: #fbbf24;      /* Primary accent - signals strategy */
--amber-500: #f59e0b;      /* Hover states */
--emerald-400: #34d399;    /* Success/Growth indicators */
--rose-400: #fb7185;       /* Risk/Attention indicators */
--blue-400: #60a5fa;       /* Information/Process */

/* Gradient */
--gradient-primary: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
--gradient-surface: linear-gradient(180deg, #0f172a 0%, #020617 100%);
```

**Secondary Theme: "Paper & Ink" (Light Mode)**

```css
--paper-white: #fafaf9;
--paper-cream: #f5f5f4;
--ink-900: #1c1917;
--ink-700: #44403c;
--ink-500: #78716c;
--accent-blue: #1e40af;
--accent-gold: #b45309;
```

### 1.3 Spacing & Layout System

```css
/* Spacing Scale (8px base) */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */

/* Container Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Sidebar Width */
--sidebar-collapsed: 64px;
--sidebar-expanded: 280px;
```

### 1.4 Motion & Animation

```css
/* Timing Functions */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Durations */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Standard Transitions */
.transition-base {
  transition: all var(--duration-normal) var(--ease-out-expo);
}

/* Page Enter Animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger Children */
.stagger-children > * {
  animation: slideUp var(--duration-slow) var(--ease-out-expo) forwards;
  opacity: 0;
}
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 50ms; }
.stagger-children > *:nth-child(3) { animation-delay: 100ms; }
.stagger-children > *:nth-child(4) { animation-delay: 150ms; }
.stagger-children > *:nth-child(5) { animation-delay: 200ms; }

/* Skeleton Loading Pulse */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--slate-800) 0%,
    var(--slate-700) 50%,
    var(--slate-800) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 1.5 Component Specifications

#### Card Component

```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'bordered' | 'glass';
  padding: 'none' | 'sm' | 'md' | 'lg';
  hover?: 'lift' | 'glow' | 'border' | 'none';
}

// Default Card
.card-default {
  background: var(--slate-900);
  border: 1px solid var(--slate-800);
  border-radius: 12px;
}

// Elevated Card (for primary content)
.card-elevated {
  background: var(--slate-900);
  border: 1px solid var(--slate-700);
  border-radius: 16px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -2px rgba(0, 0, 0, 0.3);
}

// Glass Card (for overlays)
.card-glass {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
}
```

#### Button Specifications

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Primary Button
.btn-primary {
  background: var(--gradient-primary);
  color: var(--slate-950);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all var(--duration-fast) var(--ease-out-expo);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
}

// Ghost Button
.btn-ghost {
  background: transparent;
  color: var(--slate-400);
  border: 1px solid var(--slate-700);
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-ghost:hover {
  color: var(--white);
  border-color: var(--slate-500);
  background: var(--slate-800);
}
```

---

## Part 2: Enhanced Core Features

### 2.1 Consulting Framework Library

**Requirement**: Expand beyond basic frameworks to include the complete consulting toolkit.

```typescript
interface Framework {
  id: string;
  name: string;
  category: FrameworkCategory;
  description: string;
  whenToUse: string[];
  structure: FrameworkStructure;
  promptTemplate: string;
  visualizationType: VisualizationType;
  complexity: 'basic' | 'intermediate' | 'advanced';
  origin: string; // e.g., "McKinsey", "BCG", "Academic"
}

type FrameworkCategory = 
  | 'strategic-analysis'
  | 'market-analysis'
  | 'operational'
  | 'financial'
  | 'organizational'
  | 'innovation'
  | 'communication';

type VisualizationType = 
  | 'matrix-2x2'
  | 'matrix-3x3'
  | 'pyramid'
  | 'staircase'
  | 'radar'
  | 'waterfall'
  | 'sankey'
  | 'tree'
  | 'timeline'
  | 'venn'
  | 'bar-chart'
  | 'flow-diagram';
```

**Complete Framework List (50+ frameworks)**:

**Strategic Analysis**
1. SWOT Analysis
2. Porter's Five Forces
3. PESTLE Analysis
4. Value Chain Analysis
5. Core Competency Analysis
6. Strategic Group Mapping
7. Blue Ocean Strategy Canvas
8. VRIO Framework
9. McKinsey 7S Framework
10. GE-McKinsey Nine-Box Matrix
11. BCG Growth-Share Matrix
12. Ansoff Matrix
13. ADL Matrix (Industry Life Cycle)
14. Strategic Clock (Bowman)
15. Scenario Planning Framework

**Market & Competitive Analysis**
16. Market Sizing (TAM/SAM/SOM)
17. Competitive Benchmarking
18. Customer Segmentation
19. Jobs-to-Be-Done Framework
20. Kano Model
21. Voice of Customer Analysis
22. Win-Loss Analysis
23. Brand Positioning Map
24. Price-Value Analysis
25. Channel Strategy Framework

**Operational Excellence**
26. Lean Six Sigma Analysis
27. Process Mapping
28. Root Cause Analysis (5 Whys)
29. Ishikawa/Fishbone Diagram
30. DMAIC Framework
31. Theory of Constraints
32. Capacity Planning Framework
33. Make-vs-Buy Analysis
34. Supply Chain Optimization
35. Inventory Optimization (EOQ)

**Financial Analysis**
36. DCF Valuation
37. Comparable Company Analysis
38. Precedent Transaction Analysis
39. LBO Analysis Framework
40. Financial Due Diligence
41. Working Capital Optimization
42. Cost-Benefit Analysis
43. Break-Even Analysis
44. Sensitivity Analysis
45. Monte Carlo Simulation Setup

**Organizational**
46. Organizational Design Framework
47. RACI Matrix
48. Change Management (ADKAR)
49. Talent Assessment Grid
50. Culture Web Analysis
51. Stakeholder Mapping
52. Power-Interest Grid

**Innovation & Product**
53. Design Thinking Framework
54. MVP Canvas
55. Business Model Canvas
56. Lean Canvas
57. Technology Adoption Lifecycle
58. Innovation Ambition Matrix

**Communication & Synthesis**
59. Minto Pyramid Principle
60. SCQA Framework (Situation-Complication-Question-Answer)
61. Issue Tree Decomposition
62. Hypothesis-Driven Approach
63. Executive Summary Framework

### 2.2 Multi-Step Workflow Engine

**Current State**: 5-step linear workflow  
**Target State**: Flexible, configurable workflow with branching logic

```typescript
interface WorkflowEngine {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  stepHistory: StepExecution[];
  
  // Methods
  createWorkflow(template: WorkflowTemplate): Workflow;
  executeStep(stepId: string, inputs: StepInputs): Promise<StepResult>;
  addConditionalBranch(stepId: string, condition: BranchCondition): void;
  generateSummary(): WorkflowSummary;
  exportToDocument(): DocumentExport;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  projectId: string;
  steps: WorkflowStep[];
  currentStepIndex: number;
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  estimatedDuration: number; // minutes
  actualDuration: number;
}

interface WorkflowStep {
  id: string;
  order: number;
  name: string;
  description: string;
  framework: Framework;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  inputs: StepInput[];
  outputs: StepOutput[];
  conditionalNext?: ConditionalBranch[];
  estimatedDuration: number;
  actualDuration?: number;
}

interface ConditionalBranch {
  condition: string; // e.g., "analysis.riskLevel === 'high'"
  nextStepId: string;
  label: string; // e.g., "High Risk Path"
}

interface StepOutput {
  type: 'text' | 'structured-data' | 'visualization' | 'table';
  content: any;
  metadata: OutputMetadata;
}
```

**Pre-Built Workflow Templates**:

```typescript
const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'strategic-assessment',
    name: 'Strategic Assessment',
    description: 'Comprehensive strategic analysis for board presentation',
    duration: '4-6 hours',
    steps: [
      { framework: 'pestle-analysis', name: 'External Environment Scan' },
      { framework: 'porters-five-forces', name: 'Industry Dynamics' },
      { framework: 'swot-analysis', name: 'Internal Capabilities' },
      { framework: 'competitive-benchmarking', name: 'Competitive Position' },
      { framework: 'strategic-options', name: 'Strategic Options Generation' },
      { framework: 'scenario-planning', name: 'Future Scenarios' },
      { framework: 'minto-pyramid', name: 'Executive Synthesis' }
    ]
  },
  {
    id: 'market-entry',
    name: 'Market Entry Strategy',
    description: 'New market opportunity assessment',
    duration: '3-5 hours',
    steps: [
      { framework: 'market-sizing', name: 'Market Size & Growth' },
      { framework: 'customer-segmentation', name: 'Target Segments' },
      { framework: 'competitive-analysis', name: 'Competitive Landscape' },
      { framework: 'entry-mode-analysis', name: 'Entry Mode Options' },
      { framework: 'financial-projection', name: 'Financial Model' },
      { framework: 'risk-assessment', name: 'Risk Mitigation' }
    ]
  },
  {
    id: 'due-diligence',
    name: 'Commercial Due Diligence',
    description: 'Pre-acquisition target assessment',
    duration: '8-12 hours',
    steps: [
      { framework: 'company-overview', name: 'Target Overview' },
      { framework: 'market-analysis', name: 'Market Position' },
      { framework: 'customer-analysis', name: 'Customer Dynamics' },
      { framework: 'operational-assessment', name: 'Operations Review' },
      { framework: 'financial-analysis', name: 'Financial Performance' },
      { framework: 'synergy-analysis', name: 'Synergy Identification' },
      { framework: 'risk-register', name: 'Risk Register' },
      { framework: 'valuation', name: 'Valuation Range' }
    ]
  },
  {
    id: 'cost-transformation',
    name: 'Cost Transformation',
    description: 'Cost reduction and efficiency improvement',
    duration: '5-7 hours',
    steps: [
      { framework: 'cost-baseline', name: 'Cost Baseline' },
      { framework: 'value-driver-tree', name: 'Value Driver Analysis' },
      { framework: 'benchmarking', name: 'Best-in-Class Benchmarking' },
      { framework: 'opportunity-sizing', name: 'Opportunity Sizing' },
      { framework: 'initiative-prioritization', name: 'Initiative Prioritization' },
      { framework: 'implementation-roadmap', name: 'Implementation Roadmap' }
    ]
  },
  {
    id: 'digital-strategy',
    name: 'Digital Strategy',
    description: 'Digital transformation roadmap',
    duration: '6-8 hours',
    steps: [
      { framework: 'digital-maturity', name: 'Digital Maturity Assessment' },
      { framework: 'technology-landscape', name: 'Technology Landscape' },
      { framework: 'customer-journey', name: 'Customer Journey Analysis' },
      { framework: 'use-case-prioritization', name: 'Use Case Prioritization' },
      { framework: 'capability-gaps', name: 'Capability Gap Analysis' },
      { framework: 'architecture-vision', name: 'Target Architecture' },
      { framework: 'transformation-roadmap', name: 'Transformation Roadmap' }
    ]
  }
];
```

### 2.3 Advanced Data Visualization Engine

**Requirement**: Move beyond basic bar charts to McKinsey-quality visualizations.

```typescript
interface VisualizationEngine {
  // Chart Types
  renderMatrix2x2(data: Matrix2x2Data): React.ReactNode;
  renderMatrix3x3(data: Matrix3x3Data): React.ReactNode;
  renderPyramid(data: PyramidData): React.ReactNode;
  renderWaterfall(data: WaterfallData): React.ReactNode;
  renderRadar(data: RadarData): React.ReactNode;
  renderSankey(data: SankeyData): React.ReactNode;
  renderTreeMap(data: TreeMapData): React.ReactNode;
  renderTimeline(data: TimelineData): React.ReactNode;
  renderFlowDiagram(data: FlowData): React.ReactNode;
  
  // Utility
  autoDetectChartType(data: any): ChartType;
  exportToPNG(chartRef: React.RefObject): Promise<Blob>;
  exportToSVG(chartRef: React.RefObject): string;
}

// Example: BCG Matrix Data Structure
interface Matrix2x2Data {
  title: string;
  xAxis: { label: string; low: string; high: string };
  yAxis: { label: string; low: string; high: string };
  quadrants: {
    topLeft: { label: string; color: string };
    topRight: { label: string; color: string };
    bottomLeft: { label: string; color: string };
    bottomRight: { label: string; color: string };
  };
  items: {
    id: string;
    label: string;
    x: number; // 0-100
    y: number; // 0-100
    size: number; // bubble size
    color?: string;
  }[];
}

// Example: Waterfall Chart Data
interface WaterfallData {
  title: string;
  currency?: string;
  items: {
    label: string;
    value: number;
    type: 'start' | 'increase' | 'decrease' | 'subtotal' | 'total';
    color?: string;
    annotation?: string;
  }[];
}

// Example: Pyramid/Staircase Data
interface PyramidData {
  title: string;
  orientation: 'horizontal' | 'vertical';
  levels: {
    label: string;
    value?: number | string;
    description?: string;
    color?: string;
    icon?: string;
  }[];
}
```

**Implementation with Recharts + Custom Components**:

```tsx
// BCG Matrix Component
const BCGMatrix: React.FC<{ data: Matrix2x2Data }> = ({ data }) => {
  return (
    <div className="relative w-full aspect-square max-w-2xl">
      {/* Axes Labels */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-slate-400">
        {data.xAxis.label}
      </div>
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-slate-400">
        {data.yAxis.label}
      </div>
      
      {/* Quadrant Grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full border border-slate-700 rounded-lg overflow-hidden">
        {Object.entries(data.quadrants).map(([key, quadrant]) => (
          <div
            key={key}
            className="relative flex items-center justify-center p-4"
            style={{ backgroundColor: `${quadrant.color}20` }}
          >
            <span className="text-xs font-medium text-slate-400 absolute top-2 left-2">
              {quadrant.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Plotted Items */}
      {data.items.map((item) => (
        <div
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            left: `${item.x}%`,
            bottom: `${item.y}%`,
          }}
        >
          <div
            className="rounded-full flex items-center justify-center text-xs font-medium bg-amber-400 text-slate-950"
            style={{
              width: `${item.size * 0.8}px`,
              height: `${item.size * 0.8}px`,
              backgroundColor: item.color || 'var(--amber-400)'
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
```

### 2.4 Intelligent Prompt Engine

**Requirement**: Context-aware prompts that adapt to the analysis state.

```typescript
interface PromptEngine {
  // Context Building
  buildContext(project: Project, step: WorkflowStep): PromptContext;
  enrichWithPreviousOutputs(context: PromptContext): PromptContext;
  
  // Prompt Generation
  generatePrompt(framework: Framework, context: PromptContext): string;
  generateFollowUpPrompt(question: string, context: PromptContext): string;
  
  // Output Parsing
  parseStructuredOutput(response: string, expectedFormat: OutputFormat): ParsedOutput;
  extractVisualizationData(response: string): VisualizationData | null;
  extractKeyInsights(response: string): Insight[];
}

interface PromptContext {
  scenario: string;
  industry: string;
  company: string;
  previousAnalyses: Analysis[];
  currentStep: WorkflowStep;
  userPreferences: UserPreferences;
  outputRequirements: OutputRequirements;
}

// Master Prompt Template
const MASTER_SYSTEM_PROMPT = `You are a world-class senior strategy consultant with 20+ years of experience at McKinsey, BCG, or Bain. Your analyses are known for:

1. **Structured Thinking**: Every analysis follows a clear framework with mutually exclusive, collectively exhaustive (MECE) logic.

2. **So-What Orientation**: Every observation leads to a clear implication. Never state a fact without explaining why it matters.

3. **Quantification**: Ground arguments in numbers wherever possible. Use ranges when precise data isn't available.

4. **Actionability**: Every analysis concludes with concrete, specific recommendations that a client could act on Monday morning.

5. **Executive Communication**: Use the Pyramid Principle. Lead with the answer. Support with evidence. Keep it tight.

Context for this analysis:
- Industry: {{industry}}
- Company: {{company}}
- Strategic Challenge: {{scenario}}
- Previous Analyses: {{previousSummary}}

Output Requirements:
- Format responses in structured markdown
- When data visualization is appropriate, include a JSON code block with the exact structure specified
- Bold key insights and recommendations
- Use bullet points sparingly - only when listing truly parallel items
- Include "So What" callouts for key implications
`;

// Framework-Specific Prompt Addendum Example
const PORTERS_FIVE_FORCES_PROMPT = `
## Analysis Framework: Porter's Five Forces

Analyze the competitive dynamics using Porter's Five Forces framework. For each force:

1. **Threat of New Entrants**
   - Capital requirements
   - Economies of scale
   - Brand loyalty / switching costs
   - Access to distribution channels
   - Regulatory barriers
   
2. **Bargaining Power of Suppliers**
   - Supplier concentration
   - Availability of substitutes
   - Importance to supplier
   - Switching costs
   - Forward integration threat

3. **Bargaining Power of Buyers**
   - Buyer concentration
   - Information availability
   - Price sensitivity
   - Backward integration threat
   - Product differentiation

4. **Threat of Substitutes**
   - Price-performance of substitutes
   - Switching costs
   - Buyer propensity to substitute

5. **Competitive Rivalry**
   - Number of competitors
   - Industry growth rate
   - Fixed costs / exit barriers
   - Product differentiation
   - Strategic stakes

## Output Requirements

1. Rate each force on a scale of 1-5 (1=Low, 5=High)
2. Identify the 2-3 most critical forces shaping industry profitability
3. Provide specific strategic implications

Include a JSON visualization block:
\`\`\`json
{
  "chartType": "radar",
  "data": {
    "labels": ["New Entrants", "Supplier Power", "Buyer Power", "Substitutes", "Rivalry"],
    "datasets": [{
      "label": "Force Intensity",
      "data": [3, 2, 4, 2, 5]
    }]
  }
}
\`\`\`
`;
```

---

## Part 3: New Feature Modules

### 3.1 Document Generation Engine

**Purpose**: Generate board-ready deliverables directly from analyses.

```typescript
interface DocumentGenerator {
  // Templates
  templates: DocumentTemplate[];
  
  // Generation
  generateSlide(analysis: Analysis, template: SlideTemplate): Slide;
  generateDocument(workflow: Workflow, template: DocumentTemplate): Document;
  generateExecutiveSummary(analyses: Analysis[]): ExecutiveSummary;
  
  // Export
  exportToPowerPoint(slides: Slide[]): Promise<Blob>;
  exportToWord(document: Document): Promise<Blob>;
  exportToPDF(document: Document): Promise<Blob>;
}

interface DocumentTemplate {
  id: string;
  name: string;
  type: 'presentation' | 'memo' | 'report';
  sections: TemplateSection[];
  styling: TemplateStyles;
}

const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'strategy-deck',
    name: 'Strategy Presentation',
    type: 'presentation',
    sections: [
      { type: 'title-slide', required: true },
      { type: 'executive-summary', required: true },
      { type: 'situation-overview', required: true },
      { type: 'analysis-section', repeatable: true },
      { type: 'recommendations', required: true },
      { type: 'implementation-roadmap', required: false },
      { type: 'appendix', required: false }
    ]
  },
  {
    id: 'executive-memo',
    name: 'Executive Memo',
    type: 'memo',
    sections: [
      { type: 'header', required: true },
      { type: 'recommendation', required: true },
      { type: 'situation', required: true },
      { type: 'analysis', required: true },
      { type: 'next-steps', required: true }
    ]
  },
  {
    id: 'due-diligence-report',
    name: 'Commercial DD Report',
    type: 'report',
    sections: [
      { type: 'executive-summary', required: true },
      { type: 'company-overview', required: true },
      { type: 'market-analysis', required: true },
      { type: 'competitive-position', required: true },
      { type: 'financial-performance', required: true },
      { type: 'risk-assessment', required: true },
      { type: 'recommendations', required: true },
      { type: 'appendices', required: false }
    ]
  }
];
```

**Slide Generation Logic**:

```typescript
const generateSlideContent = (analysis: Analysis): SlideContent => {
  return {
    title: analysis.framework.name,
    subtitle: `${analysis.project.company} | ${new Date().toLocaleDateString()}`,
    keyMessage: extractKeyInsight(analysis.output),
    body: {
      type: analysis.framework.visualizationType,
      content: analysis.visualizationData || formatAsText(analysis.output)
    },
    footer: {
      source: 'Stratagem AI Analysis',
      pageNumber: true
    }
  };
};
```

### 3.2 Data Integration Hub

**Purpose**: Connect to real data sources for grounded analysis.

```typescript
interface DataIntegrationHub {
  // Connections
  connections: DataConnection[];
  
  // Data Operations
  fetchCompanyData(ticker: string): Promise<CompanyData>;
  fetchIndustryData(industry: string): Promise<IndustryData>;
  fetchMarketData(market: string): Promise<MarketData>;
  searchNews(query: string, dateRange: DateRange): Promise<NewsArticle[]>;
  
  // Enrichment
  enrichAnalysisWithData(analysis: Analysis): EnrichedAnalysis;
}

interface DataConnection {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file' | 'oauth';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
}

// Supported Integrations
const DATA_SOURCES = [
  {
    id: 'sec-filings',
    name: 'SEC EDGAR',
    type: 'api',
    dataTypes: ['10-K', '10-Q', '8-K', 'Proxy'],
    free: true
  },
  {
    id: 'yahoo-finance',
    name: 'Yahoo Finance',
    type: 'api',
    dataTypes: ['Stock Prices', 'Financials', 'Estimates'],
    free: true
  },
  {
    id: 'world-bank',
    name: 'World Bank Open Data',
    type: 'api',
    dataTypes: ['GDP', 'Population', 'Trade', 'Development Indicators'],
    free: true
  },
  {
    id: 'fred',
    name: 'Federal Reserve Economic Data',
    type: 'api',
    dataTypes: ['Interest Rates', 'Inflation', 'Employment', 'GDP'],
    free: true
  },
  {
    id: 'google-trends',
    name: 'Google Trends',
    type: 'api',
    dataTypes: ['Search Interest', 'Regional Data'],
    free: true
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase',
    type: 'api',
    dataTypes: ['Funding', 'Acquisitions', 'People'],
    free: false
  },
  {
    id: 'statista',
    name: 'Statista',
    type: 'api',
    dataTypes: ['Market Size', 'Consumer Data', 'Industry Reports'],
    free: false
  }
];

// Example: Enrichment Function
const enrichWithPublicData = async (
  company: string,
  industry: string
): Promise<EnrichmentData> => {
  const [financials, news, trends] = await Promise.all([
    fetchYahooFinance(company),
    fetchRecentNews(company),
    fetchGoogleTrends(company, industry)
  ]);
  
  return {
    financials: {
      marketCap: financials.marketCap,
      revenue: financials.totalRevenue,
      grossMargin: financials.grossMargin,
      revenueGrowth: financials.revenueGrowth
    },
    news: news.slice(0, 5),
    trends: {
      searchInterest: trends.interest,
      relatedTopics: trends.relatedTopics
    }
  };
};
```

### 3.3 Collaboration & Export Module

**Purpose**: Enable team collaboration and professional deliverables.

```typescript
interface CollaborationModule {
  // Sharing
  shareProject(projectId: string, email: string, role: 'viewer' | 'editor'): Promise<void>;
  generateShareLink(projectId: string, expiry: Date): Promise<string>;
  
  // Comments
  addComment(analysisId: string, comment: Comment): Promise<void>;
  resolveComment(commentId: string): Promise<void>;
  
  // Version History
  getVersionHistory(projectId: string): Promise<Version[]>;
  restoreVersion(versionId: string): Promise<void>;
  
  // Export
  exportProject(projectId: string, format: ExportFormat): Promise<Blob>;
}

type ExportFormat = 
  | 'pptx'        // PowerPoint
  | 'docx'        // Word
  | 'pdf'         // PDF
  | 'xlsx'        // Excel (data only)
  | 'md'          // Markdown
  | 'notion'      // Notion-compatible markdown
  | 'confluence'  // Confluence wiki format
  | 'json';       // Raw JSON

interface Version {
  id: string;
  timestamp: Date;
  author: User;
  changes: Change[];
  snapshotUrl: string;
}
```

### 3.4 AI Assistant Chat

**Purpose**: Interactive Q&A for deeper analysis exploration.

```typescript
interface AIAssistant {
  // Conversation
  messages: Message[];
  context: ConversationContext;
  
  // Methods
  sendMessage(content: string): Promise<Message>;
  suggestFollowUps(): string[];
  summarizeConversation(): string;
  
  // Context Awareness
  loadProjectContext(project: Project): void;
  referenceAnalysis(analysisId: string): void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  references?: AnalysisReference[];
  suggestedActions?: SuggestedAction[];
}

interface SuggestedAction {
  type: 'run-analysis' | 'export' | 'refine' | 'compare';
  label: string;
  params: Record<string, any>;
}

// UI Component: Chat Panel
const ChatPanel: React.FC<{ project: Project }> = ({ project }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  const suggestions = [
    "What are the key risks I should be aware of?",
    "How does this compare to industry benchmarks?",
    "What additional analyses would strengthen this?",
    "Summarize the main findings for an executive audience"
  ];
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className="p-4 space-y-2">
          <p className="text-sm text-slate-400">Suggested questions:</p>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="block text-left text-sm text-amber-400 hover:text-amber-300"
            >
              → {s}
            </button>
          ))}
        </div>
      )}
      
      <div className="border-t border-slate-800 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-slate-800 rounded-lg px-4 py-2 text-white"
          />
          <button className="btn-primary px-4">Send</button>
        </div>
      </div>
    </div>
  );
};
```

### 3.5 Template & Reusability System

**Purpose**: Save and reuse custom prompts, workflows, and frameworks.

```typescript
interface TemplateLibrary {
  // User Templates
  userPrompts: CustomPrompt[];
  userWorkflows: CustomWorkflow[];
  userFrameworks: CustomFramework[];
  
  // Community Templates
  communityTemplates: CommunityTemplate[];
  
  // Methods
  saveAsTemplate(item: Prompt | Workflow | Framework): Promise<string>;
  loadTemplate(templateId: string): Promise<any>;
  shareTemplate(templateId: string): Promise<string>;
  forkTemplate(templateId: string): Promise<string>;
}

interface CustomPrompt {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  variables: PromptVariable[];
  outputFormat: OutputFormat;
  createdAt: Date;
  usageCount: number;
}

interface PromptVariable {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[];
  default?: string;
  required: boolean;
}
```

---

## Part 4: UI/UX Specifications

### 4.1 Application Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Logo    │ Project Selector ▼ │                    │ Settings │ Profile │
├──────────┼────────────────────────────────────────────────────┬─────────┤
│          │                                                    │         │
│ Dashboard│                                                    │         │
│          │                                                    │         │
│ ─────────│              MAIN CONTENT AREA                     │  AI     │
│          │                                                    │ CHAT    │
│ Workflow │              (Context-dependent view)              │ PANEL   │
│          │                                                    │         │
│ ─────────│                                                    │(toggle) │
│          │                                                    │         │
│ Library  │                                                    │         │
│          │                                                    │         │
│ ─────────│                                                    │         │
│          │                                                    │         │
│ Data     │                                                    │         │
│          ├────────────────────────────────────────────────────┼─────────┤
│ ─────────│                   Action Bar / Export              │         │
│          │                                                    │         │
│ Settings │                                                    │         │
│          │                                                    │         │
└──────────┴────────────────────────────────────────────────────┴─────────┘
```

### 4.2 View Specifications

#### Dashboard View

```typescript
interface DashboardView {
  sections: [
    {
      id: 'quick-actions',
      title: 'Quick Start',
      components: [
        'NewProjectCard',
        'RecentProjectsList',
        'TemplateSelector'
      ]
    },
    {
      id: 'activity',
      title: 'Recent Activity',
      components: [
        'ActivityTimeline',
        'ProjectStatusCards'
      ]
    },
    {
      id: 'insights',
      title: 'Key Insights',
      components: [
        'InsightHighlights',
        'PendingActions'
      ]
    }
  ]
}
```

**Dashboard Wireframe**:

```
┌──────────────────────────────────────────────────────────────┐
│                        DASHBOARD                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ + New Project   │  │ Strategic       │  │ Market Entry │ │
│  │                 │  │ Assessment      │  │ Analysis     │ │
│  │ Start fresh     │  │ Template        │  │ Template     │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                              │
│  Recent Projects                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ● TechCorp M&A Analysis          Last edited: 2h ago   │ │
│  │ ○ Retail Expansion Strategy       Last edited: 1d ago   │ │
│  │ ○ Healthcare Market Entry         Last edited: 3d ago   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Workflow Progress                                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ TechCorp M&A     [████████░░░░░░░░░░░░] 4/7 steps      │ │
│  │ Retail Expansion [██████████████████░░] 6/7 steps      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### Workflow View

```typescript
interface WorkflowView {
  layout: 'split' | 'full';
  leftPanel: {
    component: 'WorkflowStepper',
    width: '320px',
    content: [
      'StepList',
      'ProgressIndicator',
      'StepDetails'
    ]
  };
  mainPanel: {
    component: 'AnalysisWorkspace',
    content: [
      'FrameworkHeader',
      'InputForm',
      'GenerateButton',
      'OutputDisplay',
      'VisualizationArea',
      'ActionButtons'
    ]
  };
}
```

**Workflow Wireframe**:

```
┌──────────────────────────────────────────────────────────────────────┐
│  WORKFLOW: Strategic Assessment                                       │
├─────────────────┬────────────────────────────────────────────────────┤
│                 │                                                     │
│  Progress       │  Step 2: Porter's Five Forces                      │
│  ────────────── │  ──────────────────────────────────────────────── │
│                 │                                                     │
│  ✓ PESTLE       │  Analyze the competitive dynamics of the           │
│    Analysis     │  semiconductor industry using Porter's framework.  │
│                 │                                                     │
│  ● Porter's     │  ┌─────────────────────────────────────────────┐   │
│    Five Forces  │  │                                             │   │
│    ← Current    │  │           [RADAR CHART]                     │   │
│                 │  │                                             │   │
│  ○ SWOT         │  │     New Entrants: 2/5                       │   │
│    Analysis     │  │     Supplier Power: 3/5                     │   │
│                 │  │     Buyer Power: 4/5                        │   │
│  ○ Competitive  │  │     Substitutes: 2/5                        │   │
│    Benchmarking │  │     Rivalry: 5/5                            │   │
│                 │  │                                             │   │
│  ○ Strategic    │  └─────────────────────────────────────────────┘   │
│    Options      │                                                     │
│                 │  Key Findings                                       │
│  ○ Scenario     │  ─────────────────────────────────────────────────  │
│    Planning     │  • Industry rivalry is intense due to...           │
│                 │  • Buyer power is significant because...           │
│  ○ Executive    │  • Barriers to entry remain high through...        │
│    Synthesis    │                                                     │
│                 │  So What: The industry structure suggests...        │
│  ────────────── │                                                     │
│  Est: 45 min    │  ┌──────────────┐  ┌──────────────┐                │
│  Actual: 32 min │  │ ← Previous   │  │ Next Step →  │                │
│                 │  └──────────────┘  └──────────────┘                │
└─────────────────┴────────────────────────────────────────────────────┘
```

#### Library View

```
┌──────────────────────────────────────────────────────────────────────┐
│  FRAMEWORK LIBRARY                          [Search...]  [Filters ▼] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Categories                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ │
│  │ Strategic    │ │ Market       │ │ Financial    │ │ Operational │ │
│  │ Analysis     │ │ Analysis     │ │ Analysis     │ │ Excellence  │ │
│  │ 15 frameworks│ │ 12 frameworks│ │ 10 frameworks│ │ 8 frameworks│ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────────┘ │
│                                                                      │
│  Popular Frameworks                                                  │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ ⬡ Porter's Five Forces                                         │ │
│  │   Analyze competitive dynamics and industry profitability      │ │
│  │   Complexity: ●●○ Intermediate    Origin: Academic (Porter)    │ │
│  │   [Use in Workflow]  [Run Standalone]  [Learn More]            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ ⬡ BCG Growth-Share Matrix                                      │ │
│  │   Portfolio analysis using market growth and relative share    │ │
│  │   Complexity: ●○○ Basic    Origin: BCG                         │ │
│  │   [Use in Workflow]  [Run Standalone]  [Learn More]            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.3 Component Library

#### FrameworkCard

```tsx
interface FrameworkCardProps {
  framework: Framework;
  onSelect: () => void;
  onLearnMore: () => void;
  variant: 'compact' | 'detailed';
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({
  framework,
  onSelect,
  onLearnMore,
  variant = 'detailed'
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
            {framework.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
              {framework.name}
            </h3>
            <span className="text-xs text-slate-500">{framework.origin}</span>
          </div>
        </div>
        <ComplexityBadge level={framework.complexity} />
      </div>
      
      {variant === 'detailed' && (
        <>
          <p className="mt-4 text-sm text-slate-400 line-clamp-2">
            {framework.description}
          </p>
          
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={onSelect}
              className="flex-1 btn-primary text-sm py-2"
            >
              Use Framework
            </button>
            <button
              onClick={onLearnMore}
              className="btn-ghost text-sm py-2 px-3"
            >
              Learn
            </button>
          </div>
        </>
      )}
    </div>
  );
};
```

#### StepCard (for Workflow)

```tsx
interface StepCardProps {
  step: WorkflowStep;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  onActivate: () => void;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  isActive,
  isCompleted,
  isLocked,
  onActivate
}) => {
  return (
    <button
      onClick={onActivate}
      disabled={isLocked}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all duration-200",
        isActive && "bg-amber-400/10 border-amber-400",
        isCompleted && !isActive && "bg-slate-800/50 border-slate-700",
        !isActive && !isCompleted && !isLocked && "border-slate-800 hover:border-slate-600",
        isLocked && "opacity-50 cursor-not-allowed border-slate-800"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          isCompleted && "bg-emerald-400 text-slate-950",
          isActive && "bg-amber-400 text-slate-950",
          !isActive && !isCompleted && "bg-slate-700 text-slate-400"
        )}>
          {isCompleted ? '✓' : step.order}
        </div>
        <div className="flex-1">
          <p className={cn(
            "font-medium",
            isActive && "text-amber-400",
            isCompleted && "text-emerald-400",
            !isActive && !isCompleted && "text-slate-300"
          )}>
            {step.name}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {step.framework.name} · ~{step.estimatedDuration} min
          </p>
        </div>
      </div>
    </button>
  );
};
```

#### GeneratedOutput

```tsx
interface GeneratedOutputProps {
  output: StepOutput;
  isLoading: boolean;
  onRegenerate: () => void;
  onExport: () => void;
}

const GeneratedOutput: React.FC<GeneratedOutputProps> = ({
  output,
  isLoading,
  onRegenerate,
  onExport
}) => {
  const visualizationData = extractVisualization(output.content);
  const textContent = stripVisualization(output.content);
  
  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-32 w-full rounded-lg" />
        </div>
      )}
      
      {/* Visualization */}
      {!isLoading && visualizationData && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <DynamicChart data={visualizationData} />
        </div>
      )}
      
      {/* Text Content */}
      {!isLoading && textContent && (
        <div className="prose prose-invert prose-amber max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mt-8 mb-4">
                  {children}
                </h2>
              ),
              strong: ({ children }) => (
                <strong className="text-amber-400 font-semibold">
                  {children}
                </strong>
              ),
              li: ({ children }) => (
                <li className="text-slate-300 my-1">
                  {children}
                </li>
              )
            }}
          >
            {textContent}
          </ReactMarkdown>
        </div>
      )}
      
      {/* Actions */}
      {!isLoading && output && (
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
          <button onClick={onRegenerate} className="btn-ghost text-sm">
            ↻ Regenerate
          </button>
          <button onClick={onExport} className="btn-ghost text-sm">
            ↓ Export
          </button>
          <button className="btn-ghost text-sm">
            + Add to Presentation
          </button>
        </div>
      )}
    </div>
  );
};
```

### 4.4 Responsive Design Specifications

```css
/* Breakpoints */
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;

/* Mobile-First Base */
.sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  flex-direction: row;
}

/* Tablet and Up */
@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--sidebar-collapsed);
    height: 100vh;
    flex-direction: column;
  }
  
  .sidebar.expanded {
    width: var(--sidebar-expanded);
  }
}

/* Desktop */
@media (min-width: 1280px) {
  .chat-panel {
    display: block;
    width: 360px;
  }
}
```

---

## Part 5: Technical Architecture

### 5.1 State Management (Zustand)

```typescript
// stores/projectStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
  
  // Actions
  createProject: (name: string, scenario: string) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string) => void;
  
  // Workflow
  startWorkflow: (projectId: string, templateId: string) => void;
  completeStep: (stepId: string, output: StepOutput) => void;
  
  // Selectors
  getActiveProject: () => Project | null;
  getProjectById: (id: string) => Project | null;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      
      createProject: (name, scenario) => {
        const id = crypto.randomUUID();
        const project: Project = {
          id,
          name,
          scenario,
          createdAt: new Date(),
          updatedAt: new Date(),
          workflows: [],
          analyses: []
        };
        
        set((state) => ({
          projects: [...state.projects, project],
          activeProjectId: id
        }));
        
        return id;
      },
      
      // ... other actions
      
      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find(p => p.id === activeProjectId) || null;
      }
    }),
    {
      name: 'stratagem-projects',
      version: 1
    }
  )
);

// stores/uiStore.ts
interface UIState {
  view: View;
  sidebarExpanded: boolean;
  chatPanelOpen: boolean;
  theme: 'dark' | 'light';
  
  setView: (view: View) => void;
  toggleSidebar: () => void;
  toggleChatPanel: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>((set) => ({
  view: 'dashboard',
  sidebarExpanded: true,
  chatPanelOpen: false,
  theme: 'dark',
  
  setView: (view) => set({ view }),
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  toggleChatPanel: () => set((state) => ({ chatPanelOpen: !state.chatPanelOpen })),
  setTheme: (theme) => set({ theme })
}));
```

### 5.2 API Service Layer

```typescript
// services/api.ts
import { GoogleGenerativeAI, GenerateContentStreamResult } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface GenerationConfig {
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
}

export const aiService = {
  async *generateStream(
    systemPrompt: string,
    userPrompt: string,
    config: GenerationConfig = {}
  ): AsyncGenerator<string> {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: systemPrompt
    });
    
    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        topP: config.topP ?? 0.9,
        maxOutputTokens: config.maxOutputTokens ?? 8192
      }
    });
    
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  },
  
  async generate(
    systemPrompt: string,
    userPrompt: string,
    config: GenerationConfig = {}
  ): Promise<string> {
    let result = '';
    for await (const chunk of this.generateStream(systemPrompt, userPrompt, config)) {
      result += chunk;
    }
    return result;
  }
};

// services/dataService.ts
export const dataService = {
  async fetchCompanyFinancials(ticker: string): Promise<CompanyFinancials> {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=financialData,earnings,incomeStatementHistory`
    );
    
    if (!response.ok) throw new Error('Failed to fetch financials');
    
    const data = await response.json();
    return transformYahooData(data.quoteSummary.result[0]);
  },
  
  async fetchSECFilings(cik: string): Promise<SECFiling[]> {
    const response = await fetch(
      `https://data.sec.gov/submissions/CIK${cik.padStart(10, '0')}.json`
    );
    
    if (!response.ok) throw new Error('Failed to fetch SEC filings');
    
    const data = await response.json();
    return transformSECData(data);
  },
  
  async searchNews(query: string): Promise<NewsArticle[]> {
    // Use a free news API or web scraping service
    // Implementation depends on available APIs
  }
};
```

### 5.3 File Structure

```
stratagem-ai/
├── index.html
├── index.tsx
├── App.tsx
├── types/
│   ├── index.ts
│   ├── project.ts
│   ├── framework.ts
│   ├── workflow.ts
│   └── visualization.ts
├── constants/
│   ├── frameworks.ts
│   ├── workflows.ts
│   ├── prompts.ts
│   └── themes.ts
├── stores/
│   ├── projectStore.ts
│   ├── uiStore.ts
│   └── chatStore.ts
├── services/
│   ├── api.ts
│   ├── geminiService.ts
│   ├── dataService.ts
│   └── exportService.ts
├── hooks/
│   ├── useGeneration.ts
│   ├── useProject.ts
│   ├── useWorkflow.ts
│   └── useExport.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ChatPanel.tsx
│   │   └── Layout.tsx
│   ├── views/
│   │   ├── Dashboard.tsx
│   │   ├── Workflow.tsx
│   │   ├── Library.tsx
│   │   ├── DataHub.tsx
│   │   └── Settings.tsx
│   ├── workflow/
│   │   ├── WorkflowStepper.tsx
│   │   ├── StepCard.tsx
│   │   ├── AnalysisWorkspace.tsx
│   │   └── GeneratedOutput.tsx
│   ├── library/
│   │   ├── FrameworkGrid.tsx
│   │   ├── FrameworkCard.tsx
│   │   ├── FrameworkDetail.tsx
│   │   └── CategoryFilter.tsx
│   ├── visualizations/
│   │   ├── DynamicChart.tsx
│   │   ├── Matrix2x2.tsx
│   │   ├── RadarChart.tsx
│   │   ├── WaterfallChart.tsx
│   │   ├── Pyramid.tsx
│   │   ├── DataTable.tsx
│   │   └── Timeline.tsx
│   ├── chat/
│   │   ├── ChatPanel.tsx
│   │   ├── ChatMessage.tsx
│   │   └── Suggestions.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Tooltip.tsx
│       ├── Badge.tsx
│       └── Skeleton.tsx
├── lib/
│   ├── utils.ts
│   ├── cn.ts
│   └── formatters.ts
└── styles/
    ├── globals.css
    └── themes.css
```

### 5.4 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@google/generative-ai": "^0.7.0",
    "zustand": "^4.5.0",
    "recharts": "^2.12.0",
    "react-markdown": "^9.0.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "date-fns": "^3.3.0",
    "uuid": "^9.0.0",
    "docx": "^8.5.0",
    "pptxgenjs": "^3.12.0",
    "html2canvas": "^1.4.0",
    "jspdf": "^2.5.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

## Part 6: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up project with Vite + React + TypeScript
- [ ] Implement design system (colors, typography, components)
- [ ] Build core layout (Sidebar, Header, Main content area)
- [ ] Implement Zustand stores for state management
- [ ] Set up Gemini API integration with streaming
- [ ] Build Dashboard view with project list

### Phase 2: Core Workflow (Week 3-4)
- [ ] Implement full Framework Library (50+ frameworks)
- [ ] Build Workflow Engine with step progression
- [ ] Create 5 pre-built workflow templates
- [ ] Implement all visualization components (Matrix, Radar, Waterfall, etc.)
- [ ] Build GeneratedOutput component with visualization detection
- [ ] Add prompt engine with context awareness

### Phase 3: Advanced Features (Week 5-6)
- [ ] Build AI Chat Panel with context awareness
- [ ] Implement Data Integration Hub (Yahoo Finance, SEC)
- [ ] Add document export (PPTX, DOCX, PDF)
- [ ] Build template library and saving system
- [ ] Implement version history for projects

### Phase 4: Polish & Demo (Week 7-8)
- [ ] Responsive design optimization
- [ ] Animation and micro-interactions
- [ ] Loading states and error handling
- [ ] Performance optimization
- [ ] Demo mode with pre-loaded examples
- [ ] Documentation and onboarding

---

## Part 7: Demo Scenarios

### Pre-loaded Demo Projects

```typescript
const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-1',
    name: 'Nvidia AI Chip Strategy',
    scenario: `Nvidia dominates the AI chip market with 80%+ market share in datacenter GPUs. 
    However, major cloud providers (AWS, Google, Microsoft) are developing custom chips, 
    and AMD is gaining ground with competitive pricing. Meanwhile, China restrictions 
    limit a major growth market. As a board advisor, develop a strategic response.`,
    company: 'Nvidia',
    industry: 'Semiconductors',
    status: 'in-progress',
    completedSteps: 3
  },
  {
    id: 'demo-2',
    name: 'Starbucks China Turnaround',
    scenario: `Starbucks China same-store sales declined 14% last quarter as local 
    competitor Luckin Coffee expands aggressively with prices 40% lower. The premium 
    positioning that works in the US faces challenges as Chinese consumers become 
    more value-conscious. Develop a turnaround strategy for the China business.`,
    company: 'Starbucks',
    industry: 'Quick Service Restaurants',
    status: 'completed'
  },
  {
    id: 'demo-3',
    name: 'Tesla Energy Spin-off Analysis',
    scenario: `Tesla's Energy business (Powerwall, Megapack, Solar) grew 100% YoY 
    but contributes only 6% of revenue. Some analysts argue spinning it off could 
    unlock $50B+ in value. Evaluate whether Tesla should spin off the Energy division.`,
    company: 'Tesla',
    industry: 'Clean Energy / Automotive',
    status: 'draft'
  }
];
```

---

## Part 8: Success Metrics

### Demo Success Criteria
1. **Visual Impact**: Senior partner says "This looks professional"
2. **Analytical Depth**: Output quality matches junior consultant work
3. **Time Efficiency**: Complete strategic assessment in under 1 hour
4. **Usability**: New user completes workflow without guidance
5. **Export Quality**: Generated documents are presentation-ready

### Key Performance Indicators
- Time to first insight: < 2 minutes
- Workflow completion rate: > 80%
- Export usage rate: > 50%
- Return user rate: > 60%

---

## Appendix A: Complete Framework Prompts

### Porter's Five Forces

```
You are analyzing the competitive dynamics of {{industry}} using Porter's Five Forces framework.

For each of the five forces, provide:
1. Current intensity rating (1-5 scale)
2. Key drivers affecting this force
3. Trend direction (increasing/stable/decreasing)
4. Strategic implications

## Forces to Analyze

### 1. Threat of New Entrants
Evaluate barriers to entry:
- Capital requirements
- Economies of scale
- Brand loyalty and switching costs
- Access to distribution channels
- Regulatory and legal barriers
- Proprietary technology or IP

### 2. Bargaining Power of Suppliers
Assess supplier dynamics:
- Supplier concentration
- Importance of volume to suppliers
- Switching costs for firms
- Threat of forward integration
- Availability of substitute inputs

### 3. Bargaining Power of Buyers
Evaluate customer power:
- Buyer concentration
- Buyer volume
- Switching costs
- Buyer information availability
- Threat of backward integration
- Price sensitivity

### 4. Threat of Substitute Products
Analyze substitution risk:
- Relative price-performance of substitutes
- Switching costs
- Buyer propensity to substitute
- Number of substitute products

### 5. Competitive Rivalry
Assess competitive intensity:
- Number and balance of competitors
- Industry growth rate
- Fixed costs and exit barriers
- Product differentiation
- Strategic stakes

## Output Requirements

Provide your analysis in structured sections, then include this JSON block for visualization:

\`\`\`json
{
  "chartType": "radar",
  "title": "Porter's Five Forces Analysis",
  "data": {
    "labels": ["New Entrants", "Supplier Power", "Buyer Power", "Substitutes", "Rivalry"],
    "datasets": [{
      "label": "Force Intensity (1-5)",
      "data": [X, X, X, X, X],
      "borderColor": "#fbbf24",
      "backgroundColor": "rgba(251, 191, 36, 0.2)"
    }]
  }
}
\`\`\`

Conclude with:
1. The 2-3 forces most critical to industry profitability
2. Strategic implications for {{company}}
3. Recommended strategic responses
```

### SWOT Analysis

```
Conduct a comprehensive SWOT analysis for {{company}} in the context of {{scenario}}.

## Internal Analysis

### Strengths
Identify 5-7 key strengths with evidence:
- Resources and capabilities
- Market position
- Financial performance
- Brand and reputation
- Technology and innovation
- Human capital
- Operational efficiency

### Weaknesses
Identify 5-7 key weaknesses with evidence:
- Resource gaps
- Competitive disadvantages
- Operational challenges
- Financial constraints
- Organizational issues
- Technology gaps

## External Analysis

### Opportunities
Identify 5-7 strategic opportunities:
- Market trends
- Technology shifts
- Regulatory changes
- Competitive gaps
- Customer needs evolution
- New market potential

### Threats
Identify 5-7 key threats:
- Competitive threats
- Market disruptions
- Regulatory risks
- Economic factors
- Technology obsolescence
- Supply chain risks

## Output Requirements

Format as structured sections, then include:

\`\`\`json
{
  "chartType": "matrix2x2",
  "title": "SWOT Analysis Matrix",
  "quadrants": {
    "topLeft": { "label": "Strengths", "items": ["S1", "S2", "S3"] },
    "topRight": { "label": "Weaknesses", "items": ["W1", "W2", "W3"] },
    "bottomLeft": { "label": "Opportunities", "items": ["O1", "O2", "O3"] },
    "bottomRight": { "label": "Threats", "items": ["T1", "T2", "T3"] }
  }
}
\`\`\`

Conclude with:
1. Key strategic priorities (where strengths meet opportunities)
2. Critical risks to address (where weaknesses meet threats)
3. Recommended strategic actions
```

### Market Sizing (TAM/SAM/SOM)

```
Develop a market sizing analysis for {{market}} using the TAM/SAM/SOM framework.

## Total Addressable Market (TAM)
The total global market demand if there were no constraints:
- Define the broadest relevant market
- Use top-down and bottom-up approaches
- Cite data sources and assumptions
- Calculate current size and 5-year projection

## Serviceable Addressable Market (SAM)
The portion of TAM that {{company}} could theoretically serve:
- Geographic constraints
- Customer segment focus
- Product/service scope
- Regulatory limitations
- Calculate current size and growth rate

## Serviceable Obtainable Market (SOM)
The realistic market share {{company}} can capture:
- Current market share
- Competitive dynamics
- Go-to-market capabilities
- Resource constraints
- Calculate realistic 3-year target

## Methodology

Use both approaches and reconcile:

### Top-Down
- Start with industry reports and analyst estimates
- Apply relevant filters to narrow scope
- Document assumptions at each step

### Bottom-Up
- Identify target customer segments
- Estimate number of potential customers
- Calculate average revenue per customer
- Sum up segment totals

## Output Requirements

\`\`\`json
{
  "chartType": "pyramid",
  "title": "Market Size Analysis",
  "data": {
    "levels": [
      { "label": "TAM", "value": "$XXB", "description": "Total Addressable Market" },
      { "label": "SAM", "value": "$XXB", "description": "Serviceable Addressable Market" },
      { "label": "SOM", "value": "$XXB", "description": "Serviceable Obtainable Market" }
    ]
  }
}
\`\`\`

Include a data table:

\`\`\`json
{
  "chartType": "table",
  "title": "Market Size Summary",
  "data": {
    "headers": ["Market", "Current Size", "CAGR", "2028 Size"],
    "rows": [
      ["TAM", "$XX B", "X%", "$XX B"],
      ["SAM", "$XX B", "X%", "$XX B"],
      ["SOM", "$XX B", "X%", "$XX B"]
    ]
  }
}
\`\`\`

Conclude with:
1. Key growth drivers
2. Market timing considerations
3. Entry strategy implications
```

---

## Appendix B: Keyboard Shortcuts

```typescript
const KEYBOARD_SHORTCUTS = {
  // Global
  'Cmd+K': 'Open command palette',
  'Cmd+/': 'Toggle AI chat',
  'Cmd+S': 'Save project',
  'Cmd+E': 'Export current analysis',
  
  // Navigation
  'Cmd+1': 'Go to Dashboard',
  'Cmd+2': 'Go to Workflow',
  'Cmd+3': 'Go to Library',
  'Cmd+4': 'Go to Data Hub',
  
  // Workflow
  'Cmd+Enter': 'Generate analysis',
  'Cmd+ArrowRight': 'Next step',
  'Cmd+ArrowLeft': 'Previous step',
  'Cmd+R': 'Regenerate current',
  
  // Editing
  'Cmd+B': 'Bold text',
  'Cmd+I': 'Italic text',
  'Escape': 'Close modal/panel'
};
```

---

## Appendix C: Error Handling

```typescript
// Error boundary component
const ErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-slate-400 mb-6">{error.message}</p>
        <button
          onClick={() => setError(null)}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
};

// API error handling
const handleAPIError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('RATE_LIMIT')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (error.message.includes('INVALID_API_KEY')) {
      return 'API configuration error. Please check your settings.';
    }
    if (error.message.includes('NETWORK')) {
      return 'Network error. Please check your connection.';
    }
    return error.message;
  }
  return 'An unexpected error occurred.';
};
```

---

*End of PRD*

**Build this, and you'll have the most powerful AI-assisted strategy tool in the consulting industry.**
