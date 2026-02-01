---
name: Database Design
description: Supabase PostgreSQL schema design with RLS policies and migrations
tags: [database, supabase, sql, rls, schema]
version: 1.0.0
---

# Database Design (Supabase)

## When to use
Use when creating database schemas, writing migrations, setting up Row Level Security, or designing data models.

## Schema Pattern

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Row Level Security (MANDATORY)

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own"
  ON leads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own"
  ON leads FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Indexes

```sql
CREATE INDEX idx_leads_user_score 
  ON leads(user_id, score DESC);
```

## Migration Pattern

```sql
-- supabase/migrations/20260128_create_leads.sql
CREATE TABLE leads (...);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY ...;
CREATE INDEX ...;
```
