/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sohne", "DM Sans", "Inter", "system-ui"],
        body: ["Source Serif 4", "Georgia", "serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "ui-monospace"]
      },
      boxShadow: {
        card: "0 18px 45px rgba(15, 23, 42, 0.08)",
        soft: "0 6px 18px rgba(15, 23, 42, 0.08)",
        outline: "0 0 0 1px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
