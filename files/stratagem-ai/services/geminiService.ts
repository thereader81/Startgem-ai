import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a world-class senior strategy consultant with 20+ years of experience at McKinsey, BCG, or Bain. Your analyses are known for their precision, clarity, and executive polish.

## Core Principles
1. **Structured Thinking**: Use MECE (Mutually Exclusive, Collectively Exhaustive) logic in all analyses
2. **So-What Orientation**: Every observation must lead to a clear implication - never state facts without explaining why they matter
3. **Quantification**: Ground arguments in numbers wherever possible. Use ranges when precise data isn't available
4. **Actionability**: Conclude with concrete, specific recommendations that a client could act on Monday morning
5. **Executive Communication**: Use the Pyramid Principle - lead with the answer, support with evidence

## CRITICAL: Follow the User's Prompt Exactly
- The user will provide a SPECIFIC prompt template (e.g., "Create a stakeholder map", "Build an issue tree", "Analyze unit economics")
- You MUST follow that specific prompt's instructions precisely
- Do NOT generate generic strategic analysis when asked for a specific deliverable
- If asked for a stakeholder map, provide ONLY stakeholder analysis
- If asked for financial analysis, provide ONLY financial metrics
- If asked for a SWOT, provide ONLY SWOT analysis
- Respect the requested output format (e.g., "2x2 matrix", "table", "tree structure")

## Formatting Requirements
**CRITICAL**: You MUST use the following markdown structure for ALL outputs:

### Document Structure
1. Start with an executive summary in a blockquote:
   > **Executive Summary**
   > 
   > [2-3 sentences capturing the core insight and recommendation]

2. Use clear hierarchical headings:
   - # for main title
   - ## for major sections
   - ### for subsections

3. Use bullet points extensively for:
   - Key insights (prefix with ▪ or •)
   - Supporting evidence
   - Recommendations

4. Highlight critical insights using **bold** for emphasis

5. Use numbered lists ONLY for sequential steps or prioritized recommendations

6. Include "So What?" callouts for key implications:
   > **💡 So What?**
   > 
   > [Clear implication statement]

7. Use tables when comparing options, listing assumptions, or presenting structured data

### Content Guidelines
- Keep paragraphs to 2-3 sentences maximum
- Use subheadings every 3-4 paragraphs
- Include specific metrics and percentages where relevant
- Frame recommendations with clear rationale
- Use consulting terminology appropriately (e.g., "value levers", "strategic imperatives", "critical path")

Remember: Every analysis should be board-ready and partner-approved in quality.`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function* streamTextByLine(text: string, delayMs = 15): AsyncGenerator<string> {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const isLast = i === lines.length - 1;
    yield lines[i] + (isLast ? '' : '\n');
    await wait(delayMs);
  }
}

function buildPrompt(template: string, scenario: string) {
  const base = template.replace(/\{\{\s*scenario\s*\}\}/gi, scenario.trim());
  return base; // Don't append generic requirements - let the system prompt handle formatting
}

async function* mockStream(prompt: string, error?: unknown): AsyncGenerator<string> {
  // Extract the prompt type from the template to generate context-aware mock content
  const promptLower = prompt.toLowerCase();

  let content = '';

  // Generate context-aware mock content based on prompt type
  if (promptLower.includes('stakeholder')) {
    content = `# Stakeholder Map

> **Executive Summary**
> 
> The stakeholder landscape reveals three high-power actors with competing interests, two critical enablers with moderate influence, and one potential blocker. Success requires securing early alignment with the CFO and Product VP while neutralizing resistance from the Legacy Systems team.

## Power-Interest Matrix

### High Power, High Interest (Manage Closely)
- **CFO (Sarah Chen)**: Primary decision-maker, focused on ROI and risk mitigation. Strong advocate if business case is solid.
- **VP Product (James Liu)**: Controls roadmap prioritization. Concerned about technical debt and customer impact.
- **CTO (Maria Garcia)**: Owns technical architecture decisions. Skeptical of vendor solutions, prefers build over buy.

### High Power, Low Interest (Keep Satisfied)
- **CEO (Robert Kim)**: Cares about strategic outcomes, not implementation details. Needs quarterly updates only.

### Low Power, High Interest (Keep Informed)
- **Engineering Leads (5 managers)**: Will execute the work. Need clear technical specs and timeline certainty.
- **Customer Success VP (Amanda Patel)**: Worried about customer disruption during transition.

### Low Power, Low Interest (Monitor)
- **IT Operations**: Routine involvement for infrastructure support.

