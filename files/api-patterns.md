---
name: API Patterns
description: Next.js Server Actions and RESTful API route patterns
tags: [api, backend, server-actions, rest]
version: 1.0.0
---

# API Patterns

## When to use
Use when building backend APIs, handling mutations, creating server actions, or designing RESTful endpoints.

## Server Actions (Preferred)

```typescript
'use server';

import { z } from 'zod';

export async function createItem(data: unknown) {
  const schema = z.object({ title: z.string().min(3) });
  const validated = schema.parse(data);
  
  const result = await db.insert(validated);
  revalidatePath('/items');
  
  return { success: true, data: result };
}
```

## API Routes

```typescript
// app/api/items/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await db.select();
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const validated = schema.safeParse(body);
  
  if (!validated.success) {
    return Response.json({ error: 'Invalid' }, { status: 400 });
  }
  
  return Response.json(data, { status: 201 });
}
```

## Error Handling

```typescript
try {
  const result = await action();
  return { success: true, data: result };
} catch (error) {
  console.error(error);
  return { success: false, error: 'Operation failed' };
}
```

## HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
