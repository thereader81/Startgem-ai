---
name: Deployment Procedures
description: Railway deployment with Docker and environment configuration
tags: [deployment, railway, docker, ci-cd]
version: 1.0.0
---

# Deployment Procedures

## When to use
Use when deploying to production, setting up CI/CD, or configuring Railway deployments.

## Pre-Deploy Checks

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

## Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
```

## railway.json

```json
{
  "build": { "builder": "DOCKERFILE" },
  "deploy": {
    "healthcheckPath": "/api/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## Health Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}
```

## Environment Variables

Set in Railway dashboard:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- All other secrets
