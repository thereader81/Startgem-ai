import fs from 'fs/promises';
import path from 'path';
import { jsPDF } from 'jspdf';

const TITLE = 'Prompt Library for Strategem AI Pro';
const FOOTER = 'Created by: Abhijit Pani, Senior Director, kearney | www.linkedin.com/in/apani';

const sourcePath = path.resolve('constants/prompts_enhanced.ts');
const outputDir = path.resolve('exports');
const outputPath = path.join(outputDir, `${TITLE}.pdf`);

const content = await fs.readFile(sourcePath, 'utf8');

const expertMatch = content.match(/const\s+EXPERT_HEADER\s*=\s*`([\s\S]*?)`;/);
const expertHeader = expertMatch ? expertMatch[1].trim() : '';

const promptRegex = /{\s*id:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?description:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?promptTemplate:\s*`([\s\S]*?)`\s*}\s*,?/g;

const prompts = [];
for (const match of content.matchAll(promptRegex)) {
  const [, id, title, description, category, template] = match;
  prompts.push({
    id,
    title,
    description,
    category,
    template
  });
}

if (!prompts.length) {
  throw new Error('No prompts found in prompts_enhanced.ts.');
}

const sanitizeText = (value) => value
  .replace(/\r\n/g, '\n')
  .replace(/\t/g, '  ')
  .replace(/[•▪]/g, '-')
  .replace(/[“”]/g, '"')
  .replace(/[’]/g, "'")
  .replace(/[–—]/g, '-')
  .trim();

const expandTemplate = (template) => {
  const replaced = template.split('${EXPERT_HEADER}').join(expertHeader);
  return sanitizeText(replaced);
};

await fs.mkdir(outputDir, { recursive: true });

const doc = new jsPDF({ unit: 'pt', format: 'a4' });
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

const margin = 48;
const contentWidth = pageWidth - margin * 2;
const headerY = 28;
const footerY = pageHeight - 24;
const headerRuleY = 36;
const footerRuleY = pageHeight - 40;
const contentBottom = pageHeight - 60;

let cursorY = 0;

const drawHeaderFooter = () => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40);
  doc.text(TITLE, margin, headerY);
  doc.setDrawColor(210);
  doc.line(margin, headerRuleY, pageWidth - margin, headerRuleY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70);
  doc.line(margin, footerRuleY, pageWidth - margin, footerRuleY);
  doc.text(FOOTER, margin, footerY);
};

const startPage = (isFirst = false) => {
  if (!isFirst) {
    doc.addPage();
  }
  drawHeaderFooter();
  cursorY = isFirst ? 92 : 64;
  if (isFirst) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(20);
    doc.text(TITLE, pageWidth / 2, 68, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text('Source: prompts_enhanced.ts', pageWidth / 2, 86, { align: 'center' });
  }
};

const ensureSpace = (height) => {
  if (cursorY + height > contentBottom) {
    startPage(false);
  }
};

const addLine = (text, fontSize = 10, fontStyle = 'normal', leading = 14, color = 20) => {
  doc.setFont('helvetica', fontStyle);
  doc.setFontSize(fontSize);
  doc.setTextColor(color);
  const lines = doc.splitTextToSize(text, contentWidth);
  for (const line of lines) {
    ensureSpace(leading);
    doc.text(line, margin, cursorY);
    cursorY += leading;
  }
};

const addParagraph = (text, fontSize = 10, fontStyle = 'normal', leading = 14, color = 30) => {
  const paragraphs = text.split('\n');
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      cursorY += leading * 0.6;
      continue;
    }
    addLine(paragraph, fontSize, fontStyle, leading, color);
  }
};

startPage(true);

let currentCategory = '';

for (const prompt of prompts) {
  const categoryLabel = prompt.category.toUpperCase();
  if (categoryLabel !== currentCategory) {
    currentCategory = categoryLabel;
    cursorY += 8;
    addLine(categoryLabel, 12, 'bold', 18, 10);
    cursorY += 4;
  }

  addLine(prompt.title, 12, 'bold', 16, 20);
  addLine(prompt.description, 10, 'normal', 14, 70);
  cursorY += 4;

  addLine('Prompt Template', 10, 'bold', 14, 30);
  const templateText = expandTemplate(prompt.template);
  addParagraph(templateText, 9, 'normal', 12, 30);
  cursorY += 10;
}

doc.save(outputPath);
console.log(`PDF created at ${outputPath}`);
