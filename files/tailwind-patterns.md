---
name: Tailwind Patterns
description: Utility-first CSS patterns for responsive layouts
tags: [tailwind, css, styling, responsive]
version: 1.0.0
---

# Tailwind Patterns

## When to use
Use when styling components, creating layouts, or implementing responsive designs.

## Layout Patterns

### Flexbox
```tsx
<div className="flex items-center justify-between gap-4">
  <Logo />
  <Nav />
</div>
```

### Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## Responsive Design

```tsx
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
">
  Content
</div>
```

## State Modifiers

```tsx
<button className="
  bg-blue-600
  hover:bg-blue-700
  active:bg-blue-800
  focus:ring-4
  disabled:opacity-50
">
  Button
</button>
```

## Spacing (8px Grid)

```
p-1=4px, p-2=8px, p-4=16px, p-6=24px, p-8=32px, p-12=48px
```
