# Stratagem AI Pro

A premium, AI-powered workspace designed for top-tier consulting workflows. This application integrates Google's Gemini AI to provide intelligent insights, workflow automation, and executive-grade deliverables.

## Features

- **Consulting-Grade UI**: specialized dashboard, workflow, and workspace views with a minimal, corporate aesthetic.
- **AI Integration**: Real-time streaming with Google Gemini (via direct API or local proxy).
- **Prompt Library**: Curated catalog of 37 high-value prompts optimized for business contexts.
- **Workflow Automation**: Step-by-step workflow builder with persistent states.
- **Export Capabilities**: Generate PDF, PPTX, and DOCX reports directly from the app.
- **Dual Mode**: Works with a real API key or a robust mock fallback for demonstrations.

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the Client**:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

2.  **Start the Proxy Server** (Optional, for server-side generation):
    ```bash
    npm run server
    ```
    The server runs on port 8787.

### Configuration

Create a `.env` file in the root directory:

```env
# For direct client-side usage or server-side proxy
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: To use the local proxy server
VITE_GEMINI_PROXY_URL=http://localhost:8787
```

If no API key is provided, the application defaults to a mock generation mode suitable for demos.

## Scripts

- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview production build.
- `npm run server`: Start the Express proxy server.
- `npm run check:paths`: Verify no hardcoded absolute paths exist.
