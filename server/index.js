import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 8787);
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'stratagem-ai-pro' });
});

app.post('/api/generate', async (req, res) => {
  try {
    if (!apiKey) {
      res.status(400).json({ error: 'Missing GEMINI_API_KEY on server.' });
      return;
    }

    const { prompt, systemPrompt, config } = req.body || {};
    if (!prompt) {
      res.status(400).json({ error: 'prompt is required' });
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: config?.model ?? 'gemini-1.5-pro',
      systemInstruction: systemPrompt
        ? { role: 'system', parts: [{ text: systemPrompt }] }
        : undefined
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: config?.temperature ?? 0.6,
        topP: config?.topP ?? 0.9,
        maxOutputTokens: config?.maxOutputTokens ?? 2048
      }
    });

    const text = result.response.text();
    res.json({ text });
  } catch (error) {
    console.error('Server generation error:', error);
    res.status(500).json({ error: 'Generation failed' });
  }
});

// Optional: serve built app if present
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Stratagem AI Pro server running on http://localhost:${port}`);
});
