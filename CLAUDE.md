# Stratagem AI Pro — Build Notes (Single-Source Handoff)

This file is the canonical handoff document. It captures the project state, structure, and changes implemented so far. Read this first when porting or continuing development.

## What Exists Now (End-to-End)

A working Vite + React + TypeScript app scaffold with four core views (Dashboard, Workflow, Workspace, Prompt Library), a persistent Zustand store, prompt catalog (37 optimized prompts), demo projects, and a Gemini streaming service with a mock fallback. The app supports:

- Project creation, selection, and persistence
- Scenario editing with auto-save
- Prompt selection by category
- Streaming generation output (real Gemini if API key present, mock otherwise)
- Copy/export of output (Markdown, PDF, PPTX, DOCX)
- Workflow stepper with persisted outputs and sample visualizations
- A clean, minimal, corporate UI aligned to top-tier consulting aesthetics

## How To Run

1. From `stratagem-ai/`:
   - `npm install`
   - `npm run dev`
2. Optional: enable live generation:
   - Direct client: set `VITE_GEMINI_API_KEY=...`
   - Proxy server: set `VITE_GEMINI_PROXY_URL=http://localhost:8787` and run `npm run server`

If no API key or proxy is provided, generation uses a built‑in mock stream.

## Project Structure (Current)

```
stratagem-ai/
├── App.tsx
├── index.html
├── index.tsx
├── listModels.js
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
├── tsconfig.node.json
├── vite-env.d.ts
├── vite.config.ts
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Skeleton.tsx
│   ├── views/
│   │   ├── Dashboard.tsx
│   │   ├── PromptLibrary.tsx
│   │   ├── Workflow.tsx
│   │   └── Workspace.tsx
│   └── visualizations/
│       ├── DynamicChart.tsx
│       ├── Matrix2x2.tsx
│       ├── Pyramid.tsx
│       ├── RadarChart.tsx
│       └── WaterfallChart.tsx
├── constants/
│   ├── categories.ts
│   ├── demoProjects.ts
│   ├── prompts.ts (optimized)
│   ├── workflows.ts
│   └── PROMPTS_OPTIMIZED.md
├── exports/
│   └── Prompt Library for Strategem AI Pro.pdf
├── lib/
│   ├── cn.ts
│   ├── formatters.ts
│   └── utils.ts
├── scripts/
│   ├── check-absolute-paths.mjs
│   └── generate-prompts-pdf.mjs
├── server/
│   └── index.js
├── services/
│   ├── exportService.ts
│   └── geminiService.ts
├── stores/
│   └── projectStore.ts
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

## Key Implementation Details

- **State**: Zustand store in `stores/projectStore.ts` with persistence, including workflow state.
- **Prompt catalog**: 37 optimized prompts across 6 categories in `constants/prompts.ts`; human-readable reference in `PROMPTS_OPTIMIZED.md`.
- **Workflow templates**: `constants/workflows.ts` with multi-step templates and sample visualizations.
- **Demo data**: 3 seeded projects in `constants/demoProjects.ts`.
- **Streaming**: `services/geminiService.ts` supports live Gemini streaming or mock fallback with strong guardrails.
- **Export**: `services/exportService.ts` supports PDF, PPTX (multi-slide), and DOCX via dynamic imports.
- **Proxy server**: `server/index.js` provides `/api/generate` + `/api/health` for server-side Gemini calls.
- **Path safety**: `scripts/check-absolute-paths.mjs` blocks hard-coded absolute paths during build.
- **UI**: Componentized layout, cards, buttons, badges; minimal light theme in `styles/globals.css`.

## How Generation Works

- Workspace and Workflow use `generateInsightStream()` to stream chunks.
- If `VITE_GEMINI_PROXY_URL` is set, requests go through the local Express proxy server.
- Otherwise, if `VITE_GEMINI_API_KEY` is available, the client calls Gemini directly.
- If neither is configured, a mock response streams instead.
- Workspace output is saved back to the active project via `saveGeneratedOutput()`.
- Workflow step outputs persist via `saveWorkflowStepOutput()`.

## Changes Implemented So Far

- Created the full Vite + React scaffold with Tailwind config.
- Implemented global design tokens and animations.
- Built core layout (sidebar/header/chat panel).
- Implemented Dashboard, Workflow, Workspace, Prompt Library views.
- Added Workflow view with stepper, persisted outputs, and demo visualizations.
- Added Zustand store with persistence for projects/prompts/workflows.
- Added demo projects and a full prompt catalog.
- Rebuilt the UI into a minimal corporate light theme (typography, color system, layout polish).
- Strengthened prompt guardrails; rewrote all 37 prompts to executive-grade quality; added `PROMPTS_OPTIMIZED.md` for reference.
- Moved `PROMPTS_OPTIMIZED.md` into `constants/` for easy discovery alongside the prompt catalog.
- Added export service for PDF, PPTX, and DOCX outputs with dynamic imports.
- Added Express proxy server for Gemini with `/api/generate` and `/api/health`.
- Added absolute-path safety check script and wired it to `prebuild`.
- Updated Gemini service to use proxy when configured and to rely on system instructions.
- Added prompts_enhanced.ts PDF generator script and exported a client-facing PDF.
- Lazy-loaded views and exports to reduce initial bundle size.

## Skills Pack (External to App)

- Repo cloned to workspace: `claude-code-polished-documents-skills/`.
- Copyable bundle created at `skills-pack/claude-code-polished-documents-skills/` (all skills except `mcp-builder`).
- Skills installed into Codex via skill-installer (`algorithmic-art`, `brand-guidelines`, `canvas-design`, `document-polisher`, `docx`, `frontend-design`, `internal-comms`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`, `xlsx`). Restart Codex to pick up new skills.

## Build Notes

- Generated `exports/Prompt Library for Strategem AI Pro.pdf` from `constants/prompts_enhanced.ts` using `scripts/generate-prompts-pdf.mjs`.
- Started dev server and proxy via `npm run dev` and `npm run server` (see logs in /tmp if started via nohup).
- `npm install` completed successfully (created/updated `package-lock.json`); `npm audit` reported 4 vulnerabilities (3 moderate, 1 critical).
- `prebuild` runs `check:paths` to block accidental absolute paths.
- Tailwind content paths narrowed to avoid scanning `node_modules` (`tailwind.config.cjs`).
- Builds succeed; code-split bundles for views and exports. Large-chunk warnings expected due to PDF/PPTX/DOCX libs.

## Known Gaps / Next Steps

- Workflow visualizations are demo fixtures; parsing real chart JSON from LLM outputs not yet wired.
- AI chat panel is a placeholder.
- No tests yet.

## Notes for Porting

- The app is framework‑agnostic beyond Vite + React; structure is modular.
- Ensure environment variable injection (`VITE_GEMINI_API_KEY` or `VITE_GEMINI_PROXY_URL`) works on target platform.
- Global CSS carries the design system; keep it intact for visual parity.

---

This file must be updated after every change.
