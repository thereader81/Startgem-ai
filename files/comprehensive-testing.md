---
name: Comprehensive Testing
description: Testing strategies for Next.js applications
tags: [testing, qa, vitest, playwright]
version: 1.0.0
---

# Comprehensive Testing

## When to use
Use when writing tests, implementing QA processes, or ensuring code quality.

## Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest';

describe('calculateScore', () => {
  it('returns 10 for high-intent keywords', () => {
    expect(calculateScore('looking for')).toBe(10);
  });
  
  it('returns 0 for low-intent keywords', () => {
    expect(calculateScore('just browsing')).toBe(0);
  });
});
```

## Component Tests

```typescript
import { render, screen } from '@testing-library/react';

describe('LeadCard', () => {
  it('displays lead title and score', () => {
    render(<LeadCard title="Test" score={8} />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Score: 8/10')).toBeInTheDocument();
  });
});
```

## E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('user can create account', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('[name=email]', 'test@example.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');
  
  await expect(page).toHaveURL('/dashboard');
});
```