> **💡 So What?**
> 
> The decision hinges on securing a coalition between Finance (CFO) and Product (VP Product). Without their joint sponsorship, the CTO's skepticism will stall progress.

## Key Conflicts & Alignment Points

### Likely Conflicts
1. **Build vs. Buy**: CTO prefers in-house development; CFO wants faster time-to-value via vendor solution
2. **Timeline Pressure**: Product VP needs Q2 delivery; Engineering estimates Q3 at earliest
3. **Budget Allocation**: Customer Success wants dedicated migration support; CFO wants to minimize services spend

### Alignment Opportunities
1. **Risk Mitigation**: All executives agree on need for phased rollout with rollback capability
2. **Customer Impact**: Shared concern about minimizing disruption to top 20% of revenue-generating accounts
3. **Technical Debt**: Consensus that current system is unsustainable beyond 18 months

## Recommended Engagement Strategy

### Phase 1: Build the Coalition (Weeks 1-2)
- **CFO + VP Product alignment session**: Present unified business case showing ROI and customer benefit
- **CTO technical deep-dive**: Address build-vs-buy with objective vendor evaluation criteria

### Phase 2: Neutralize Resistance (Weeks 3-4)
- **Engineering Leads workshops**: Co-create technical implementation plan to build buy-in
- **Customer Success playbook**: Develop migration communication templates and support model

### Phase 3: Secure Executive Approval (Week 5)
- **Steering committee review**: Present consensus recommendation with clear risk mitigations

---
${error ? '_Note: Falling back to mock output because AI generation failed._' : '_Note: Configure VITE_GEMINI_PROXY_URL or VITE_GEMINI_API_KEY to enable live generation._'}
`;
  } else if (promptLower.includes('swot')) {
    content = `# SWOT Analysis

> **Executive Summary**
> 
> The organization has strong brand equity and technical capabilities but faces margin pressure from emerging competitors and regulatory uncertainty. The priority is to leverage existing customer relationships to expand into adjacent markets while modernizing the cost structure.

## Strengths
- **Market Position**: #2 player with 23% market share and 85% brand recognition in core segment
- **Customer Loyalty**: 78% retention rate, NPS of 42 (industry avg: 28)
- **Technical Capabilities**: Proprietary platform with 3-year competitive moat
- **Talent Density**: 40% of engineering team from top-tier tech companies

## Weaknesses
- **Cost Structure**: COGS 12 points above industry benchmark due to legacy infrastructure
- **Geographic Concentration**: 68% of revenue from single region, high exposure to local economic cycles
- **Product Velocity**: 18-month release cycles vs. 6-month competitor average
- **Sales Efficiency**: CAC increased 35% YoY while LTV remained flat

## Opportunities
- **Market Expansion**: Adjacent segment growing at 22% CAGR with low competitive intensity
- **Platform Monetization**: Current customers willing to pay 15-20% premium for integrated solutions
- **M&A Targets**: 3 distressed competitors available at 0.8x revenue multiples
- **Regulatory Tailwinds**: New compliance requirements favor established players with scale

## Threats
- **Competitive Disruption**: Two well-funded startups targeting core segment with 40% lower pricing
- **Technology Shift**: Cloud-native architectures making legacy platform less defensible
- **Talent Attrition**: 18% annual turnover in engineering, up from 12% two years ago
- **Margin Compression**: Pricing power eroding as product reaches maturity

> **💡 So What?**
> 
> The window to act is 12-18 months. The company must simultaneously defend the core (cost reduction, product velocity) while expanding into adjacencies before competitors establish beachheads.

## Strategic Implications

### Immediate Priorities (0-6 months)
1. **Cost Reset**: Target 8-10 point COGS reduction through infrastructure modernization
2. **Product Acceleration**: Shift to agile delivery model to halve release cycles
3. **Talent Retention**: Implement targeted retention program for top 20% of engineering talent

### Growth Initiatives (6-18 months)
1. **Adjacent Market Entry**: Launch integrated solution in fastest-growing segment
2. **M&A Evaluation**: Conduct diligence on top 2 acquisition targets for capability fill

---
${error ? '_Note: Falling back to mock output because AI generation failed._' : '_Note: Configure VITE_GEMINI_PROXY_URL or VITE_GEMINI_API_KEY to enable live generation._'}
`;
  } else if (promptLower.includes('unit economics') || promptLower.includes('financial')) {
    content = `# Unit Economics Analysis

> **Executive Summary**
> 
> Current unit economics are marginally profitable with 18-month payback, but sensitivity analysis reveals high vulnerability to CAC inflation and churn. The business model requires 15-20% improvement in either acquisition efficiency or retention to achieve venture-scale returns.

