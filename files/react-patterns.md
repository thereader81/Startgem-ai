---
name: React Patterns
description: Modern React architecture including Server Components, hooks, and state management
tags: [react, nextjs, components, hooks]
version: 1.0.0
---

# React Patterns

## When to use
Use when building React components, managing state, fetching data, or structuring component architecture in Next.js applications.

## Core Principles

1. **Functional components only**
2. **TypeScript everything** (no `any`)
3. **Server Components by default**

## Component Types

### Server Components
```typescript
// app/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from('items').select('*');
  
  return <div>{data?.map(item => <Card key={item.id} {...item} />)}</div>;
}
```

### Client Components
```typescript
'use client';

import { useState } from 'react';

export function Interactive() {
  const [loading, setLoading] = useState(false);
  
  async function handleClick() {
    setLoading(true);
    await action();
    setLoading(false);
  }
  
  return <button onClick={handleClick}>{loading ? 'Loading...' : 'Click'}</button>;
}
```

## State Management

### Local State
```typescript
const [value, setValue] = useState(initial);
```

### Zustand (Complex State)
```typescript
import { create } from 'zustand';

export const useStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] }))
}));
```

## Data Fetching

### Server Components (Preferred)
```typescript
const { data } = await supabase.from('table').select('*');
```

### Server Actions (Mutations)
```typescript
'use server';

export async function createItem(data) {
  const result = await db.insert(data);
  revalidatePath('/path');
  return { success: true };
}
```

## Forms

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3)
});

export function Form() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  });
  
  return <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name')} />
  </form>;
}
```
