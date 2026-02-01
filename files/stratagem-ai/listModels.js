import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function listModels() {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error('VITE_GEMINI_API_KEY not found in .env');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Note: The SDK might not have a direct listModels, we might need to use fetch or a different approach if not available
        // But let's try a simple generation with a fallback model first or check documentation
        console.log('Attempting to list models...');
        // In latest SDK, there isn't a direct listModels on the genAI object usually.
        // However, we can try to hit the endpoint directly via fetch.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log('Available Models:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
