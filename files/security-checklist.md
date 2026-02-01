---
name: Security Checklist
description: Pre-deployment security audit and OWASP compliance
tags: [security, audit, owasp, deployment]
version: 1.0.0
---

# Security Checklist

## When to use
Use before every production deployment, when handling sensitive data, or auditing security.

## Pre-Deployment Audit

### Authentication
- [ ] RLS enabled on ALL tables
- [ ] Service role key NEVER in client code
- [ ] Password requirements enforced
- [ ] Email verification enabled

### Data Validation
- [ ] All inputs validated (Zod)
- [ ] SQL injection protected (parameterized queries)
- [ ] XSS prevented

### Secrets Management
- [ ] No API keys in code
- [ ] .env.local in .gitignore
- [ ] Check for exposed secrets:

```bash
git grep -E "(sk_|pk_live|AKIA)"
```

### Dependencies

```bash
npm audit
npm audit fix
```

### API Security
- [ ] Rate limiting on sensitive endpoints
- [ ] CORS configured (not `*`)
- [ ] HTTPS enforced

## RLS Verification

```sql
-- Test as User A
SELECT * FROM leads WHERE user_id = 'user-b-id';
-- Should return ZERO rows
```
