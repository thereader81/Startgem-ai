# Claude Skills - Properly Formatted

## ✅ Ready to Upload to Claude.ai

These skills are formatted with YAML frontmatter for Claude's skill system.

## 📁 Contents

13 individual skill files (`.md` format with YAML headers):

1. **systematic-debugging.md** - Error resolution
2. **react-patterns.md** - Modern React
3. **ui-ux-pro-max.md** - Design standards
4. **database-design.md** - Supabase schemas
5. **api-patterns.md** - Server Actions & APIs
6. **security-checklist.md** - Security audit
7. **deployment-procedures.md** - Railway deployment
8. **performance-profiling.md** - Speed optimization
9. **tailwind-patterns.md** - CSS utilities
10. **authentication-flows.md** - Supabase Auth
11. **payment-integration.md** - Stripe integration
12. **seo-fundamentals.md** - SEO optimization
13. **error-handling.md** - Error patterns
14. **comprehensive-testing.md** - Testing strategies

## 🚀 How to Upload

### Method 1: Individual Files (Recommended)
1. Go to Claude.ai
2. Click your profile → Settings
3. Navigate to "Custom Instructions" or "Skills"
4. Upload each `.md` file individually
5. Skills are now globally available!

### Method 2: Via Projects
1. Create or open a Claude.ai Project
2. Go to Project Knowledge
3. Upload all `.md` files
4. Skills available within this project

### Method 3: Paste Content
1. Start a conversation
2. Copy content from any skill file
3. Paste and say "Remember this as a skill"
4. Reference when needed

## 💡 Usage

Once uploaded, Claude automatically applies skills when relevant:

```
"Build a login page with glassmorphism"
→ Claude uses: react-patterns + ui-ux-pro-max + authentication-flows
```

```
"Fix this hydration error"
→ Claude uses: systematic-debugging
```

```
"Deploy to Railway"
→ Claude uses: deployment-procedures + security-checklist
```

## 🎯 Triggers

Skills activate based on keywords in your messages:
- "error", "bug", "crash" → systematic-debugging
- "component", "react" → react-patterns
- "design", "style" → ui-ux-pro-max
- "deploy" → deployment-procedures

## ✨ Benefits

- **Consistency**: All projects follow same patterns
- **Quality**: Professional-grade code automatically
- **Speed**: No need to explain standards every time
- **Learning**: Skills teach best practices

---

**Note**: Each file has YAML frontmatter (between `---` markers) which Claude uses to understand when to apply the skill.
