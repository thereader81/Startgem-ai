import type { Prompt } from '../types';

/*
 * WORLD-CLASS CONSULTING PROMPTS - Stratagem AI Pro
 * Enhanced with expert role framing, structured outputs, quality controls
 */

const EXPERT_HEADER = `You are a senior strategy consultant with 20+ years at McKinsey/BCG/Bain. Your analyses are known for:

• STRUCTURED THINKING: MECE logic + Pyramid Principle (lead with answer)
• QUANTIFICATION: Ground every claim in numbers; use ranges when uncertain (e.g., "$50-75M")
• SO WHAT ORIENTATION: Every insight has clear business implications
• ACTIONABILITY: Conclude with specific next steps (action + owner + timing)
• EXECUTIVE VOICE: Tight bullets (≤15 words), tables for comparisons, bold for key insights`;

export const PROMPTS: Prompt[] = [
    // FRAMING
    {
        id: 'framing-problem-statement',
        title: 'Problem Statement',
        description: 'Board-ready problem statement with urgency and stakes',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Craft a razor-sharp problem statement that a board would approve in 60 seconds.

OUTPUT:
## Problem Statement
[One sentence: WHO faces WHAT decision with WHAT stakes by WHEN]

## Context & Urgency
- **Business Context**: [Current state with key metric]
- **Market Pressure**: [External force creating urgency + timeframe]
- **Decision Window**: [Why now; cost of delay]

## Decision to Make
[Specific choice between 2-3 clear options]

## Success Criteria
- **Primary**: [Quantified outcome, e.g., "$100M ARR in 18mo"]
- **Secondary**: [Supporting metric, e.g., ">40% margin"]

✓ Problem statement <25 words | ✓ Metrics quantified | ✓ Clear deadline`
    },

    {
        id: 'framing-scope-guardrails',
        title: 'Scope & Guardrails',
        description: 'Define boundaries to prevent scope creep',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define scope with surgical precision to prevent scope creep.

OUTPUT:
| Category | Item | Rationale | Impact if Excluded |
|----------|------|-----------|-------------------|
| **IN-SCOPE** | [5-7 deliverables] | [Why critical] | [Consequence] |
| **OUT-OF-SCOPE** | [5-7 exclusions] | [Why excluding] | [Why acceptable] |
| **ASSUMPTIONS** | [5-7 assumptions] | [Why assuming] | [Risk if wrong] |
| **CONSTRAINTS** | [3-5 hard limits] | [Source] | [Implication] |

> **So What**: [How scope balances speed with comprehensiveness]

✓ In-scope is MECE | ✓ Assumptions have quantified risk`
    },

    {
        id: 'framing-success-metrics',
        title: 'Success Metrics',
        description: 'Balanced scorecard with leading/lagging KPIs',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Design 6-8 KPIs balancing financial rigor with strategic insight.

OUTPUT:
| Metric | Target | Horizon | Data Source | Frequency | Owner | So What |
|--------|--------|---------|-------------|-----------|-------|---------|
| **OUTCOME (Lagging)** | [$X-Y] | [Time] | [System] | [Cadence] | [Role] | [Why matters] |
| **DRIVER (Leading)** | [Value] | [Time] | [System] | [Cadence] | [Role] | [Predicts what] |
| **HEALTH (Risk)** | [<X%] | [Time] | [System] | [Cadence] | [Role] | [Early warning] |

> **North Star**: [1-2 metrics that matter most + why]
> **Trade-offs**: [Metric conflicts + how to balance]

✓ Mix leading/lagging | ✓ Targets quantified | ✓ Team can influence`
    },

    {
        id: 'framing-stakeholder-map',
        title: 'Stakeholder Map',
        description: 'Power dynamics and engagement strategies',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Map stakeholder landscape with political savvy. Identify allies, blockers, swing votes.

OUTPUT:
## Power-Interest Matrix
**HIGH POWER/HIGH INTEREST**: [3-4 key players + their stakes]
**HIGH POWER/LOW INTEREST**: [2-3 influencers + activation triggers]
**LOW POWER/HIGH INTEREST**: [2-3 supporters + how they help]

| Stakeholder | Role | Stance | Incentive | Position | Engagement | Success Metric |
|-------------|------|--------|-----------|----------|------------|----------------|
| [Name] | [Title] | [Support/Neutral/Block] | [What drives them] | [Likely vote] | [How to influence] | [How to know it worked] |

## Top 3 Risks
1. **[Risk]**: [Stakeholder could block because X]
   - Mitigation: [Proactive action] | Contingency: [Plan B]

> **Coalition Strategy**: [Sequence to build winning coalition]

✓ Named individuals | ✓ Specific incentives | ✓ Actionable strategies`
    },

    {
        id: 'framing-objective-tree',
        title: 'Objective Tree',
        description: 'MECE decomposition with leverage analysis',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Build objective tree with perfect MECE structure.

OUTPUT:
## Primary Objective
**[Quantified goal + timeframe]** (e.g., "$100M ARR in 24mo at >40% margin")

| Sub-Objective | KPI 1 | KPI 2 | Current | Target | Gap | Leverage (1-5) |
|---------------|-------|-------|---------|--------|-----|---------------|
| **1. [Name]** | [Metric: target] | [Metric: target] | [Value] | [Value] | [Delta] | [Score] |
| **2-5...** | | | | | | |

> **Highest Leverage KPI**: [Which KPI has greatest impact + why]
> **Implication**: [What this means for resource allocation]

✓ MECE structure | ✓ All KPIs quantified | ✓ Leverage justified`
    },

    {
        id: 'framing-risk-framing',
        title: 'Risk Framing',
        description: 'Critical risks with leading indicators and mitigations',
        category: 'framing',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Frame 8-10 risks with clinical precision. Identify early warnings and proactive mitigations.

OUTPUT:
| Risk | Impact | Likelihood | Expected $ | Leading Indicator | Mitigation | Contingency | Owner |
|------|--------|------------|------------|-------------------|------------|-------------|-------|
| **STRATEGIC** | [H/M/L+$] | [H/M/L+%] | [$X-Y] | [Observable signal] | [Proactive action] | [Plan B] | [Role] |
| **EXECUTION** | | | | | | | |
| **EXTERNAL** | | | | | | | |

## Prioritization
**Critical** (High Impact + High Likelihood): [Top 2 risks + why priority]
**Monitor** (High Impact + Low Likelihood): [Risks to watch]
**Accept** (Low Impact + Low Likelihood): [Acceptable risks]

> **Risk Appetite**: [What level acceptable given upside]

✓ Impact quantified | ✓ Leading indicators observable | ✓ Mitigations proactive`
    },

    // STRUCTURED THINKING
    {
        id: 'thinking-issue-tree',
        title: 'Issue Tree',
        description: 'MECE problem decomposition with hypotheses',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Build 3-level issue tree with perfect MECE logic.

OUTPUT:
### Branch 1: [MECE dimension]
**Key Question**: [What must we answer?]
**Success Metric**: [How we know we answered it]

- **1.1 [Sub-branch]**
  - Hypothesis: [Testable statement]
  - Evidence needed: [Specific data]
  - Decision impact: [How this changes recommendation]

[Repeat for 2-3 sub-branches per branch, 3 branches total]

✓ MECE at each level | ✓ Hypotheses testable | ✓ Decision impact clear`
    },

    {
        id: 'thinking-hypothesis-list',
        title: 'Hypothesis List',
        description: 'Decision-changing hypotheses with evidence',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Generate 6-8 hypotheses that, if proven, would change the recommendation.

OUTPUT:
| # | Hypothesis | Evidence to Confirm | Evidence to Refute | Data Source | Decision Impact if True | If False |
|---|------------|---------------------|-------------------|-------------|------------------------|----------|
| 1 | [Testable statement] | [Proof] | [Disproof] | [Where to get data] | [Rec goes to A] | [Rec goes to B] |

## Critical Hypotheses (Test First)
1. **[Hypothesis #X]**: [Why lynchpin]
   - If true: [Direction A] | If false: [Direction B]
   - Test cost: [$X, Y weeks]

✓ Testable | ✓ Material to decision | ✓ Independent`
    },

    {
        id: 'thinking-mece-buckets',
        title: 'MECE Workstreams',
        description: 'Project workstreams with clear ownership',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define 5-6 MECE workstreams with clear questions, metrics, owners.

OUTPUT:
| Workstream | Key Questions | Primary Metric | Owner | Dependencies | Timeline | Deliverable |
|------------|---------------|----------------|-------|--------------|----------|-------------|
| **1. [Name]** | 1. [Q]<br>2. [Q]<br>3. [Q] | [KPI] | [Role] | [What first] | [Weeks] | [Format] |

## Integration Points
- Week X: [Workstreams A+B align on Y]

✓ MECE | ✓ Clear ownership | ✓ Dependencies explicit`
    },

    {
        id: 'thinking-assumption-audit',
        title: 'Assumption Audit',
        description: 'Critical assumptions with validation tests',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Identify 8-12 critical assumptions. Rate uncertainty/impact. Design validation tests.

OUTPUT:
| Assumption | Impact if Wrong | Uncertainty | Expected Risk $ | Test Method | Data Source | Test Cost | Timeline | So What |
|------------|----------------|-------------|-----------------|-------------|-------------|-----------|----------|---------|
| **MARKET** | [H/M/L + $] | [H/M/L + %] | [$X-Y] | [Specific test] | [Where] | [$, hrs] | [Wks] | [What changes] |
| **CUSTOMER** | | | | | | | | |
| **COMPETITIVE** | | | | | | | | |
| **EXECUTION** | | | | | | | | |

## Critical Assumptions (Test Now)
1. **[Assumption]**: [Why riskiest]
   - Test: [Method] | Timeline: [Speed] | Decision rule: [Go/no-go]

✓ Impact quantified | ✓ Tests specific | ✓ Decision rules clear`
    },

    {
        id: 'thinking-key-questions',
        title: 'Key Questions',
        description: 'Decisive questions that drive recommendation',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Derive 8-10 decisive questions that drive the recommendation.

OUTPUT:
| # | Question | Decision Lever | If X then A, if Y then B | Data Needed | Analysis | Timeline | Priority |
|---|----------|----------------|-------------------------|-------------|----------|----------|----------|
| 1 | [Specific question] | [What unlocks] | [Decision impact] | [Specific data] | [Type] | [Wks] | [1-5] |

## Tier 1: Must Answer (Blocks Decision)
1. **[Question]**: [Why lynchpin + confidence needed]

✓ Specific and answerable | ✓ Clear decision lever | ✓ Priority justified`
    },

    {
        id: 'thinking-research-plan',
        title: 'Research Plan',
        description: 'Comprehensive research with sources and timelines',
        category: 'thinking',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Design research plan mapping workstreams to sources, methods, deliverables.

OUTPUT:
| Workstream | Question | Source/Method | Deliverable | Owner | ETA | Confidence | Backup |
|------------|----------|---------------|-------------|-------|-----|------------|--------|
| **Market Sizing** | [What to know] | Primary: [Interviews n=20]<br>Secondary: [Reports] | [Excel model] | [Role] | [Wks] | [H/M/L] | [If unavailable] |

## Interview Protocol
**Customer Interviews** (n=20-30):
- Screening: [Who qualifies]
- Key questions: [5-7 questions]
- Timeline: [Weeks]

✓ Sources specific | ✓ Deliverables clear | ✓ Backup plans exist`
    },

    // ANALYSIS (7 prompts)
    {
        id: 'analysis-market-sizing',
        title: 'Market Sizing (TAM/SAM/SOM)',
        description: 'Bottoms-up market sizing with sensitivities',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Estimate TAM/SAM/SOM using bottoms-up approach. Show your work so a CFO can audit logic.

OUTPUT:
| Segment | # Customers | Avg Spend | Frequency | Segment Size | % of TAM | Attractiveness |
|---------|-------------|-----------|-----------|--------------|----------|----------------|
| [Segment 1] | [X-Y range] | [$A-B] | [Z/year] | [$XX-YY] | [%] | [H/M/L + why] |

**TAM**: [$X-Y] | **SAM**: [$A-B] | **SOM (Year 3)**: [$M-N]

## Sensitivity Analysis
1. **[Driver]**: Base [$X] | +20%: [$Y] | -20%: [$Z]

> **Market Attractiveness**: [Is this $XB or $XM? Big enough?]

✓ Ranges provided | ✓ Assumptions sourced | ✓ SOM realistic`
    },

    {
        id: 'analysis-competitive-landscape',
        title: 'Competitive Landscape',
        description: 'Competitor analysis with strategic implications',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Map top 5-7 competitors with positioning, differentiation, implications.

OUTPUT:
| Competitor | Positioning | Differentiator | Price | Share | Risk to Us |
|------------|-------------|----------------|-------|-------|------------|
| [Name] | [How position] | [What unique] | [Premium/Parity] | [X%] | [H/M/L] |

> **Strategic Implications**: [How to position vs competitors]

✓ 5-7 competitors | ✓ Share quantified | ✓ Response timing`
    },

    {
        id: 'analysis-customer-segmentation',
        title: 'Customer Segmentation',
        description: 'Segment customers by value and attractiveness',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Segment customers and rank by attractiveness.

OUTPUT:
| Segment | Size | WTP | Pain Points | CAC | LTV | LTV/CAC | Priority |
|---------|------|-----|-------------|-----|-----|---------|----------|
| [Segment] | [X-Y] | [$A-B] | [Top 3] | [$X] | [$Y] | [Ratio] | [1-5] |

> **Target Segment**: [Which to focus on first + why]

✓ 4-6 segments | ✓ LTV/CAC calculated | ✓ Clear prioritization`
    },

    {
        id: 'analysis-porters-five-forces',
        title: "Porter's Five Forces",
        description: 'Industry structure with profitability implications',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Analyze industry using Porter's Five Forces. Rate each 1-5.

OUTPUT:
| Force | Rating (1-5) | Key Drivers | Trend | So What |
|-------|-------------|-------------|-------|---------|
| **New Entrants** | [1-5] | [Barriers] | [↑/→/↓] | [Impact] |
| **Supplier Power** | [1-5] | [Drivers] | [↑/→/↓] | [Impact] |
| **Buyer Power** | [1-5] | [Drivers] | [↑/→/↓] | [Impact] |
| **Substitutes** | [1-5] | [Drivers] | [↑/→/↓] | [Impact] |
| **Rivalry** | [1-5] | [Drivers] | [↑/→/↓] | [Impact] |

> **Critical Forces**: [Which 2 most shape profitability]

✓ All forces rated | ✓ Trends identified | ✓ Impact clear`
    },

    {
        id: 'analysis-unit-economics',
        title: 'Unit Economics',
        description: 'CAC/LTV analysis with payback and scenarios',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Analyze unit economics with CAC, LTV, payback. Test sensitivities.

OUTPUT:
| Metric | Value | Assumption | Sensitivity Driver |
|--------|-------|------------|-------------------|
| **CAC** | [$X-Y] | [How calculated] | [What moves +/-20%] |
| **LTV** | [$A-B] | [ARPU × retention] | [What moves +/-20%] |
| **LTV/CAC** | [Ratio] | [Target: >3.0] | [Key lever] |
| **Payback** | [X mo] | [Target: <12mo] | [How to accelerate] |

| Scenario | CAC | LTV | LTV/CAC | Probability |
|----------|-----|-----|---------|-------------|
| **Base** | [$X] | [$Y] | [Ratio] | [60%] |
| **Upside** | [$X] | [$Y] | [Ratio] | [20%] |

> **Unit Economics Health**: [Healthy/Concerning + why]

✓ LTV/CAC >3.0 or path | ✓ Payback <18mo | ✓ Sensitivities tested`
    },

    {
        id: 'analysis-value-chain',
        title: 'Value Chain Analysis',
        description: 'Map profit pools and leverage points',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Map value chain stages, margin pools, leverage points.

OUTPUT:
| Stage | Margin Pool | Key Players | Our Leverage | Strategic Move |
|-------|-------------|-------------|--------------|----------------|
| [Stage] | [X-Y%] | [Who dominates] | [H/M/L] | [Integrate/Partner] |

> **Where to Play**: [Which stage(s) to focus on]

✓ Full chain mapped | ✓ Margins quantified | ✓ Moves clear`
    },

    {
        id: 'analysis-swot',
        title: 'SWOT Analysis',
        description: 'Concise SWOT with strategic implications',
        category: 'analysis',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Create tight SWOT (4-6 bullets each). Focus on decision-relevant insights.

OUTPUT:
**STRENGTHS** (Internal, Positive)
- [Strength with quantified evidence]
- [4-6 total]

**WEAKNESSES** (Internal, Negative)
- [Weakness with impact quantified]
- [4-6 total]

**OPPORTUNITIES** (External, Positive)
- [Opportunity with market size]
- [4-6 total]

**THREATS** (External, Negative)
- [Threat with likelihood + impact]
- [4-6 total]

> **So What**:
> 1. **Leverage**: [Which strengths for which opportunities]
> 2. **Shore Up**: [Which weaknesses to fix]
> 3. **Priority**: [#1 action based on SWOT]

✓ 4-6 per quadrant | ✓ Quantified | ✓ Clear implications`
    },

    // COMMUNICATION (6 prompts)
    {
        id: 'communication-exec-summary',
        title: 'Executive Summary',
        description: 'Partner-ready one-pager with Pyramid Principle',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Write executive summary using Pyramid Principle. Lead with answer.

OUTPUT:
**RECOMMENDATION**: [One sentence answer]

**SUPPORTING RATIONALE**:
1. **[Support 1]**: [Evidence with data]
2. **[Support 2]**: [Evidence with data]
3. **[Support 3]**: [Evidence with data]

**RISKS & MITIGATIONS**:
| Risk | Impact | Mitigation | Residual |
|------|--------|------------|----------|
| [Risk] | [H/M/L+$] | [Action] | [H/M/L] |

**NEXT ACTIONS**:
1. **[Action]**: [Owner] by [Date] → [Success metric]

✓ Answer first | ✓ 3 supports with data | ✓ Actions have owners`
    },

    {
        id: 'communication-key-insights',
        title: 'Key Insights',
        description: 'Top 7 insights with evidence and implications',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Extract top 7 insights. Each must have evidence and "So What."

OUTPUT:
| # | Insight | Evidence | So What |
|---|---------|----------|---------|
| 1 | [Observation with data] | [Source, metric] | [Business implication] |

**Critical Insight**: [The single most important finding]

✓ 7 insights | ✓ All have evidence | ✓ Clear "So What"`
    },

    {
        id: 'communication-storyline',
        title: 'Storyline Outline',
        description: 'Deck storyline with slide titles and messages',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Create 10-12 slide storyline for board presentation.

OUTPUT:
| Slide # | Title | Key Message | Visual Type |
|---------|-------|-------------|-------------|
| 1 | [Situation] | [What's happening] | [Chart type] |
| 2-12 | [...] | [...] | [...] |

**Storyline Arc**:
- Act 1 (1-3): Situation → Complication → Question
- Act 2 (4-9): Answer → Evidence
- Act 3 (10-12): Risks → Next steps

✓ 10-12 slides | ✓ SCQA structure | ✓ Visual types specified`
    },

    {
        id: 'communication-so-what',
        title: 'So What Callouts',
        description: 'Transform findings into implications and actions',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Turn findings into "So What" callouts with clear actions.

OUTPUT:
| Finding | So What | Action |
|---------|---------|--------|
| [Observation with data] | [Why matters] | [Specific next step] |

> **MOST IMPORTANT**: [Finding] → **SO WHAT**: [Implication] → **ACTION**: [What to do]

✓ 6-8 findings | ✓ Clear implications | ✓ Actions specific`
    },

    {
        id: 'communication-slide-outline',
        title: 'Slide Outline',
        description: 'Slide-by-slide outline with proof points',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Draft detailed slide outline with purpose, headline, visual, proof.

OUTPUT:
| Slide | Purpose | Headline | Visual | Proof Needed |
|-------|---------|----------|--------|--------------|
| 1 | [Why this slide] | [Action title] | [Chart type] | [Data source] |

✓ Purpose clear | ✓ Headlines action-oriented | ✓ Proof specified`
    },

    {
        id: 'communication-risk-narrative',
        title: 'Risk Narrative',
        description: 'Executive risk story with mitigations',
        category: 'communication',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Craft concise risk narrative for board. 3 paragraphs + risk table.

OUTPUT:
**Context**: [What we're achieving and why risks matter]

**Top Risks**: [The 3-4 most critical risks and impact]

**Mitigation**: [Our proactive approach]

| Risk | Impact | Probability | Mitigation | Residual |
|------|--------|-------------|------------|----------|
| [Risk] | [$X-Y] | [%] | [Action] | [H/M/L] |

> **Risk Appetite**: [What level comfortable given upside]

✓ 3 tight paragraphs | ✓ Impact quantified | ✓ Mitigations specific`
    },

    // DECISION (6 prompts)
    {
        id: 'decision-options-matrix',
        title: 'Options Matrix',
        description: 'Compare options vs weighted criteria',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Compare 3-4 options vs 5 weighted criteria. Recommend best.

OUTPUT:
| Option | Criterion 1 | Criterion 2 | Criterion 3 | Weighted Score | Rank |
|--------|------------|-------------|-------------|----------------|------|
| **A** | [Score 1-5] | [Score] | [Score] | [Total] | [#] |

**RECOMMENDATION**: [Option X] because [rationale]

✓ 3-4 options | ✓ 5 criteria weighted | ✓ Scores justified`
    },

    {
        id: 'decision-criteria',
        title: 'Decision Criteria',
        description: 'Define weighted criteria with metrics',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define decision criteria with weights, rationale, metrics, targets.

OUTPUT:
| Criterion | Weight (%) | Rationale | Metric | Target |
|-----------|-----------|-----------|--------|--------|
| [Criterion] | [%] | [Why matters] | [KPI] | [Goal] |

**Total**: 100%

> **Trade-offs**: [Which criteria conflict and how to balance]

✓ Weights sum to 100% | ✓ Metrics measurable | ✓ Targets quantified`
    },

    {
        id: 'decision-scenario-compare',
        title: 'Scenario Comparison',
        description: 'Compare base/upside/downside scenarios',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Compare base, upside, downside scenarios with assumptions.

OUTPUT:
| Scenario | Revenue | Margin | Investment | Key Assumption | Probability | NPV |
|----------|---------|--------|------------|----------------|-------------|-----|
| **Base** | [$X-Y] | [%] | [$Z] | [What must hold] | [60%] | [$A] |
| **Upside** | [$X-Y] | [%] | [$Z] | [What goes right] | [20%] | [$A] |
| **Downside** | [$X-Y] | [%] | [$Z] | [What goes wrong] | [20%] | [$A] |

> **Decision Drivers**: [What 3 factors would change recommendation]

✓ 3 scenarios | ✓ Probabilities sum to 100% | ✓ Drivers clear`
    },

    {
        id: 'decision-financial-tradeoffs',
        title: 'Financial Tradeoffs',
        description: 'Quantify ROI, payback, risks across options',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Quantify financial tradeoffs. Focus on ROI, payback, peak cash.

OUTPUT:
| Option | Investment | ROI (%) | Payback (Mo) | Peak Cash | NPV | Risk |
|--------|-----------|---------|--------------|-----------|-----|------|
| **A** | [$X] | [Y%] | [Z mo] | [$A] | [$B] | [H/M/L] |

> **Recommendation**: [Option] balances ROI/payback/risk best

✓ All have ROI/payback | ✓ Sensitivity drivers | ✓ Risk-adjusted`
    },

    {
        id: 'decision-go-no-go',
        title: 'Go / No-Go',
        description: 'Clear recommendation with conditions and red flags',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Provide clear go/no-go/defer recommendation with conditions.

OUTPUT:
## Decision: [GO / NO-GO / DEFER]

**RATIONALE**:
1. [Reason with data]
2. [Reason with data]
3. [Reason with data]

**CONDITIONS TO PROCEED**:
1. [Specific requirement]
2-5. [...]

**RED FLAGS**:
1. **[Flag]**: If [metric] falls below [threshold], reconsider

> **Confidence**: [High/Medium/Low] based on [what we know]

✓ Clear decision | ✓ 3 rationale | ✓ 5 conditions | ✓ 3 red flags`
    },

    {
        id: 'decision-recommendation',
        title: 'Recommendation',
        description: 'Final recommendation with logic, risks, next steps',
        category: 'decision',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Deliver executive recommendation with logic, risks, actions.

OUTPUT:
## RECOMMENDATION
**[One sentence answer]**

## SUPPORTING LOGIC
1. **[Support]**: [Evidence with data]
2. **[Support]**: [Evidence with data]
3. **[Support]**: [Evidence with data]

## RISKS & MITIGATIONS
| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| [Risk] | [$X] | [Action] | [Role] |

## NEXT ACTIONS
1. **[Action]**: [Owner] by [Date] → [Success metric]

✓ Answer first | ✓ 3 supports | ✓ Risks have mitigations | ✓ Actions have owners`
    },

    // EXECUTION (6 prompts)
    {
        id: 'execution-initiative-roadmap',
        title: 'Initiative Roadmap',
        description: '3-phase roadmap with dependencies and KPIs',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Build 3-phase initiative roadmap with dependencies, owners, KPIs.

OUTPUT:
| Phase | Timeline | Initiatives | Owner | Dependencies | KPI | Target |
|-------|----------|-------------|-------|--------------|-----|--------|
| **Phase 1** | [Mo 1-X] | [3-5 initiatives] | [Role] | [What first] | [Metric] | [Goal] |
| **Phase 2** | [Mo X-Y] | [3-5 initiatives] | [Role] | [Phase 1] | [Metric] | [Goal] |
| **Phase 3** | [Mo Y-Z] | [3-5 initiatives] | [Role] | [Phase 2] | [Metric] | [Goal] |

> **Critical Path**: [Which initiative is bottleneck]

✓ 3 phases | ✓ Dependencies explicit | ✓ KPIs per phase`
    },

    {
        id: 'execution-workplan',
        title: '90-Day Workplan',
        description: 'Immediate actions with owners and metrics',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define 90-day plan with weekly actions, owners, success metrics.

OUTPUT:
| Week | Action | Owner | Success Metric |
|------|--------|-------|----------------|
| **Week 1-2** | [Specific action] | [Name/Role] | [How to measure] |
| **Week 3-4** | [Specific action] | [Name/Role] | [How to measure] |
| **Week 5-12** | [...] | [...] | [...] |

## Milestones
- **Day 30**: [Key milestone with metric]
- **Day 60**: [Key milestone with metric]
- **Day 90**: [Key milestone with metric]

✓ Actions specific | ✓ Owners named | ✓ Metrics measurable`
    },

    {
        id: 'execution-kpi-dashboard',
        title: 'KPI Dashboard',
        description: 'Leading/lagging KPIs with ownership and cadence',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define KPI dashboard with leading/lagging indicators, targets, owners.

OUTPUT:
| KPI | Type | Current | Target | Cadence | Owner | So What |
|-----|------|---------|--------|---------|-------|---------|
| [Revenue] | Lagging | [$X] | [$Y] | Monthly | [Role] | [Why matters] |
| [Pipeline] | Leading | [$X] | [$Y] | Weekly | [Role] | [Predicts revenue] |
| [Churn] | Risk | [X%] | [<Y%] | Monthly | [Role] | [Early warning] |

> **North Star**: [#1 metric that matters most]

✓ Mix leading/lagging/risk | ✓ All have targets | ✓ Owners assigned`
    },

    {
        id: 'execution-change-management',
        title: 'Change Management Plan',
        description: 'Communications and adoption strategy',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Outline change management plan with audience-specific messaging.

OUTPUT:
| Audience | Message | Channel | Moment | Owner | Adoption Tactic | Risk |
|----------|---------|---------|--------|-------|----------------|------|
| [Segment] | [What they need] | [How to reach] | [When] | [Role] | [How to drive adoption] | [Resistance] |

## Change Curve
**Phase 1: Awareness** (Week 1-2): [Communication]
**Phase 2: Understanding** (Week 3-4): [Training]
**Phase 3: Adoption** (Week 5-8): [Support]
**Phase 4: Reinforcement** (Week 9+): [Sustainability]

> **Adoption Target**: [X% adoption by Week Y]

✓ Audience-specific | ✓ Multi-channel | ✓ Adoption tactics clear`
    },

    {
        id: 'execution-operating-model',
        title: 'Operating Model',
        description: 'Target operating model with gaps and actions',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Define target operating model and gaps across org/process/tech/people.

OUTPUT:
## Principles
1. [Principle 1: e.g., "Customer-centric"]
2-5. [...]

| Dimension | Current | Target | Gap | Action | Owner | Timeline |
|-----------|---------|--------|-----|--------|-------|----------|
| **Organization** | [Today] | [Should be] | [Delta] | [Reorg plan] | [Role] | [Weeks] |
| **Process** | [Today] | [Should be] | [Delta] | [Redesign] | [Role] | [Weeks] |
| **Technology** | [Today] | [Should be] | [Delta] | [Tech roadmap] | [Role] | [Weeks] |
| **People** | [Today] | [Should be] | [Delta] | [Hiring/training] | [Role] | [Weeks] |

## Critical Enablers
1. [What must be in place for success]

✓ 5 principles | ✓ 4 dimensions | ✓ Gaps quantified | ✓ Actions specific`
    },

    {
        id: 'execution-implementation-risks',
        title: 'Implementation Risks',
        description: 'Execution risks with early signals and mitigations',
        category: 'execution',
        promptTemplate: `${EXPERT_HEADER}

SCENARIO: {{scenario}}

TASK: Identify top execution risks with impact, signals, mitigations, owners.

OUTPUT:
| Risk | Impact | Likelihood | Expected $ | Early Signal | Mitigation | Contingency | Owner |
|------|--------|------------|------------|--------------|------------|-------------|-------|
| **RESOURCE** | [H/M/L+$] | [H/M/L+%] | [$X-Y] | [Metric predicts] | [Proactive action] | [Plan B] | [Role] |
| **EXECUTION** | [...] | [...] | [...] | [...] | [...] | [...] | [...] |
| **ADOPTION** | [...] | [...] | [...] | [...] | [...] | [...] | [...] |

## Risk Monitoring
**Weekly Review**: [Which risks to monitor weekly]
**Monthly Review**: [Which risks to monitor monthly]

✓ 8-10 risks | ✓ Early signals observable | ✓ Mitigations proactive | ✓ Owners assigned`
    }
];

