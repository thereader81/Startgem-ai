import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'Summarize the executive risks in 5 bullets',
  'Draft a partner-ready headline',
  'List the critical unknowns to validate',
  'What does the 30/60/90 day plan look like?'
];

export const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <aside className="w-[320px] border-l border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col">
      <div className="p-5 border-b border-[var(--border-subtle)] flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
        <span className="text-sm font-semibold">AI Advisor</span>
      </div>
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        <div className="bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl p-3 text-sm text-[var(--text-secondary)]">
          Ask for synthesis, risks, or slide-ready messaging. Responses here are a placeholder until chat is wired.
        </div>
        <div>
          <div className="text-xs text-[var(--text-tertiary)] mb-2">Suggested prompts</div>
          <div className="space-y-2">
            {SUGGESTIONS.map((item) => (
              <div key={item} className="text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] rounded-lg px-3 py-2">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask the advisor..."
            className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)]"
          />
          <button
            className="w-10 h-10 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center"
            onClick={() => setMessage('')}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
