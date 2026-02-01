---
name: UI/UX Pro Max
description: Elite visual design standards with glassmorphism, typography, and accessibility
tags: [design, ui, ux, styling, accessibility]
version: 1.0.0
---

# UI/UX Pro Max

## When to use
Use when building interfaces, applying styling, creating visual layouts, or ensuring exceptional user experience.

## Three Pillars

1. **Hierarchy** - Guide the eye
2. **Consistency** - Build trust
3. **Delight** - Exceed expectations

## Visual Hierarchy

```typescript
<h1 className="text-6xl font-bold">Hero</h1>
<h2 className="text-3xl font-semibold">Section</h2>
<p className="text-base text-gray-600">Body</p>
```

## Color System (60-30-10 Rule)

- 60% Dominant (backgrounds)
- 30% Secondary (brand)
- 10% Accent (CTAs)

### Accessibility
- Minimum 4.5:1 contrast ratio
- Never use color alone for information

## Typography

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'system-ui'],
  display: ['Poppins', 'Inter']
}
```

Type scale: `text-xs` → `text-sm` → `text-base` → `text-lg` → `text-xl` → `text-6xl`

## Spacing (8px Grid)

```
p-1=4px, p-2=8px, p-4=16px, p-6=24px, p-8=32px, p-12=48px
```

## Glassmorphism (Signature Style)

```typescript
<div className="
  backdrop-blur-lg
  bg-white/10
  border border-white/20
  rounded-2xl
  shadow-2xl
  hover:bg-white/20
  transition-all duration-300
">
  Content
</div>
```

## Micro-Interactions

```typescript
<button className="
  bg-blue-600
  hover:bg-blue-700
  hover:scale-105
  active:scale-95
  transition-all duration-300
">
  Button
</button>
```

## Responsive Design

```typescript
<div className="
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">
  Content
</div>
```

## Accessibility Checklist

- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] ARIA labels on icons
- [ ] Semantic HTML
- [ ] 4.5:1+ contrast
- [ ] Touch targets ≥44px mobile
