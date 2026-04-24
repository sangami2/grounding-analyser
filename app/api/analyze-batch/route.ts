import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { sanitizeJsonResponse } from "@/lib/sanitizeJson";
import { BatchDocumentResult, AnalysisResult } from "@/lib/types";

const MIN_CHARS = 200;
const MAX_CHARS = 50000;
const MAX_DOCS = 10;
const CONCURRENCY = 3;

interface IncomingDoc {
  name?: string;
  content: string;
}

async function analyzeOne(
  client: Anthropic,
  name: string,
  content: string
): Promise<BatchDocumentResult> {
  let rawContent: string;
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please analyze this document for RAG grounding quality:\n\n${content}`,
        },
        {
          role: "assistant",
          content: "{",
        },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return { name, error: "Unexpected response format from analysis model." };
    }
    rawContent = "{" + block.text;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { name, error: msg };
  }

  const sanitized = sanitizeJsonResponse(rawContent);
  try {
    const parsed = JSON.parse(sanitized) as AnalysisResult;
    return { name, analysis: parsed };
  } catch {
    return {
      name,
      error: `Failed to parse analysis response. First 500 chars: ${sanitized.slice(0, 500)}`,
    };
  }
}

async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const index = nextIndex++;
      results[index] = await tasks[index]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  return results;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-placeholder-replace-me") {
    return NextResponse.json(
      { error: "Server misconfigured: API key not set." },
      { status: 500 }
    );
  }

  let body: { documents?: IncomingDoc[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const docs = body.documents;
  if (!Array.isArray(docs) || docs.length === 0) {
    return NextResponse.json(
      { error: "Provide between 1 and 10 documents." },
      { status: 400 }
    );
  }

  if (docs.length > MAX_DOCS) {
    return NextResponse.json(
      { error: `Batch mode supports a maximum of ${MAX_DOCS} documents. Received ${docs.length}.` },
      { status: 400 }
    );
  }

  const validationErrors: string[] = [];
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const label = doc.name ? `"${doc.name}"` : `Document ${i + 1}`;
    if (!doc.content || typeof doc.content !== "string") {
      validationErrors.push(`${label}: content is missing.`);
    } else if (doc.content.length < MIN_CHARS) {
      validationErrors.push(
        `${label} is too short: ${doc.content.length} chars (minimum ${MIN_CHARS}).`
      );
    } else if (doc.content.length > MAX_CHARS) {
      validationErrors.push(
        `${label} is too long: ${doc.content.length.toLocaleString()} chars (maximum ${MAX_CHARS.toLocaleString()}).`
      );
    }
  }

  if (validationErrors.length > 0) {
    return NextResponse.json(
      { error: validationErrors.join(" ") },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });

  const tasks = docs.map((doc, i) => {
    const name = doc.name?.trim() || `Document ${i + 1}`;
    return () => analyzeOne(client, name, doc.content);
  });

  const results = await runWithConcurrency(tasks, CONCURRENCY);

  return NextResponse.json({ results });
}
