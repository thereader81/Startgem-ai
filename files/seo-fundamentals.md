---
name: SEO Fundamentals
description: Search engine optimization with metadata and structured data
tags: [seo, metadata, sitemap, search-optimization]
version: 1.0.0
---

# SEO Fundamentals

## When to use
Use when optimizing for search engines, implementing metadata, or launching marketing pages.

## Metadata

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App Name - Value Proposition',
  description: 'Brief description (150-160 chars)',
  openGraph: {
    title: 'App Name',
    description: 'Description',
    images: ['/og-image.png']
  }
};
```

## Sitemap

```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      priority: 1
    }
  ];
}
```

## Structured Data

```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "App Name"
})}
</script>
```

## Semantic HTML

```tsx
<header>
  <nav aria-label="Main navigation">
    ...
  </nav>
</header>
<main>
  <article>
    <h1>Page Title</h1>
  </article>
</main>
```
