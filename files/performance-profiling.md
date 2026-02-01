---
name: Performance Profiling
description: Core Web Vitals optimization and speed improvements
tags: [performance, optimization, lighthouse, speed]
version: 1.0.0
---

# Performance Profiling

## When to use
Use when pages load slowly, optimizing for Core Web Vitals, or analyzing bundle sizes.

## Lighthouse Targets

- Performance: 90+
- Accessibility: 90+
- SEO: 90+

## Code Splitting

```typescript
import dynamic from 'next/dynamic';

const Heavy = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />
});
```

## Image Optimization

```typescript
import Image from 'next/image';

<Image 
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
  alt="Hero image"
/>
```

## Database Optimization

```sql
CREATE INDEX idx_user_created 
  ON leads(user_id, created_at DESC);
```

## Memoization

```typescript
const value = useMemo(() => expensiveCalc(), [deps]);
const callback = useCallback(() => handler(), []);
```
