---
name: Authentication Flows
description: Supabase Auth implementation with protected routes
tags: [authentication, auth, supabase, login, oauth]
version: 1.0.0
---

# Authentication Flows

## When to use
Use when implementing signup, login, logout, password reset, OAuth, or protected routes.

## Supabase Client

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

## Login

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

## Protected Routes (Middleware)

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
};
```

## OAuth

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${origin}/auth/callback`
  }
});
```
