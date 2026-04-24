import { ParsedDocument, ParseError } from "@/lib/types";

const MIN_CHARS = 200;
const MAX_CHARS = 50000;
const MAX_DOCS = 10;

export interface ParseResult {
  documents: ParsedDocument[];
  errors: ParseError[];
  overLimit: boolean;
}

export function parseBatchInput(raw: string): ParseResult {
  const sections = raw.split(/^---$/m).map((s) => s.trim()).filter(Boolean);

  const documents: ParsedDocument[] = [];
  const errors: ParseError[] = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    let name = `Document ${i + 1}`;
    let content = section;

    const firstNewline = section.indexOf("\n");
    if (firstNewline !== -1) {
      const firstLine = section.slice(0, firstNewline).trim();
      if (firstLine.startsWith("# ")) {
        name = firstLine.slice(2).trim() || name;
        content = section.slice(firstNewline + 1).trim();
      }
    } else if (section.startsWith("# ")) {
      name = section.slice(2).trim() || name;
      content = "";
    }

    if (content.length < MIN_CHARS) {
      errors.push({
        index: i,
        name,
        message: `${name} is too short: ${content.length} chars (minimum ${MIN_CHARS}).`,
      });
    } else if (content.length > MAX_CHARS) {
      errors.push({
        index: i,
        name,
        message: `${name} is too long: ${content.length.toLocaleString()} chars (maximum ${MAX_CHARS.toLocaleString()}).`,
      });
    }

    documents.push({ name, content });
  }

  return {
    documents,
    errors,
    overLimit: documents.length > MAX_DOCS,
  };
}

export function estimateCost(docCount: number): string {
  const cost = Math.ceil(docCount * 0.03 * 100) / 100;
  return cost.toFixed(2);
}
