import type { Prompt } from '../types';

/*
 * Optimized consulting-grade prompts
 * Principles: MECE, Pyramid Principle, quantified implications, executive voice.
 * Each prompt is structured and ends with explicit output formatting.
 */

const COMMON_HEADER = `Ground rules (apply to every prompt):
- Be concise, executive, quantified; use ranges if data is uncertain.
- Keep bullets tight (≤12 words); add a "So What" for key insights.
- Use MECE structure and Pyramid Principle; lead with the answer.
- Prefer tables for comparisons; use markdown headings.
- Close with next steps, owners, and timing when relevant.`;

export const PROMPTS: Prompt[] = [
  // Framing
  {
    id: 'framing-problem-statement',
    title: 'Problem Statement',
    description: 'Crisp, board-ready statement of the decision and stakes.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Write a sharp problem statement and why it matters now.\nInclude: context (1-2 lines), decision to make, time horizon, success bar.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Heading: Problem statement\n- 3 bullets: context + urgency + decision\n- 2 bullets: success criteria`
  },
  {
    id: 'framing-scope-guardrails',
    title: 'Scope & Guardrails',
    description: 'Define in-scope, out-of-scope, assumptions, and constraints.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define scope and guardrails.\n\nScenario:\n{{scenario}}\n\nOutput as markdown table: Item | Detail | Rationale\nSections: In-Scope (5-7), Out-of-Scope (5-7), Assumptions (5-7), Constraints (3-5).`
  },
  {
    id: 'framing-success-metrics',
    title: 'Success Metrics',
    description: 'Translate challenge into measurable KPIs with targets.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define 6-8 success metrics with target and horizon.\n\nScenario:\n{{scenario}}\n\nOutput table: Metric | Target | Horizon | Data source | So What`
  },
  {
    id: 'framing-stakeholder-map',
    title: 'Stakeholder Map',
    description: 'Identify stakeholders, power/interest, and likely positions.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Map stakeholders and incentives.\n\nScenario:\n{{scenario}}\n\nOutput:\n- 2x2 summary (Power vs Interest) with 6-10 stakeholders\n- Table: Name | Role | Incentive | Likely stance | Engagement move\n- Top 3 stakeholder risks`
  },
  {
    id: 'framing-objective-tree',
    title: 'Objective Tree',
    description: 'MECE decomposition into sub-goals and KPIs.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Build an objective tree.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Primary objective (1 line)\n- 3-5 sub-objectives with 2 KPIs each (table)\n- So What: which KPI is most leverage?`
  },
  {
    id: 'framing-risk-framing',
    title: 'Risk Framing',
    description: 'Key uncertainties with likelihood/impact and indicators.',
    category: 'framing',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Frame top uncertainties/risks.\n\nScenario:\n{{scenario}}\n\nOutput table: Risk | Impact (H/M/L) | Likelihood | Leading indicator | Mitigation | Owner`
  },

  // Structured thinking
  {
    id: 'thinking-issue-tree',
    title: 'Issue Tree',
    description: 'MECE decomposition into branches and sub-branches.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Create an issue tree.\n\nScenario:\n{{scenario}}\n\nOutput:\n- 3 top-level branches (numbered)\n- 2-3 sub-branches each\n- For each branch: key question + success metric`
  },
  {
    id: 'thinking-hypothesis-list',
    title: 'Hypothesis List',
    description: 'Testable hypotheses with evidence to prove/disprove.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Generate 6-8 hypotheses that change the decision.\n\nScenario:\n{{scenario}}\n\nOutput table: Hypothesis | Evidence to confirm | Evidence to refute | So What`
  },
  {
    id: 'thinking-mece-buckets',
    title: 'MECE Workstreams',
    description: 'Define MECE workstreams and key questions.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define 5-6 MECE workstreams.\n\nScenario:\n{{scenario}}\n\nOutput table: Workstream | Key questions (≤3) | Primary metric | Owner`
  },
  {
    id: 'thinking-assumption-audit',
    title: 'Assumption Audit',
    description: 'Critical assumptions with risk and validation plan.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: List critical assumptions, rated by uncertainty and impact.\n\nScenario:\n{{scenario}}\n\nOutput table: Assumption | Impact (H/M/L) | Uncertainty (H/M/L) | Test/validation | So What`
  },
  {
    id: 'thinking-key-questions',
    title: 'Key Questions',
    description: 'Decisive questions that drive the recommendation.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Derive decisive questions.\n\nScenario:\n{{scenario}}\n\nOutput numbered list (8-10): Question | Decision lever | Data needed | So What`
  },
  {
    id: 'thinking-research-plan',
    title: 'Research Plan',
    description: 'Data sources, methods, outputs, owners, and ETA.',
    category: 'thinking',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Create a research plan.\n\nScenario:\n{{scenario}}\n\nOutput table: Workstream | Source/method | Deliverable | Owner | ETA`
  },

  // Analysis
  {
    id: 'analysis-market-sizing',
    title: 'Market Sizing (TAM/SAM/SOM)',
    description: 'Size the market with assumptions and sensitivities.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Estimate TAM/SAM/SOM with ranges.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Table: Segment | TAM | SAM | SOM | Key assumption\n- 3 sensitivity drivers with direction\n- So What summary (2 bullets)`
  },
  {
    id: 'analysis-competitive-landscape',
    title: 'Competitive Landscape',
    description: 'Map competitors, positioning, and differentiation.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Summarize top competitors.\n\nScenario:\n{{scenario}}\n\nOutput table: Competitor | Positioning | Differentiator | Price posture | Risk to us\nAdd 3 bullets: implications for our strategy.`
  },
  {
    id: 'analysis-customer-segmentation',
    title: 'Customer Segmentation',
    description: 'Segments by need, value, and behavior.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Segment customers and rank attractiveness.\n\nScenario:\n{{scenario}}\n\nOutput table: Segment | Size | Willingness to pay | Pain points | Attractiveness (H/M/L) | So What`
  },
  {
    id: 'analysis-porters-five-forces',
    title: "Porter's Five Forces",
    description: 'Rate forces with profitability implications.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Five Forces with ratings 1-5 and implications.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Table: Force | Rating (1-5) | Driver | So What\n- 3 bullets: what improves/weakens structure`
  },
  {
    id: 'analysis-unit-economics',
    title: 'Unit Economics',
    description: 'CAC/LTV/payback with sensitivities.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Analyze unit economics.\n\nScenario:\n{{scenario}}\n\nOutput table: Metric | Value | Assumption | Sensitivity driver\nInclude payback and 2 scenarios (base/upside).`
  },
  {
    id: 'analysis-value-chain',
    title: 'Value Chain Analysis',
    description: 'Profit pools and leverage points.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Map value chain and margin pools.\n\nScenario:\n{{scenario}}\n\nOutput table: Stage | Margin pool | Key players | Our leverage | Risk`
  },
  {
    id: 'analysis-swot',
    title: 'SWOT Analysis',
    description: 'Concise SWOT with implications.',
    category: 'analysis',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Create a tight SWOT.\n\nScenario:\n{{scenario}}\n\nOutput: 4 lists (4-6 bullets each) + So What (3 bullets).`
  },

  // Communication
  {
    id: 'communication-exec-summary',
    title: 'Executive Summary',
    description: 'Partner-ready one-pager.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Write an executive summary using Pyramid Principle.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Headline answer (1 sentence)\n- 3 supports with data\n- Risks (3) + mitigations\n- Next 3 actions with owners/timing`
  },
  {
    id: 'communication-key-insights',
    title: 'Key Insights',
    description: 'Top insights with So What.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Extract top 7 insights.\n\nScenario:\n{{scenario}}\n\nOutput list: Insight | Evidence | So What (one line each).`
  },
  {
    id: 'communication-storyline',
    title: 'Storyline Outline',
    description: 'Deck storyline with titles/messages.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Create a 10-12 slide storyline.\n\nScenario:\n{{scenario}}\n\nOutput table: Slide # | Title | Key message | Visual type`
  },
  {
    id: 'communication-so-what',
    title: 'So What Callouts',
    description: 'Findings with implications.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Turn findings into So What callouts.\n\nScenario:\n{{scenario}}\n\nOutput list (6-8): Finding | So What | Action.`
  },
  {
    id: 'communication-slide-outline',
    title: 'Slide Outline',
    description: 'Slide-by-slide outline with visuals.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Draft slide outline.\n\nScenario:\n{{scenario}}\n\nOutput table: Slide | Purpose | Headline | Visual suggestion | Proof needed`
  },
  {
    id: 'communication-risk-narrative',
    title: 'Risk Narrative',
    description: 'Executive risk story.',
    category: 'communication',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Craft a concise risk narrative.\n\nScenario:\n{{scenario}}\n\nOutput:\n- 3 paragraphs: Context, Top risks, Mitigations\n- Table: Risk | Impact | Mitigation | Residual`
  },

  // Decision
  {
    id: 'decision-options-matrix',
    title: 'Options Matrix',
    description: 'Compare options vs criteria.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Compare 3-4 options vs 5 criteria.\n\nScenario:\n{{scenario}}\n\nOutput table: Option | Score (1-5) | Rationale | Risks | So What\nEnd with recommendation (1-2 sentences).`
  },
  {
    id: 'decision-criteria',
    title: 'Decision Criteria',
    description: 'Weighted criteria with rationale.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define decision criteria with weights.\n\nScenario:\n{{scenario}}\n\nOutput table: Criterion | Weight (%) | Rationale | Metric | Target.`
  },
  {
    id: 'decision-scenario-compare',
    title: 'Scenario Comparison',
    description: 'Compare base/upside/downside with implications.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Compare base, upside, downside scenarios.\n\nScenario:\n{{scenario}}\n\nOutput table: Scenario | Revenue | Margin | Investment | Key assumption | So What\n3 bullets: what would change the recommendation?`
  },
  {
    id: 'decision-financial-tradeoffs',
    title: 'Financial Tradeoffs',
    description: 'Quantify ROI, payback, risks.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Quantify tradeoffs among options.\n\nScenario:\n{{scenario}}\n\nOutput table: Option | ROI % | Payback (months) | Peak cash need | Sensitivity driver | Risk`
  },
  {
    id: 'decision-go-no-go',
    title: 'Go / No-Go',
    description: 'Clear go/no-go with conditions.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Provide a go/no-go recommendation.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Decision: Go/No-Go/Defer with rationale (3 bullets)\n- Conditions to proceed (5 bullets)\n- Red flags to monitor (3 bullets)`
  },
  {
    id: 'decision-recommendation',
    title: 'Recommendation',
    description: 'Final recommendation with logic and risks.',
    category: 'decision',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Deliver an executive recommendation.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Answer (1 sentence)\n- 3 supports with data\n- 2 risks + mitigations\n- 3 next actions with owners/timing`
  },

  // Execution
  {
    id: 'execution-initiative-roadmap',
    title: 'Initiative Roadmap',
    description: '3-phase roadmap with dependencies.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Build a 3-phase initiative roadmap.\n\nScenario:\n{{scenario}}\n\nOutput table: Phase | Timeline | Initiatives | Owner | Dependency | KPI.`
  },
  {
    id: 'execution-workplan',
    title: '90-Day Workplan',
    description: 'Immediate actions, owners, outcomes.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define 90-day plan.\n\nScenario:\n{{scenario}}\n\nOutput table: Week window | Action | Owner | Success metric`
  },
  {
    id: 'execution-kpi-dashboard',
    title: 'KPI Dashboard',
    description: 'Leading/lagging KPIs with cadence.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define KPI dashboard.\n\nScenario:\n{{scenario}}\n\nOutput table: KPI | Type (leading/lagging) | Target | Cadence | Owner | So What`
  },
  {
    id: 'execution-change-management',
    title: 'Change Management Plan',
    description: 'Comms, training, adoption plan.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Outline change plan.\n\nScenario:\n{{scenario}}\n\nOutput table: Audience | Message | Channel | Moment | Owner | Risk`
  },
  {
    id: 'execution-operating-model',
    title: 'Operating Model',
    description: 'Future-state operating model and gaps.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Define target operating model and gaps.\n\nScenario:\n{{scenario}}\n\nOutput:\n- Target principles (5 bullets)\n- Org/Process/Tech/People table: Current vs Target vs Gap vs Action\n- 3 critical enablers`
  },
  {
    id: 'execution-implementation-risks',
    title: 'Implementation Risks',
    description: 'Top execution risks with mitigations.',
    category: 'execution',
    promptTemplate: `${COMMON_HEADER}\n\nTask: Identify execution risks.\n\nScenario:\n{{scenario}}\n\nOutput table: Risk | Impact | Likelihood | Early signal | Mitigation | Owner.`
  }
];