## Core Metrics

| Metric | Current | Target | Industry Benchmark |
|--------|---------|--------|-------------------|
| **CAC** | $1,240 | $950 | $800-1,100 |
| **LTV** | $2,180 | $3,200 | $2,500-3,500 |
| **LTV:CAC Ratio** | 1.76x | 3.0x+ | 3.0x+ |
| **Payback Period** | 18 months | 12 months | 12-15 months |
| **Gross Margin** | 68% | 75% | 70-80% |
| **Monthly Churn** | 4.2% | 2.5% | 2-3% |

## Detailed Breakdown

### Customer Acquisition Cost (CAC)
- **Paid Marketing**: $720 (58% of CAC)
  - Google/Meta ads: $520
  - Retargeting: $200
- **Sales & Marketing Overhead**: $380 (31%)
  - SDR/AE salaries allocated per deal
- **Tools & Technology**: $140 (11%)
  - CRM, analytics, attribution stack

### Lifetime Value (LTV)
- **Average Contract Value**: $180/month
- **Average Customer Lifespan**: 24 months (inverse of 4.2% monthly churn)
- **Gross Margin**: 68%
- **LTV Calculation**: $180 × 24 × 0.68 = $2,937 (before discounting)
- **Discounted LTV** (15% discount rate): $2,180

> **💡 So What?**
> 
> At 1.76x LTV:CAC, the business is barely profitable on a unit basis. A 10% increase in churn or CAC would push the model underwater. This requires immediate action on retention and acquisition efficiency.

## Sensitivity Analysis

### Impact of 10% Changes
| Variable | LTV Impact | Payback Impact |
|----------|------------|----------------|
| +10% Monthly Churn | -$340 (-16%) | +3 months |
| -10% CAC | No change | -2 months |
| +10% ACV | +$218 (+10%) | -2 months |
| +10% Gross Margin | +$218 (+10%) | -1 month |

### Break-Even Scenarios
- **Scenario A** (Retention-led): Reduce churn to 2.8% → LTV increases to $3,100, ratio improves to 2.5x
- **Scenario B** (Efficiency-led): Reduce CAC to $950 → Ratio improves to 2.3x, payback drops to 14 months
- **Scenario C** (Pricing-led): Increase ACV to $210 → LTV increases to $2,540, ratio improves to 2.0x

## Recommended Actions

### Immediate (0-3 months)
1. **Retention Program**: Launch proactive customer success outreach for at-risk accounts (churn score >70)
   - Expected impact: Reduce churn by 0.8-1.2 points → +$280-420 LTV
2. **CAC Optimization**: Reallocate 30% of paid spend to higher-converting channels
   - Expected impact: Reduce CAC by $120-180

### Medium-term (3-9 months)
1. **Product-Led Growth**: Introduce freemium tier to reduce sales-assisted CAC
   - Expected impact: Create second cohort with $400-600 CAC
2. **Pricing Optimization**: Test 15% price increase for new customers
   - Expected impact: +$27/month ACV → +$440 LTV (assuming 5% conversion impact)

## Assumptions & Risks

### Key Assumptions
- Churn rate remains stable across customer cohorts
- CAC is fully loaded including overhead allocation
- Gross margin excludes customer success costs (treated as operating expense)
- Discount rate of 15% reflects cost of capital

### Data Gaps
- Cohort-level retention curves (currently using blended average)
- CAC by acquisition channel (need better attribution)
- Expansion revenue potential from existing customers

---
${error ? '_Note: Falling back to mock output because AI generation failed._' : '_Note: Configure VITE_GEMINI_PROXY_URL or VITE_GEMINI_API_KEY to enable live generation._'}
`;
  } else {
    // Generic fallback for other prompt types
    const contextSnippet = prompt.slice(0, 200).replace(/\n/g, ' ');
    content = `# Analysis

> **Executive Summary**
> 
> Based on the scenario provided, the analysis reveals critical decision points that require immediate attention. The recommended path balances short-term execution with long-term strategic positioning.

## Context
${contextSnippet}...

## Key Findings
- **Finding 1**: [Analysis would be generated based on your specific scenario and prompt]
- **Finding 2**: [Tailored insights would appear here]
- **Finding 3**: [Context-specific recommendations would follow]

> **💡 So What?**
> 
> [Implications would be drawn from the specific scenario you provided]

## Recommendations
1. **Immediate Action**: [Specific to your scenario]
2. **Medium-term Initiative**: [Based on your context]
3. **Long-term Strategy**: [Aligned with your objectives]

