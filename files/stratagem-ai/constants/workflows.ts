export interface WorkflowStepTemplate {
  id: string;
  title: string;
  description: string;
  framework: string;
  promptTemplate: string;
  estimatedMinutes: number;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  duration: string;
  steps: WorkflowStepTemplate[];
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'strategic-assessment',
    name: 'Strategic Assessment',
    description: 'Board-ready strategic assessment with market and capability focus.',
    duration: '4-6 hours',
    steps: [
      {
        id: 'pestle',
        title: 'External Environment (PESTLE)',
        description: 'Assess macro forces shaping the industry outlook.',
        framework: 'PESTLE',
        estimatedMinutes: 35,
        promptTemplate: `Apply PESTLE to the scenario. Provide concise bullets for each dimension and highlight the top two external risks and opportunities.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'five-forces',
        title: "Industry Dynamics (Five Forces)",
        description: 'Assess competitive intensity and profitability drivers.',
        framework: "Porter’s Five Forces",
        estimatedMinutes: 45,
        promptTemplate: `Use Porter's Five Forces. Rate each force 1-5 with rationale. Summarize implications for profitability and positioning.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'swot',
        title: 'Internal Capabilities (SWOT)',
        description: 'Summarize strengths, weaknesses, opportunities, and threats.',
        framework: 'SWOT',
        estimatedMinutes: 30,
        promptTemplate: `Create a SWOT analysis with 4-6 bullets per quadrant. Add a short "So What" summary.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'options',
        title: 'Strategic Options',
        description: 'Generate 3-4 viable strategic paths and tradeoffs.',
        framework: 'Options Matrix',
        estimatedMinutes: 40,
        promptTemplate: `Develop 3-4 strategic options. Compare them on value upside, risk, and feasibility. Provide a summary recommendation.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'recommendation',
        title: 'Executive Recommendation',
        description: 'Synthesize a recommendation and 30/60/90 day plan.',
        framework: 'Pyramid Principle',
        estimatedMinutes: 35,
        promptTemplate: `Provide an executive recommendation, top 3 supporting arguments, top 3 risks, and a 30/60/90 day plan.\n\nScenario:\n{{scenario}}`
      }
    ]
  },
  {
    id: 'market-entry',
    name: 'Market Entry Strategy',
    description: 'Market sizing, competitive context, and entry path evaluation.',
    duration: '3-5 hours',
    steps: [
      {
        id: 'market-sizing',
        title: 'Market Sizing',
        description: 'Estimate TAM/SAM/SOM with assumptions.',
        framework: 'TAM/SAM/SOM',
        estimatedMinutes: 40,
        promptTemplate: `Estimate TAM/SAM/SOM. Provide assumptions, ranges, and key sensitivities.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'segments',
        title: 'Segment Prioritization',
        description: 'Prioritize segments by attractiveness and fit.',
        framework: 'Segmentation Matrix',
        estimatedMinutes: 35,
        promptTemplate: `Segment customers and rank each segment by attractiveness and fit. Provide a short rationale.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'entry',
        title: 'Entry Modes',
        description: 'Compare entry modes with tradeoffs.',
        framework: 'Entry Mode Analysis',
        estimatedMinutes: 30,
        promptTemplate: `Compare 3 entry modes with pros, cons, and required investments.\n\nScenario:\n{{scenario}}`
      },
      {
        id: 'financials',
        title: 'Financial Outlook',
        description: 'Outline investment and return profile.',
        framework: 'Investment Case',
        estimatedMinutes: 35,
        promptTemplate: `Provide a high-level financial outlook including investment range, payback, and ROI.\n\nScenario:\n{{scenario}}`
      }
    ]
  }
];
