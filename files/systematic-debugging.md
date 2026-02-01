---
name: Systematic Debugging
description: 5-step error resolution protocol for diagnosing and fixing bugs systematically
tags: [debugging, errors, troubleshooting]
version: 1.0.0
---

# Systematic Debugging

## When to use
Use when encountering any error, bug, or unexpected behavior. This applies to syntax errors, runtime crashes, logic errors, hydration mismatches, and network failures.

## The 5-Step Protocol

### Step 1: Error Classification

Identify the error type:

- **Syntax Errors**: Code won't compile (TypeScript errors, build failures)
- **Runtime Errors**: App crashes during execution (undefined properties, network failures)
- **Logic Errors**: Wrong results with no error message
- **Hydration Errors**: Next.js server/client mismatch
- **Network Errors**: API failures, CORS issues

### Step 2: Root Cause Analysis

1. Read the complete error message
2. Examine the stack trace (file:line:column)
3. Check recent changes: `git log --oneline -5`
4. Verify environment variables loaded
5. Create minimal reproduction

### Step 3: Form Hypothesis

Specific, testable hypothesis:
- ❌ Bad: "Something is wrong with the data"
- ✅ Good: "leads array is undefined because Supabase query runs before auth completes"

### Step 4: Apply Fix

```typescript
// Defensive fix pattern
{!data ? (
  <Loading />
) : data.length === 0 ? (
  <Empty />
) : (
  data.map(item => <Item key={item.id} {...item} />)
)}
```

### Step 5: Verify & Document

- [ ] Error resolved
- [ ] No new errors
- [ ] Tests pass
- [ ] Documented in TROUBLESHOOTING.md

## Common Patterns

**"Cannot read property X of undefined"**
```typescript
object?.property ?? 'default'
```

**"Maximum update depth exceeded"**
```typescript
useEffect(() => {
  setState(value);
}, []);
```

**"Hydration failed"**
```typescript
'use client';
const [state, setState] = useState('');
useEffect(() => {
  setState(clientOnlyValue);
}, []);
```