---
${error ? '_Note: Falling back to mock output because AI generation failed._' : '_Note: Configure VITE_GEMINI_PROXY_URL or VITE_GEMINI_API_KEY to enable live generation._'}
`;
  }

  // Chunk by lines to preserve markdown formatting
  const chunks = content.split('\n');
  for (let i = 0; i < chunks.length; i++) {
    const isLast = i === chunks.length - 1;
    // Add the newline back except for the very last piece
    yield chunks[i] + (isLast ? '' : '\n');
    await wait(50); // Slightly slower for better reading effect
  }
}


// Model fallback chain - tries models in order until one succeeds
const MODEL_FALLBACK_CHAIN = [
  'gemini-2.0-flash-exp',      // Latest experimental model (may have quota issues)
  'gemini-1.5-flash-latest',   // Stable, widely available (v1beta compatible)
  'gemini-1.5-pro-latest'      // More capable, usually has quota (v1beta compatible)
];

interface GenerationError extends Error {
  status?: number;
  code?: string;
}

async function tryGenerateWithModel(
  genAI: GoogleGenerativeAI,
  modelName: string,
  prompt: string
): Promise<AsyncGenerator<string> | null> {
  try {
    // Try with systemInstruction first (newer SDK versions)
    let model;
    try {
      model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] }
      });
    } catch (e) {
      // Fallback: prepend system prompt to user message (older SDK versions)
      console.log(`systemInstruction not supported, using prepended prompt for ${modelName}`);
      model = genAI.getGenerativeModel({ model: modelName });
      prompt = `${SYSTEM_PROMPT}\n\n---\n\nUser Request:\n${prompt}`;
    }

    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 4096
      }
    });

    // Return a generator that yields from the stream
    async function* streamGenerator() {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) yield text;
      }
    }

    return streamGenerator();
  } catch (error) {
    const err = error as GenerationError;

    // Log the error for debugging
    console.error(`Model ${modelName} failed:`, err.message);

    // Check if it's a quota error (429) or model not found (404)
    if (err.message?.includes('quota') || err.message?.includes('429')) {
      console.warn(`⚠️ Quota exceeded for ${modelName}`);
      return null; // Try next model
    }

    if (err.message?.includes('404') || err.message?.includes('not found')) {
      console.warn(`⚠️ Model ${modelName} not found`);
      return null; // Try next model
    }

    // For other errors, rethrow to be caught by outer handler
    throw error;
  }
}

export async function* generateInsightStream(
  template: string,
  scenario: string
): AsyncGenerator<string> {
  const prompt = buildPrompt(template, scenario);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const proxyUrl = import.meta.env.VITE_GEMINI_PROXY_URL as string | undefined;

  // Try proxy first if configured
  if (proxyUrl) {
    try {
      const endpoint = proxyUrl.endsWith('/') ? proxyUrl.slice(0, -1) : proxyUrl;
      const response = await fetch(`${endpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemPrompt: SYSTEM_PROMPT,
          config: {
            model: 'gemini-2.0-flash',
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 4096
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Proxy error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const text = typeof data?.text === 'string' ? data.text : '';
      if (!text) {
        throw new Error('Proxy response missing text.');
      }

      console.log('✅ Using proxy server for generation');
      yield* streamTextByLine(text);
      return;
    } catch (error) {
      console.error('Proxy Generation Error:', error);
      console.log('Falling back to direct API...');
      // Continue to try direct API
    }
  }

  // If no API key, use mock immediately
  if (!apiKey) {
    console.log('ℹ️ No API key configured, using mock output');
    yield* mockStream(prompt);
    return;
  }

  // Try each model in the fallback chain
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: Error | null = null;

  for (const modelName of MODEL_FALLBACK_CHAIN) {
    try {
      console.log(`🔄 Trying model: ${modelName}...`);
      const generator = await tryGenerateWithModel(genAI, modelName, prompt);

      if (generator) {
        console.log(`✅ Successfully using model: ${modelName}`);
        yield* generator;
        return; // Success! Exit the function
      }

      // If generator is null, it means we should try the next model
      continue;
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ Model ${modelName} failed with error:`, error);
      // Continue to next model in chain
    }
  }

  // All models failed, fall back to mock output
  console.warn('⚠️ All AI models failed or exceeded quota. Using mock output.');

  // Create a user-friendly error message
  const errorMessage = lastError?.message?.includes('quota')
    ? 'API quota exceeded. Please check your Google AI Studio quota settings.'
    : 'AI generation temporarily unavailable.';

  const mockError = new Error(errorMessage);
  yield* mockStream(prompt, mockError);
}
