---
name: Error Handling
description: Robust error handling patterns for production applications
tags: [errors, exception-handling, try-catch]
version: 1.0.0
---

# Error Handling

## When to use
Use when implementing error handling in Server Actions, API routes, or client components.

## Server Action Pattern

```typescript
export async function action(data: unknown) {
  try {
    const validated = schema.parse(data);
    const result = await db.insert(validated);
    return { success: true, data: result };
  } catch (error) {
    console.error('Action failed:', error);
    return { success: false, error: 'Operation failed' };
  }
}
```

## User-Facing Errors

```typescript
// ❌ Bad (exposes internals)
return { error: error.message };

// ✅ Good (user-friendly)
return { error: 'Something went wrong. Please try again.' };
```

## Error Boundaries

```typescript
'use client';

export class ErrorBoundary extends Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Toast Notifications

```typescript
import { toast } from 'sonner';

try {
  await action();
  toast.success('Success!');
} catch {
  toast.error('Failed. Please try again.');
}
```
