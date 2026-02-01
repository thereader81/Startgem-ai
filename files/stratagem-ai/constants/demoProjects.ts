import type { Project } from '../types';

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-1',
    name: 'Tech Startup Series B Strategy',
    scenario: `Our B2B SaaS company has grown from $2M to $18M ARR in 3 years. We're raising Series B ($40M target) but facing pressure from investors on multiple fronts:

1. Our sales cycle has lengthened from 45 to 90 days as we move upmarket
2. Two well-funded competitors launched in the past year
3. Our NRR dropped from 130% to 115% due to churn in SMB segment
4. Engineering wants to rebuild the platform (18 month project)

The board is split: half want aggressive growth, half want profitability. We need to decide on our strategic direction before the fundraise.`,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-18T00:00:00.000Z',
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
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-17T00:00:00.000Z',
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
    createdAt: '2024-01-08T00:00:00.000Z',
    updatedAt: '2024-01-16T00:00:00.000Z',
    generatedOutputs: []
  }
];
